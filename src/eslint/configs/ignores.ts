import type { FlatESLintConfig } from "../../../types/eslint";

export function defineIgnoresRules() {
    return [
        "**/node_modules",
        "**/dist",
        "**/package-lock.json",
        "**/yarn.lock",
        "**/pnpm-lock.yaml",
        "**/bun.lockb",

        "**/output",
        "**/coverage",
        "**/temp",
        "**/.temp",
        "**/tmp",
        "**/.tmp",
        "**/.history",
        "**/.vitepress/cache",
        "**/.nuxt",
        "**/.next",
        "**/.vercel",
        "**/.changeset",
        "**/.idea",
        "**/.cache",
        "**/.output",
        "**/.vite-inspect",
        "**/.yarn",
        "**/vite.config.*.timestamp-*",

        "**/CHANGELOG*.md",
        "**/*.min.*",
        "**/LICENSE*",
        "**/__snapshots__",
        "**/auto-import?(s).d.ts",
        "**/components.d.ts",
    ];
}

export default function defineIgnores(ignores?: string[]): FlatESLintConfig[] {
    return [{
        name: "reallyx/ignores",
        ignores: [
            ...defineIgnoresRules(),
            ...ignores || [],
        ],
    }];
}