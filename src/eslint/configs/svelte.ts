import { interopDefault } from "../../utils";
import type { FlatESLintConfig, RulesConfig, SvelteConfig, Rules } from "../../../types/eslint";

export function defineSvelteRules(config?: RulesConfig): Rules {
    const { indent = 4 } = config || {};
    return {
        "@stylistic/indent": "off",
        "svelte/indent": [
            "error",
            {
                indent,
                switchCase: 0,
                indentScript: false,
                alignAttributesVertically: true,
            },
        ],
        "svelte/html-quotes": ["error", { prefer: "double" }],
        "svelte/valid-compile": "off",
    };
}

export default async function defineSvelteConfig(config: SvelteConfig): Promise<FlatESLintConfig[]> {
    const { files = [], typescript, svelteConfig, indent = 4, rules } = config || {};
    const eslintPluginSvelte = await interopDefault(import("eslint-plugin-svelte"));
    return [{
        name: "reallyx/svelte/setup",
        plugins: {
            svelte: eslintPluginSvelte as any,
        },
    }, {
        name: "reallyx/svelte",
        files: ["*.svelte", "**/*.svelte", ...files],
        languageOptions: {
            parser: await interopDefault(import("svelte-eslint-parser")),
            parserOptions: {
                parser: typescript ? await interopDefault(import("@typescript-eslint/parser")) as any : null,
                extraFileExtensions: [".svelte"],
                sourceType: "module",
                svelteConfig,
            },
        },
        processor: eslintPluginSvelte.processors[".svelte"],
        rules: {
            ...eslintPluginSvelte.configs.recommended.rules,
            ...defineSvelteRules({ indent }),
            ...rules,
        },
    }];
}