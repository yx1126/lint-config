import { EslintConfig, FlatESLintConfig } from "../types/eslint";
import defineBaseConfig, { defineRules } from "./configs/javascript";
import defineTsConfig, { defineTsRules } from "./configs/typescript";
import defineVueConfig, { defineVueRules } from "./configs/vue";
import defineSvelteConfig, { defineSvelteRules } from "./configs/svelte";
import defineJsonConfig, { defineJsoncRules, definePkgSort, defineTsSort } from "./configs/jsonc";
import defineYamlConfig, { defineYamlRules } from "./configs/yaml";
import defineIgnores, { defineIgnoresRules } from "./configs/ignores";
import defineCssConfig, { mergePrettierOptions } from "./configs/css";
import defineStylistic from "./configs/stylistic";
import { isEnable, getConfig, mergeConfig } from "./utils";
import { isPackageExists } from "local-pkg";
import { FlatConfigComposer } from "eslint-flat-config-utils";
import { Awaitable } from "../types/types";
export type * from "../types/eslint";

const VuePackages = [
    "vue",
    "nuxt",
    "vitepress",
    "@slidev/cli",
];

function defineBaseEslint(config?: EslintConfig): FlatConfigComposer<FlatESLintConfig>;
function defineBaseEslint(config: EslintConfig, ...flats: FlatESLintConfig[]): FlatConfigComposer<FlatESLintConfig>;
function defineBaseEslint(config?: EslintConfig, ...flats: FlatESLintConfig[]): FlatConfigComposer<FlatESLintConfig> {
    const {
        json,
        package: pkg,
        tsconfig,
        yaml,
        typescript,
        vue,
        svelte,
        css,
        stylistic: style,
        ignore,
        rules,
    } = config || {};

    const verifyVue = isEnable(vue, VuePackages.some(i => isPackageExists(i)));
    const verifyTs = isEnable(typescript, isPackageExists("typescript"));
    const verifySvelte = isEnable(svelte);
    const verifyJson = isEnable(json);
    const verifyYaml = isEnable(yaml);
    const verifyCss = isEnable(css);
    const verifyStyle = isEnable(style);
    // stylistic options
    const styleConfig = getConfig(style);

    // javascript
    const result: Array<Awaitable<FlatESLintConfig[]>> = [
        defineBaseConfig({
            ...config?.base,
        }),
        defineIgnores(ignore),
    ];
    // typescript
    if(verifyTs) {
        const tsConfig = getConfig(typescript);
        const files = [...(tsConfig?.files || [])];
        if(verifyVue) {
            files.push("**/*.vue");
        }
        result.push(defineTsConfig({
            ...tsConfig,
            files,
        }));
    }
    // stylistic
    if(verifyStyle) {
        result.push(defineStylistic(styleConfig) as any);
    }
    // vue
    if(verifyVue) {
        result.push(defineVueConfig({
            typescript: verifyTs,
            ...getConfig(vue, { indent: styleConfig.indent }),
        }));
    }
    // svelte
    if(verifySvelte) {
        result.push(defineSvelteConfig({
            typescript: verifyTs,
            ...getConfig(svelte, { indent: styleConfig.indent }),
        }));
    }
    // jsonc
    if(verifyJson) {
        result.push(defineJsonConfig({
            ...getConfig(json, { indent: styleConfig.indent }),
            package: pkg,
            tsconfig: verifyTs ? tsconfig ?? true : false,
        }));
    }
    // yaml
    if(verifyYaml) {
        result.push(defineYamlConfig(getConfig(yaml, { indent: styleConfig.indent })));
    }
    // css
    if(verifyCss) {
        result.push(defineCssConfig({
            semi: styleConfig.semi,
            quotes: styleConfig.quotes,
            ...getConfig(css),
        }));
    }
    if(rules) {
        flats.push({ rules });
    }
    result.push((config?.flatESLintConfig || []), flats);
    const composer = new FlatConfigComposer<FlatESLintConfig>();
    composer.append(...result);
    return composer;
}

function defineEslint(config?: EslintConfig): FlatConfigComposer<FlatESLintConfig>;
function defineEslint(config: EslintConfig, ...flats: FlatESLintConfig[]): FlatConfigComposer<FlatESLintConfig>;
function defineEslint(config?: EslintConfig, ...flats: FlatESLintConfig[]): FlatConfigComposer<FlatESLintConfig> {
    const _config: EslintConfig = mergeConfig({
        package: true,
        json: true,
        stylistic: {
            indent: 4,
        },
        yaml: {
            enable: true,
            indent: 2,
        },
    }, config || {});
    return defineBaseEslint(_config, ...flats);
}

export {
    defineBaseEslint,
    defineEslint,
    // configs
    defineBaseConfig,
    defineTsConfig,
    defineVueConfig,
    defineSvelteConfig,
    defineJsonConfig,
    definePkgSort,
    defineTsSort,
    defineYamlConfig,
    defineIgnores,
    defineStylistic,
    defineCssConfig,
    // rules
    defineRules,
    defineTsRules,
    defineVueRules,
    defineSvelteRules,
    defineJsoncRules,
    defineYamlRules,
    defineIgnoresRules,
    // utils
    mergePrettierOptions,
};

export default defineBaseEslint;