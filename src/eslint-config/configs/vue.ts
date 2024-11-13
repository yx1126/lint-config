import type { FlatESLintConfig, RulesConfig, VueCinfig, Rules } from "../eslint";
import pluginVue from "eslint-plugin-vue";
import VueParser from "vue-eslint-parser";
import { parser as TsParser } from "typescript-eslint";

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
}

export function defineVueRules(config?: RulesConfig): Rules {
    const { type, indent } = config || {};
    if( type === "global") {
        return {
            "vue/multi-word-component-names": "off",
        }
    }
    return {
        "vue/html-indent": ["error", indent ?? 4],
        "vue/script-indent": ["error", indent ?? 4, {
            baseIndent: 0,
            switchCase: 0,
        }],
        "vue/html-quotes": ["error", "double", { "avoidEscape": true }],
        "vue/max-attributes-per-line": ["error", {
            "singleline": {
                "max": 12,
            },
            "multiline": {
                "max": 1,
            },
        }],
        "vue/require-default-prop": "off",
        "vue/v-slot-style": ["error", {
            "atComponent": "shorthand",
            "default": "shorthand",
            "named": "shorthand",
        }],
        "vue/no-v-html": "error",
        "vue/singleline-html-element-content-newline": "off",
        "vue/one-component-per-file": "off",
        "vue/no-reserved-component-names": "off",
        "vue/html-self-closing": ["error", {
            "html": {
                "void": "never",
                "normal": "any",
                "component": "always"
            },
            svg: "always",
            math: "always"
        }],
        "vue/component-name-in-template-casing": ["error", "kebab-case", {
            "ignores": ["/^[A-Z][a-z0-9]+$/"]
        }],
    }
}

export default function defineVueConfig(config?: VueCinfig): FlatESLintConfig[] {
    const { files = [], v2, typescript, indent, rules } = config || {};
    return [
        ...pluginVue.configs[v2 ? "flat/vue2-recommended" :"flat/recommended"],
        {
            name: "yx1126/vue",
            files: ["**/*.vue", ...files],
            languageOptions: {
                globals,
                parser: VueParser,
                parserOptions: {
                    parser: typescript ? TsParser : null,
                    extraFileExtensions: [".vue"],
                    sourceType: "module",
                    ecmaFeatures: {
                        jsx: true,
                    },
                },
            },
            rules: {
                ...defineVueRules({ indent }),
                ...rules
            }
        },
        {
            name: "yx1126/vue/global",
            rules: defineVueRules({ type: "global" })
        }
    ];
}
