import eslintPluginSvelte from "eslint-plugin-svelte";
import SvelteParser from "svelte-eslint-parser";
import { parser as TsParser } from "typescript-eslint";
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
                alignAttributesVertically: true,
            },
        ],
        "svelte/html-quotes": ["error", { prefer: "double" }],
    };
}

export default function defineSvelteConfig(config: SvelteConfig): FlatESLintConfig[] {
    const { files = [], typescript, svelteConfig, indent = 4, rules } = config || {};
    return [{
        name: "reallyx/svelte/setup",
        plugins: {
            svelte: eslintPluginSvelte as any,
        },
    }, {
        name: "reallyx/svelte",
        files: ["*.svelte", "**/*.svelte", ...files],
        languageOptions: {
            parser: SvelteParser,
            parserOptions: {
                parser: typescript ? TsParser as any : null,
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