import { interopDefault } from "../../utils";
import type { Linter } from "eslint";
import type { RuleOptions } from "@stylistic/eslint-plugin/rule-options";
import type { StylisticCustomizeOptions } from "@stylistic/eslint-plugin";

type Rules = Partial<{
    [K in keyof RuleOptions]: Linter.RuleSeverity | [Linter.RuleSeverity, ...RuleOptions[K]]
}>;

/**
 * A factory function to defineStylistic the recommended config
 * @see https://github.com/eslint-stylistic/eslint-stylistic/blob/main/packages/eslint-plugin/configs/customize.ts#L15
 */
async function defineStylistic(options: StylisticCustomizeOptions<false>): Promise<Linter.BaseConfig>;
async function defineStylistic(options?: StylisticCustomizeOptions): Promise<Linter.Config>;
async function defineStylistic(options: StylisticCustomizeOptions<boolean> = {}): Promise<Linter.Config | Linter.BaseConfig> {
    const {
        arrowParens = false,
        blockSpacing = true,
        braceStyle = "1tbs",
        commaDangle = "always-multiline",
        flat = true,
        indent = 4,
        jsx = true,
        pluginName = "@stylistic",
        quoteProps = "as-needed",
        quotes = "double",
        semi = true,
    } = options;

    let rules: Rules = {
        "@stylistic/array-bracket-spacing": ["error", "never"],
        "@stylistic/arrow-spacing": "error",
        "@stylistic/block-spacing": ["error", blockSpacing ? "always" : "never"],
        "@stylistic/brace-style": ["error", braceStyle, { allowSingleLine: true }],
        "@stylistic/comma-spacing": ["error", { after: true, before: false }],
        "@stylistic/comma-style": "error",
        "@stylistic/computed-property-spacing": "error",
        "@stylistic/func-call-spacing": "error",
        "@stylistic/function-call-argument-newline": ["error", "consistent"],
        "@stylistic/function-paren-newline": "error",
        "@stylistic/implicit-arrow-linebreak": "error",
        "@stylistic/indent": ["error", indent, {
            SwitchCase: 0,
            tabLength: indent === "tab" ? 4 : indent,
        }],
        "@stylistic/key-spacing": ["error", { mode: "strict" }],
        "@stylistic/keyword-spacing": ["error", {
            overrides: {
                if: { after: false },
                for: { after: false },
                while: { after: false },
                switch: { after: false },
            },
        }],
        "@stylistic/no-multi-spaces": "error",
        "@stylistic/no-multiple-empty-lines": ["error", { max: 1, maxBOF: 0, maxEOF: 0 }],
        "@stylistic/no-whitespace-before-property": "error",
        "@stylistic/object-curly-spacing": ["error", "always"],
        "@stylistic/padded-blocks": ["error", "never"],
        "@stylistic/quotes": ["error", quotes, { allowTemplateLiterals: true, avoidEscape: false }],
        "@stylistic/rest-spread-spacing": "error",
        "@stylistic/space-before-blocks": "error",
        "@stylistic/space-before-function-paren": ["error", { anonymous: "never", asyncArrow: "always", named: "never" }],
        "@stylistic/space-in-parens": "error",
        "@stylistic/switch-colon-spacing": "error",
        "@stylistic/template-curly-spacing": "error",
        "@stylistic/template-tag-spacing": "error",
        "@stylistic/arrow-parens": ["error", arrowParens ? "always" : "as-needed", { requireForBlockBody: false }],
        "@stylistic/comma-dangle": ["error", commaDangle],
        "@stylistic/dot-location": ["error", "property"],
        "@stylistic/indent-binary-ops": ["error", indent],
        "@stylistic/lines-between-class-members": ["error", "always", { exceptAfterSingleLine: true }],
        "@stylistic/member-delimiter-style": ["error", {
            multiline: {
                delimiter: "semi",
                requireLast: true,
            },
            multilineDetection: "brackets",
            singleline: {
                delimiter: "semi",
                requireLast: true,
            },
        }],
        "@stylistic/multiline-ternary": ["error", "always-multiline"],
        "@stylistic/new-parens": "error",
        "@stylistic/no-extra-parens": ["error", "functions"],
        "@stylistic/no-floating-decimal": "error",
        "@stylistic/no-mixed-operators": ["error", {
            allowSamePrecedence: true,
            groups: [
                ["==", "!=", "===", "!==", ">", ">=", "<", "<="],
                ["&&", "||"],
                ["in", "instanceof"],
            ],
        }],
        "@stylistic/no-mixed-spaces-and-tabs": "error",
        "@stylistic/no-tabs": indent === "tab" ? "off" : "error",
        "@stylistic/no-trailing-spaces": "error",
        "@stylistic/operator-linebreak": ["error", "before"],
        "@stylistic/quote-props": ["error", quoteProps],
        "@stylistic/semi": ["error", semi ? "always" : "never"],
        "@stylistic/semi-spacing": ["error", { after: true, before: false }],
        "@stylistic/space-infix-ops": "error",
        "@stylistic/space-unary-ops": ["error", { nonwords: false, words: true }],
        "@stylistic/spaced-comment": ["error", "always", {
            block: {
                balanced: true,
                exceptions: ["*"],
                markers: ["!"],
            },
            line: {
                exceptions: ["/", "#"],
                markers: ["/"],
            },
        }],
        "@stylistic/type-annotation-spacing": ["error", {}],
        "@stylistic/type-generic-spacing": "error",
        "@stylistic/type-named-tuple-spacing": "error",
        "@stylistic/wrap-iife": ["error", "any", { functionPrototypeMethods: true }],
        "@stylistic/yield-star-spacing": ["error", "before"],
        "@stylistic/eol-last": ["error", "never"],

        ...jsx
            ? {
                "@stylistic/jsx-closing-bracket-location": "error",
                "@stylistic/jsx-closing-tag-location": "error",
                "@stylistic/jsx-curly-brace-presence": ["error", { propElementValues: "always" }],
                "@stylistic/jsx-curly-newline": "error",
                "@stylistic/jsx-curly-spacing": ["error", "never"],
                "@stylistic/jsx-equals-spacing": "error",
                "@stylistic/jsx-first-prop-new-line": "error",
                "@stylistic/jsx-function-call-newline": ["error", "multiline"],
                "@stylistic/jsx-indent": ["error", indent],
                "@stylistic/jsx-indent-props": ["error", indent],
                "@stylistic/jsx-max-props-per-line": ["error", { maximum: 1, when: "multiline" }],
                "@stylistic/jsx-one-expression-per-line": ["error", { allow: "single-child" }],
                "@stylistic/jsx-quotes": "error",
                "@stylistic/jsx-props-no-multi-spaces": "error",
                "@stylistic/jsx-self-closing-comp": ["error", { component: true, html: false }],
                "@stylistic/jsx-tag-spacing": [
                    "error",
                    {
                        afterOpening: "never",
                        beforeClosing: "never",
                        beforeSelfClosing: "always",
                        closingSlash: "never",
                    },
                ],
                "@stylistic/jsx-wrap-multilines": [
                    "error",
                    {
                        arrow: "parens-new-line",
                        assignment: "parens-new-line",
                        condition: "parens-new-line",
                        declaration: "parens-new-line",
                        logical: "parens-new-line",
                        prop: "parens-new-line",
                        propertyValue: "parens-new-line",
                        return: "parens-new-line",
                    },
                ],
            }
            : {},
    };

    if(pluginName !== "@stylistic") {
        const regex = /^@stylistic\//;
        rules = Object.fromEntries(Object.entries(rules!)
            .map(([ruleName, ruleConfig]) => [
                ruleName.replace(regex, `${pluginName}/`),
                ruleConfig,
            ]));
    }

    if(flat) {
        return {
            name: "reallyx/style",
            plugins: {
                [pluginName]: { ...await interopDefault(import("@stylistic/eslint-plugin")), configs: undefined },
            },
            rules,
        } satisfies Linter.Config;
    }
    if(pluginName !== "@stylistic")
        throw new Error("PluginName in non-flat config can not be customized");

    return {
        ...{ name: "reallyx/style" },
        plugins: ["@stylistic"],
        rules,
    } satisfies Linter.BaseConfig;
}

export default defineStylistic;