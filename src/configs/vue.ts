import type { FlatESLintConfig, VueCinfig } from "../types";
import pluginVue from "eslint-plugin-vue";
import VueParser from "vue-eslint-parser";
import { parser as TsParser } from "typescript-eslint";

export default function defineVueConfig(config?: VueCinfig): FlatESLintConfig[] {
    return [
        ...pluginVue.configs["flat/recommended"],
        {
            files: ["**/*.vue"],
            languageOptions: {
                globals: {
                    computed: 'readonly',
                    defineEmits: 'readonly',
                    defineExpose: 'readonly',
                    defineProps: 'readonly',
                    onMounted: 'readonly',
                    onUnmounted: 'readonly',
                    reactive: 'readonly',
                    ref: 'readonly',
                    shallowReactive: 'readonly',
                    shallowRef: 'readonly',
                    toRef: 'readonly',
                    toRefs: 'readonly',
                    watch: 'readonly',
                    watchEffect: 'readonly',
                },
                parser: VueParser,
                parserOptions: {
                    parser: config?.typescript ? TsParser : undefined,
                    extraFileExtensions: ['.vue'],
                    sourceType: 'module',
                    ecmaFeatures: {
                        jsx: true,
                    },
                },
            },
        }
    ];
}
