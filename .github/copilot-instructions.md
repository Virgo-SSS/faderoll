# Copilot Instructions for Faderoll

## Project Context
- **Framework**: Next.js 16 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS v4
- **UI Library**: React 19

## Architecture & Patterns
- **App Router**: Use `src/app` for routing.
  - Pages: `page.tsx`
  - Layouts: `layout.tsx`
  - Loading UI: `loading.tsx`
  - Error Handling: `error.tsx`
- **Server vs Client Components**:
  - Default to Server Components.
  - Add `'use client'` directive at the top of files only when using hooks (`useState`, `useEffect`) or event listeners.
- **Data Fetching**:
  - Fetch data directly in Server Components using `async/await`.
  - Use Server Actions for mutations.

## Styling (Tailwind CSS v4)
- Use utility classes for styling.
- Configuration is in `globals.css` using the `@theme` directive (Tailwind v4).
- Dark mode is handled via CSS variables (`--background`, `--foreground`) and `@media (prefers-color-scheme: dark)`.
- Example:
  ```tsx
  <div className="bg-background text-foreground p-4 rounded-lg">
    Content
  </div>
  ```

## TypeScript Conventions
- Use `interface` for defining props and data structures.
- Avoid `any`; use specific types or generics.
- Type component props explicitly:
  ```tsx
  interface ButtonProps {
    label: string;
    onClick: () => void;
  }
  export default function Button({ label, onClick }: ButtonProps) { ... }
  ```

## File Structure
- `src/app/`: Application routes and pages.
- `src/components/`: Reusable UI components.
- `src/lib/`: Utility functions and shared logic.

## Development Workflow
- **Run Dev Server**: `npm run dev`
- **Build**: `npm run build`
- **Lint**: `npm run lint`
