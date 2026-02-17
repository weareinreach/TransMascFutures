# Development Guidelines

This guide covers the standards and patterns used in the TransMascFutures codebase. It is intended to help developers—especially those new to the project—understand where code lives and how to implement common features.

## 1. Project Structure

*   **`src/pages`**: Application routes. The file structure here mirrors the URL structure (Next.js Pages Router).
*   **`src/components`**: Reusable UI components.
    *   *Rule*: If a component is complex, give it its own folder with a `.stories.tsx` file.
*   **`src/styles`**: Global styles and Mantine theme configuration (`theme.ts`).
*   **`prisma/`**: Database schema (`schema.prisma`) and migration files.
*   **`public/locales`**: JSON files for English and Spanish translations.

## 2. Internationalization (i18n)

We use `next-i18next` for translations.

**Rule:** Never hardcode text in components. All user-facing text must be in translation files.

### How to add text:
1.  Add the key-value pair to `public/locales/en/common.json`.
2.  Use the hook in your component:

```tsx
import { useTranslation } from 'next-i18next';

export const MyComponent = () => {
  const { t } = useTranslation('common');
  return <button>{t('submit')}</button>; // Renders "Submit"
};
```

*Note: Spanish translations are handled via the Crowdin workflow (see `crowdin-workflow.md`).*

## 3. Styling (Mantine)

We use Mantine for our UI library.

*   **Theming**: Use the variables defined in `src/styles/theme.ts` (colors, spacing, fonts) rather than hardcoded hex values.
*   **Responsive Design**: Use Mantine's responsive props or the `useMediaQuery` hook.

```tsx
// Example using Mantine props for responsive width and theme colors
<Box w={{ base: '100%', sm: '50%' }} c="blue.5">
  Content
</Box>
```

## 4. Database & Prisma

We use Prisma ORM to interact with the PostgreSQL database.

*   **Schema**: Defined in `prisma/schema.prisma`.
*   **Models**:
    *   `Story`: The core content unit.
    *   `StorySubmission`: Raw survey data before it is processed into a Story.
    *   `StoryCategory` & `Pronouns`: Lookup tables for filtering.

### Making Schema Changes
1.  Modify `prisma/schema.prisma`.
2.  Run the migration command to update your local DB and generate the client:
    ```bash
    npx prisma migrate dev --name name_of_change
    ```
3.  Restart the dev server to pick up the new TypeScript types.

## 5. Authentication

Authentication is handled by **NextAuth.js**.

*   **Client-side**: Use `useSession()` to check if a user is logged in.
*   **Server-side**: Use `getServerSession()` in API routes or `getServerSideProps`.
*   **Environment**: Ensure `NEXTAUTH_SECRET` is set in your `.env` file.

## 6. Best Practices

### Storybook First
When building a new UI component, build it in Storybook (`pnpm dev:ui`) first.
*   This ensures the component works in isolation.
*   It allows you to test English and Spanish text expansion easily.
*   It verifies that the component uses the `MantineProvider` correctly.

### Linting
Run the linter before pushing code to ensure quality and catch errors early.

```bash
pnpm lint
```

### Accessibility
*   Ensure all images have `alt` text (handled via `common.json` for static images).
*   Use semantic HTML (e.g., `<button>` instead of `<div onClick=...>`).
*   Check the "Accessibility" tab in Storybook for automated checks.
