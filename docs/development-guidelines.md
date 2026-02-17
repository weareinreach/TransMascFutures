# Development Guidelines

This guide covers the standards and patterns used in the TransMascFutures codebase. It is intended to help developers—especially those new to the project—understand where code lives and how to implement common features.

## 1. Project Structure

*   **`src/pages`**: Application routes. The file structure here mirrors the URL structure (Next.js Pages Router).
*   **`src/components`**: Reusable UI components.
    *   *Rule*: If a component is complex, give it its own folder with a `.stories.tsx` file.
*   **`src/styles`**: Global styles and Mantine theme configuration (`theme.ts`).
*   **`src/server`**: Backend logic and tRPC routers.
*   **`prisma/`**: Database schema (`schema.prisma`) and migration files.
*   **`public/locales`**: JSON files for English and Spanish translations.
*   **`.github/workflows`**: CI/CD pipeline configurations for deployment.

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

## 6. API & Data Fetching (tRPC)

We use **tRPC** for type-safe communication between the frontend and backend. We do not use standard REST API routes (`pages/api`) for data fetching.

*   **Backend**: Routers are defined in `src/server/api/routers`.
*   **Frontend**: Use the tRPC hooks to fetch data.

```tsx
// Example of fetching data in a component
import { api } from '~/utils/api'; // Adjust path based on actual utils location

const MyComponent = () => {
  const { data, isLoading } = api.story.getAll.useQuery();

  if (isLoading) return <div>Loading...</div>;
  return <div>{data?.map(story => <div key={story.id}>{story.name}</div>)}</div>;
};
```

## 7. Testing Strategy

Currently, there is **no automated test suite** (Jest/Cypress). Testing is **manual**.

**Requirement:** Before opening a Pull Request (PR), you must manually verify your changes:
1.  **Happy Path**: Verify the feature works as expected.
2.  **Edge Cases**: Test with empty states, long text, or missing data.
3.  **Responsiveness**: Check the UI on Mobile and Desktop sizes (use Storybook or browser dev tools).
4.  **Language**: Toggle the site to Spanish to ensure translations load and layout doesn't break.

## 8. Deployment

Deployment is handled automatically via **GitHub Actions**.

*   **Dev**: Merging to the `dev` branch triggers a deployment to the development environment.
*   **Production**: Merging `dev` into `main` triggers a production deployment.
*   **Checks**: The CI pipeline may run linting and build checks. Ensure `pnpm build` passes locally before pushing.

## 9. Best Practices

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
