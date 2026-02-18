# Crowdin Integration Overview

This project utilizes Crowdin in two distinct pipelines: one for static application content and another for dynamic user-submitted stories.

## 1. The "App" Pipeline (Static UI)

This pipeline handles the text that lives in the codebase (buttons, navigation, headers, static pages).

- **Source of Truth:** JSON files in the codebase (e.g., `public/locales/en/common.json`).
- **Integration Method:** GitHub Integration (VCS) or CLI.
- **Workflow:**
  1.  **Push:** When a developer commits new English text to `main`, the integration automatically uploads these strings to Crowdin.
  2.  **Translate:** Translators work on these strings in the Crowdin project.
  3.  **Pull:** Once translated, Crowdin opens a **Pull Request (PR)** back to the GitHub repository with the new Spanish JSON files.
  4.  **Deploy:** Engineering merges the PR, and the site updates.

## 2. The "Data" Pipeline (User Stories)

This pipeline handles the dynamic content submitted by users, which lives in the database.

- **Source of Truth:** The `Story` table in the PostgreSQL database.
- **Integration Method:** Custom API Calls (Automated).
- **Workflow:**
  1.  **Push:** The `story.submit` function manually pushes text to a specific file (`new-submissions.json`) in Crowdin via API.
  2.  **Translate:** Translators work on this specific file.
  3.  **Pull:** **Automated.** When an admin approves a story in the Admin Portal, the application fetches the latest translations from Crowdin and saves them to the database.

## Summary of Architecture

| Feature            | App Pipeline (UI)               | Data Pipeline (Stories)            |
| :----------------- | :------------------------------ | :--------------------------------- |
| **Content Type**   | Static (Menus, Labels)          | Dynamic (User Essays)              |
| **Storage**        | JSON Files in Git Repo          | Database Rows (Prisma)             |
| **Crowdin File**   | `en/common.json`                | `new-submissions.json`             |
| **Sync Direction** | Bidirectional (Syncs both ways) | Unidirectional (Push only)         |
| **Deployment**     | Required (Code change)          | Not required (Admin Portal action) |
