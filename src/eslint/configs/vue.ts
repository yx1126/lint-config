import { mergeProcessors } from "eslint-merge-processors";
import processorVueBlocks from "eslint-processor-vue-blocks";
import { interopDefault } from "../../utils";
import type { FlatESLintConfig, VueRulesConfig, VueConfig, Rules } from "../../../types/eslint";

const globals: Record<string, "readonly" | "writable" | false | "readable" | true | "writeable" | "off"> = {
    computed: "readonly",
    defineEmits: "readonly",
    defineExpose: "readonly",
    defineProps: "readonly",
    onMounted: "readonly",
    onUnmounted: "readonly",
    reactive: "readonly",
    ref: "readonly",
    shallowReactive: "readonly",
    shallowRef: "readonly",
    toRef: "readonly",
    toRefs: "readonly",
    watch: "readonly",
    watchEffect: "readonly",
};

export function defineVueRules(config?: VueRulesConfig): Rules {
    const { indent = 4, typescript, blockLang } = config || {};
    return {
        "vue/html-indent": ["error", indent],
        "vue/script-indent": ["error", indent, {
            baseIndent: 0,
            switchCase: 0,
        }],
        "vue/html-quotes": ["error", "double", { avoidEscape: true }],
        "vue/max-attributes-per-line": "off",
        "vue/v-slot-style": ["error", {
            atComponent: "shorthand",
            default: "shorthand",
            named: "shorthand",
        }],
        "vue/no-v-html": "error",
        "vue/singleline-html-element-content-newline": "off",
        "vue/one-component-per-file": "off",
        "vue/no-reserved-component-names": "off",
        "vue/html-self-closing": ["error", {
            html: {
                void: "never",
                normal: "any",
                component: "always",
            },
            svg: "always",
            math: "always",
        }],
        "vue/component-name-in-template-casing": ["error", "kebab-case", {
            ignores: ["/^[A-Z][a-z0-9]+$/"],
        }],
        "vue/require-default-prop": "off",
        "vue/require-prop-types": "off",
        "vue/multi-word-component-names": "off",
        "vue/block-tag-newline": ["error", {
            singleline: "always",
            multiline: "always",
        }],
        "vue/define-emits-declaration": ["error", "type-literal"],
        "vue/define-macros-order": ["error", {
            order: ["defineOptions", "defineModel", "defineProps", "defineEmits", "defineSlots"],
            defineExposeLast: true,
        }],
        "vue/define-props-declaration": "error",
        "vue/html-comment-indent": ["error", indent],
        "vue/no-empty-component-block": "error",
        "vue/no-this-in-before-route-enter": "error",
        "vue/no-unused-emit-declarations": "error",
        "vue/no-unused-refs": "error",
        "vue/no-useless-v-bind": "error",
        "vue/padding-line-between-blocks": "error",
        "vue/prefer-true-attribute-shorthand": "error",
        "vue/require-default-export": "error",
        "vue/require-macro-variable-name": "error",
        "vue/block-lang": ["error", {
            script: {
                lang: typescript ? ["ts", "tsx"] : ["jsx"],
                allowNoLang: !typescript,
            },
            ...blockLang,
        }],
    };
}

export default async function defineVueConfig(config?: VueConfig): Promise<FlatESLintConfig[]> {
    const { files = [], vueVersion = 3, typescript, blockLang, indent = 4, rules } = config || {};
    const sfcBlocks = config?.sfcBlocks === true ? {} : config?.sfcBlocks ?? {};
    const pluginVue = await interopDefault(import("eslint-plugin-vue"));
    return [{
        name: "yx1126/vue/setup",
        languageOptions: {
            globals,
        },
        plugins: {
            vue: pluginVue,
        },
    }, {
        name: "yx1126/vue",
        files: ["*.vue", "**/*.vue", ...files],
        languageOptions: {
            parser: await interopDefault(import("vue-eslint-parser")),
            parserOptions: {
                parser: typescript ? await interopDefault(import("@typescript-eslint/parser")) as any : null,
                extraFileExtensions: [".vue"],
                sourceType: "module",
                ecmaFeatures: {
                    jsx: true,
                },
            },
        },
        processor: sfcBlocks === false
            ? pluginVue.processors[".vue"]
            : mergeProcessors([
                pluginVue.processors[".vue"],
                processorVueBlocks({
                    ...sfcBlocks,
                    blocks: {
                        styles: true,
                        ...sfcBlocks.blocks,
                    },
                }),
            ]),
        rules: {
            ...pluginVue.configs.base.rules,
            ...vueVersion === 2
                ? {
                    ...pluginVue.configs.essential.rules,
                    ...pluginVue.configs["strongly-recommended"].rules,
                    ...pluginVue.configs.recommended.rules,
                }
                : {
                    ...pluginVue.configs["vue3-essential"].rules,
                    ...pluginVue.configs["vue3-strongly-recommended"].rules,
                    ...pluginVue.configs["vue3-recommended"].rules,
                },
            ...defineVueRules({ indent, typescript, blockLang }),
            ...rules,
        },
    }];
}