import jsonc from "eslint-plugin-jsonc";
import type { FlatESLintConfig, JsonConfig } from "../types";

const packageOrders = [
    "name",
    "version",
    "private",
    "packageManager",
    "description",
    "type",
    "keywords",
    "license",
    "author",
    "contributors",
    "funding",
    "files",
    "main",
    "module",
    "exports",
    "unpkg",
    "jsdelivr",
    "browser",
    "bin",
    "man",
    "directories",
    "homepage",
    "repository",
    "bugs",
    "publishConfig",
    "scripts",
    "peerDependencies",
    "peerDependenciesMeta",
    "optionalDependencies",
    "dependencies",
    "devDependencies",
    "engines",
    "config",
    "overrides",
    "pnpm",
    "husky",
    "lint-staged",
    "eslintConfig",
];

export default function defineJsonConfig(config: JsonConfig): FlatESLintConfig[] {
    const result: FlatESLintConfig[] = [
        ...jsonc.configs["flat/recommended-with-jsonc"],
        {
            files: ["**/*.json", "**/*.json5", "**/*.jsonc"],
            rules: {
                "jsonc/array-bracket-newline": ["error",
                    {
                        "multiline": true,
                        "minItems": null,
                    },
                ],
                "jsonc/array-bracket-spacing": ["error", "never"],
                "jsonc/indent": ["error", config.indent ?? 4],
                "jsonc/comma-dangle": ["error", "never"],
                "jsonc/comma-style": ["error", "last"],
                "jsonc/key-spacing": ["error",
                    {
                        "beforeColon": false,
                        "afterColon": true,
                        "mode": "strict",
                    },
                ],
                "jsonc/object-curly-newline": ["error", { multiline: true, consistent: true }],
                "jsonc/object-curly-spacing": ["error", "always"],
                "jsonc/quotes": ["error", "double"],
                ...config?.rules
            }
        },
    ];
    if(config?.package) {
        result.push({
            files: ["package.json"],
            rules: {
                "jsonc/sort-keys": [
                    "error",
                    {
                        pathPattern: "^$",
                        order: packageOrders,
                    },
                    {
                        pathPattern: "^(?:dev|peer|optional|bundled)?[Dd]ependencies$",
                        order: { type: "asc" },
                    },
                    {
                        pathPattern: "^exports.*$",
                        order: [
                            "types",
                            "import",
                            "require",
                            "default",
                        ],
                    },
                ],
            },
        });
    }
    return result;
}
