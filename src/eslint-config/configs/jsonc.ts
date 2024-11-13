import jsonc from "eslint-plugin-jsonc";
import { getFlatRules } from "../../utils";
import type { FlatESLintConfig, JsonConfig, RulesConfig, Rules } from "../eslint";

export function defineOrders() {
    return [
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
    ]
}

export function defineJsoncRules(config?: RulesConfig): Rules {
    const { indent } = config || {};
    return {
        ...getFlatRules(jsonc.configs["flat/recommended-with-jsonc"]),
        "jsonc/array-bracket-newline": ["error",
            {
                "multiline": true,
                "minItems": null,
            },
        ],
        "jsonc/array-bracket-spacing": ["error", "never"],
        "jsonc/indent": ["error", indent ?? 4],
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
    }
}


export default function defineJsonConfig(config?: JsonConfig): FlatESLintConfig[] {
    const { files = [], indent, rules } = config || {};
    const result: FlatESLintConfig[] = [
        ...jsonc.configs["flat/base"],
        {
            name: "yx1126/jsonc",
            files: ["**/*.json", "**/*.json5", "**/*.jsonc", ...files],
            rules: {
                ...defineJsoncRules({ indent }),
                ...rules
            }
        },
    ];
    if(config?.package) {
        result.push({
            name: "yx1126/jsonc/package",
            files: ["**/package.json"],
            rules: {
                "jsonc/sort-keys": [
                    "error",
                    {
                        pathPattern: "^$",
                        order: defineOrders(),
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
