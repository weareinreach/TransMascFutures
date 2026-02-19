# Story Submission Workflow

This document outlines the process for integrating new user stories into the application using the automated Admin Portal.

## Workflow Overview

1.  **User Submission**: Users fill out surveys on the web to submit their story.
2.  **Database Storage**: The details from the survey are saved to the `StoryToCategory`, `Story`, `StorySubmission`, `Pronouns`, and `PronounsToStory` tables.
3.  **Translation Request**:
    - Via an API call in the `story.submit` function, the `response1` and `response2` values are sent to the `new-submissions.json` file in the TransMasc Crowdin project (Project ID: 14).
    - A Discord webhook is configured for the TransMasc project. When the `new-submissions.json` file is updated, a notification is triggered in the `#translations` channel in the InReach Discord.
4.  **Review & Translation**:
    - Engineering performs a manual review of the data to ensure it is not "trolling".
    - Translators complete the Spanish and French translations in Crowdin.
    - **Status Indicators**: In the Admin Portal, colored badges indicate the status of translations:
        - **Gray**: Not in DB (Unchecked). Expand the row to check Crowdin.
        - **Red**: Missing in Crowdin.
        - **Blue**: Available in Crowdin (but not yet in DB).
        - **Green**: Present in DB.
5.  **Approval & Publishing**:
    - Log in to the **Admin Portal** at `/admin`.
    - Locate the story in the table.
    - Expand the row to preview the translations fetched live from Crowdin.
    - Click the **Approve & Publish** (green check) button.
    - The system automatically fetches the translations from Crowdin, updates the database, and sets the story to `published`.
6.  **Maintenance (Updating Translations)**:
    - If translations are added or corrected in Crowdin *after* a story is published:
    - Locate the published story in the Admin Portal.
    - Expand the row to verify the new translations appear in the preview.
    - Click the **Refresh Translations** (blue refresh icon) button.
    - This pulls the latest text from Crowdin and updates the database without taking the story offline.
