import type { FlatESLintConfig, CssConfig } from "../../types/eslint";
import { VendoredPrettierOptions, VendoredPrettierRuleOptions } from "../../types/types";
import pluginFormat from "eslint-plugin-format";
import { parserPlain } from "../utils";

export function mergePrettierOptions(
    options: VendoredPrettierOptions,
    overrides: VendoredPrettierRuleOptions = {},
): VendoredPrettierRuleOptions {
    return {
        ...options,
        ...overrides,
        plugins: [
            ...(overrides.plugins || []),
            ...(options.plugins || []),
        ],
    };
}

export default function defineCssConfig(config?: CssConfig) {
    const { indent = 4, quotes, semi, css, scss, less } = config || {};
    const prettierOptions: VendoredPrettierOptions = Object.assign({
        endOfLine: "auto",
        printWidth: 120,
        semi,
        singleQuote: quotes === "single",
        tabWidth: typeof indent === "number" ? indent : 4,
        trailingComma: "all",
        useTabs: indent === "tab",
    } satisfies VendoredPrettierOptions, config?.prettierOptions || {});
    const configs: FlatESLintConfig[] = [{
        name: "yx1126/formatter/setup",
        plugins: {
            format: pluginFormat,
        },
    }, {
        files: ["**/*.css", "**/*.{p,post}css", ...(css?.files || [])],
        languageOptions: {
            parser: parserPlain,
        },
        name: "yx1126/formatter/css",
        rules: {
            "format/prettier": [
                "error",
                mergePrettierOptions(prettierOptions, {
                    parser: "css",
                }),
            ],
            "@stylistic/eol-last": "off",
            ...css?.rules,
        },
    }, {
        files: ["**/*.scss", ...(scss?.files || [])],
        languageOptions: {
            parser: parserPlain,
        },
        name: "yx1126/formatter/scss",
        rules: {
            "format/prettier": [
                "error",
                mergePrettierOptions(prettierOptions, {
                    parser: "scss",
                }),
            ],
            "@stylistic/eol-last": "off",
            ...scss?.rules,
        },
    }, {
        files: ["**/*.less", ...(less?.files || [])],
        languageOptions: {
            parser: parserPlain,
        },
        name: "yx1126/formatter/less",
        rules: {
            "format/prettier": [
                "error",
                mergePrettierOptions(prettierOptions, {
                    parser: "less",
                }),
            ],
            "@stylistic/eol-last": "off",
            ...less?.rules,
        },
    }];
    return configs;
}