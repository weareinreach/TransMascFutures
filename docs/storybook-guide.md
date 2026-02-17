# Storybook Guide for TransMascFutures

## Overview

Storybook is used in this project as a "high-fidelity sandbox" for UI development. It allows developers to build, test, and document components in isolation from the main Next.js application logic and database.

## Running Storybook

To start the Storybook development server:

```bash
pnpm dev:ui
```

This will launch the interface at `http://localhost:6006`.

## Architecture & Configuration

The Storybook setup in this project is customized to replicate the actual application environment closely.

### 1. Theming (Mantine)
*   **Configuration**: `.storybook/preview.tsx`
*   **Behavior**: All stories are wrapped in the `MantineProvider`.
*   **Details**: It imports the exact same `theme` object (`src/styles/theme`) and global fonts (`src/styles`) used in the main app. This ensures that buttons, inputs, and typography look identical to production.

### 2. Internationalization (i18n)
*   **Configuration**: `.storybook/preview.tsx`
*   **Behavior**: Stories are wrapped in `I18nextProvider`.
*   **Usage**:
    *   The project relies heavily on `next-i18next`.
    *   Storybook mocks this by loading the translation files (like `common.json`) directly via a local `i18n` instance.
    *   **Language Switcher**: You can toggle between English and Spanish using the "Locale" toolbar item in the Storybook UI to test how components handle text expansion or different languages.

### 3. Next.js Integration
*   **Configuration**: `.storybook/main.ts`
*   **Framework**: Uses `@storybook/nextjs`.
*   **Behavior**: This allows usage of Next.js specific components like `<Image />`, `<Link />`, and router hooks within your components without causing errors.
*   **Static Assets**: The `public` directory is served statically, so images referenced by `/images/logo.png` will work.

## Writing Stories

### Location
Stories should be co-located with their components in the `src` directory.

*   **Component**: `src/components/MyComponent/MyComponent.tsx`
*   **Story**: `src/components/MyComponent/MyComponent.stories.tsx`

### Standard Pattern
We use the Component Story Format (CSF) with TypeScript.

```tsx
import type { Meta, StoryObj } from '@storybook/react';
import { MyComponent } from './MyComponent';

const meta: Meta<typeof MyComponent> = {
  component: MyComponent,
  title: 'Components/MyComponent',
};

export default meta;
type Story = StoryObj<typeof MyComponent>;

export const Default: Story = {
  args: {
    // props go here
  },
};
```

## Available Addons

*   **Viewport**: Allows you to preview components on different screen sizes (Mobile, Tablet, Desktop) to ensure responsiveness.
*   **Accessibility (a11y)**: Checks components for common accessibility violations.
*   **Controls**: Allows you to dynamically edit component props (colors, text, dates) via the UI.
