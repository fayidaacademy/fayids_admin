# Copilot Instructions for Shega Intelligence

## Architecture Overview
- **Monorepo structure**: All core app code is under `src/`, with subfolders for `app/` (Next.js routes/pages), `components/` (React UI), `store/` (Zustand state), `hooks/`, `lib/`, `services/`, and `utils/`.
- **Next.js App Router**: Uses the `/src/app` directory for routing and API endpoints. Pages and API routes are colocated.
- **State Management**: Uses Zustand (`src/store/chat-store.ts`) for chat and UI state. Store is accessed via hooks and is heavily mocked in tests.
- **Streaming & Async**: Chat streaming logic is in `src/utils/chatStream.ts` and related service files. Streaming uses callback patterns for incremental updates.
- **Testing**: Unit tests live in `src/**/__tests__` and use Jest + @testing-library/react-hooks. All external dependencies (store, router, toast, etc.) are mocked for isolation.

## Developer Workflows
- **Dev server**: Use `pnpm dev` (or `npm run dev`, `yarn dev`, `bun dev`) to start Next.js locally.
- **Testing**: Use `pnpm test -- --coverage` for full test+coverage. To test a single file: `pnpm test -- src/hooks/__tests__/useChatService.test.ts`.
- **Type checking**: Run `pnpm tsc` for TypeScript checks.
- **Linting**: Use `pnpm lint`.
- **Build**: Use `pnpm build` for production build.

## Project-Specific Patterns
- **Mocking**: Always mock Zustand stores, router, and toast in tests. See `useChatService.test.ts` for patterns.
- **Chat logic**: All chat actions (send, refresh, continue, delete) are handled via the `useChatService` hook, which orchestrates store, streaming, and API actions.
- **API actions**: Centralized in `src/app/actions.ts` and called from hooks/services.
- **Component conventions**: UI components are colocated in `src/components/` and use Tailwind CSS. Prefer functional components and hooks.
- **Type definitions**: Shared types are in `src/lib/types.ts`.
- **Test coverage**: Target 80%+ for all business logic. Tests should cover all branches, error cases, and side effects.

## Integration Points
- **External APIs**: Chat and PDF features may call external APIs via `src/app/actions.ts`.
- **PDF chat**: Special handling for PDF chat sessions in chat logic and UI.
- **Router**: Uses Next.js `useRouter` for navigation; always mock in tests.

## Examples
- See `src/hooks/__tests__/useChatService.test.ts` for best-practice test structure, mocking, and coverage.
- See `src/store/chat-store.ts` for Zustand store patterns.
- See `src/utils/chatStream.ts` for streaming/callback logic.

---


## General Unit Test Instruction

For each file, create a corresponding test file in `__tests__` or alongside the module.
Mock all external dependencies (APIs, Zustand stores, router, etc.).
Cover all public functions, methods, and exported logic.

For each function:
- Test normal/expected behavior.
- Test edge cases (empty input, null/undefined, error paths).
- Test error handling and side effects (e.g., toast, navigation, state updates).

For React components:
- Test rendering with different props/states.
- Test user interactions and event handlers.
- Test conditional rendering and error boundaries.

For stores/services:
- Test state transitions, actions, and selectors.
- Test async flows and error handling.

For utilities:
- Test all branches and return values.

If you add new business logic, always:
- Add/expand unit tests in `__tests__`.
- Mock all external dependencies in tests.
- Follow the patterns in the files above for consistency.
