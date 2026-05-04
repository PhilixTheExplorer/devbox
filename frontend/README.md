# [devbox] Frontend

The frontend setup for [devbox]

## Stack

- Next.js 16 App Router
- React 19
- Tailwind CSS v4
- TypeScript (strict)
- Biome
- Vitest

## Setup

```sh
pnpm install
pnpm hook:install
pnpm dev
```

## Scripts

```sh
pnpm dev          # local development
pnpm build        # production build
pnpm start        # serve production build
pnpm lint         # biome check
pnpm lint:unsafe  # apply safe + unsafe autofixes
pnpm format       # biome format
pnpm typecheck    # TypeScript type check
pnpm hook:install # install Lefthook git hooks
pnpm hook:pre-commit # run the pre-commit hook manually
pnpm test         # vitest
pnpm test:watch   # vitest watch mode
```

## Git Hooks

The repo uses Lefthook with a root-level `lefthook.yml`. Install hooks after
installing dependencies:

```sh
pnpm hook:install
```

The pre-commit hook runs:

- `pnpm format`
- `pnpm lint`
- `pnpm typecheck`

## Tool Architecture

Tool code is split into three places:

- `src/components/tools/<tool-id>.tsx`: the tool UI.
- `src/lib/tools/<tool-id>.ts`: pure logic for the tool.
- `src/lib/tools/<tool-id>.test.ts`: unit tests for the pure logic.

Shared tool UI lives in:

- `src/components/tool-kit/text-tool-layout.tsx`
- `src/components/tool-kit/tool-controls.tsx`

Tool metadata and routing live in:

- `src/registry/tools.ts`
- `src/registry/tool-components.tsx`

## Create a Tool

```sh
pnpm create:tool <tool-id>
```

Example:

```sh
pnpm create:tool base64 --category convert --name "Base64 Encode / Decode" --description "Encode and decode Base64 locally."
```

Categories:

- `format`
- `convert`
- `generate`
- `inspect`

The scaffold creates:

- `src/components/tools/<tool-id>.tsx`
- `src/lib/tools/<tool-id>.ts`
- `src/lib/tools/<tool-id>.test.ts`

It also registers the tool in `src/registry/tools.ts` and
`src/registry/tool-components.tsx`.

## Tool Guidelines

- Keep `src/components/tools` for actual tool pages only.
- Put reusable tool UI in `src/components/tool-kit`.
- Put testable behavior in `src/lib/tools`.
- Prefer local browser APIs and avoid new dependencies unless a tool truly needs
  one.
- Avoid arbitrary Tailwind values in components. Add clear tokens in
  `src/app/globals.css` when a repeated design value is needed.

Run:

```sh
pnpm test
```
