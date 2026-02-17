# Current Story Submission Workflow

This document outlines the current manual process for integrating new user stories into the application.

## Workflow Overview

1.  **User Submission**: Users fill out surveys on the web to submit their story.
2.  **Database Storage**: The details from the survey are saved to the `StoryToCategory`, `Story`, `StorySubmission`, `Pronouns`, and `PronounsToStory` tables.
3.  **Translation Request**:
    - Via an API call in the `story.submit` function, the `response1` and `response2` values are sent to the `new-submissions.json` file in the TransMasc Crowdin project (Project ID: 14).
    - A Discord webhook is configured for the TransMasc project. When the `new-submissions.json` file is updated, a notification is triggered in the `#translations` channel in the InReach Discord.
4.  **Review & Translation**:
    - Engineering performs a manual review of the data to ensure it is not "trolling".
    - Translators complete the Spanish translations in Crowdin.
5.  **Engineering Deployment**:
    - Create a database migration script to update the `Story` table (setting `published` to `true` and adding Spanish translations).
    - Save the script to the `data-migrations` folder.
    - Test the script locally.
    - Create a Pull Request (PR) and merge following GitHub workflow protocols.
    - Once merged to `main`, DB updates are deployed to production via GitHub Actions.
    - Verify the new story appears in production.

## Creating the Data Migration Script

To publish a story, a specific TypeScript migration file must be created.

1.  **Locate Template**: Open the `!YYYY_MM_DD_new-job-template.ts` file under `/prisma/data-migrations`.
2.  **Create File**: Copy the template file and rename it using today's date plus the story submission ID (e.g., `2023-06-27_cm2m6ae8l0000aik98z887ke6.ts`).
3.  **Configure Metadata**:
    - Follow the steps documented at the top of the file.
    - Complete the values under the section for 'Define the job metadata here'.
    - _Note:_ For Production, the data is in the `vercel` db. For local, the data is in the `postgres` db.
4.  **Retrieve Translations**:
    - Locate the Spanish (`*ES`) values in the `new-submissions.json` file on Crowdin by searching for the `storyId`.
    - Manually copy these values into the migration script.
5.  **Test Locally**:
    - Run `pnpm run db:dataMigrate` from the command line.
    - Ensure the response fields for EN and ES are completed and the `published` flag is set to `true` in the local database.
    - _Note:_ You must use local data for testing. If it works, update the script to target production data.
6.  **Finalize**:
    - Save the file.
    - Push changes to GitHub and create a PR.
    - **Important**: Create a separate migration file for each story to be added or updated.
