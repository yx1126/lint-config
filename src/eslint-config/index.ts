import { EslintConfig, FlatESLintConfig } from "./eslint";
import defineBaseConfig, { defineRules } from "./configs/base";
import defineTsConfig, { defineTsRules } from "./configs/typescript";
import defineVueConfig, { defineVueRules } from "./configs/vue";
import defineJsonConfig, { defineJsoncRules, defineOrders } from "./configs/jsonc";
import defineYamlConfig, { defineYamlRules } from "./configs/yaml";
import defineIgnores, { defineIgnoresRules } from "./configs/ignores";
import defineStylistic from "./configs/stylistic";
import { isEnable, getConfig } from "../utils";

function defineEslint(config?: EslintConfig): FlatESLintConfig[];
function defineEslint(config: EslintConfig, ...flats: FlatESLintConfig[]): FlatESLintConfig[];
function defineEslint(config?: EslintConfig, ...flats: FlatESLintConfig[]): FlatESLintConfig[] {
    const { jsonc, package: pkg, yaml, typescript, vue, stylistic: style } = config || {};
    const verifyVue = isEnable(vue);
    const verifyTs = isEnable(typescript);
    const verifyJson = isEnable(jsonc);
    const verifyYaml = isEnable(yaml);
    const verifyStyle = isEnable(style);

    // stylistic options
    const styleConfig = getConfig(style);

    // javascript
    const files = [...(config?.base?.files || [])];
    if(verifyVue) {
        files.push("**/*.vue");
    }
    const result: FlatESLintConfig[] = [
        ...defineBaseConfig({
            ...config?.base,
            files,
        }),
        ...defineIgnores(),
    ];
    // typescript
    if(verifyTs) {
        const tsConfig = getConfig(typescript);
        const tsFiles = [...(tsConfig?.files || [])];
        if(verifyVue) {
            tsFiles.push("**/*.vue");
        }
        result.push(...defineTsConfig({
            ...tsConfig,
            files: tsFiles,
        }));
    }
    // vue
    if(verifyVue) {
        result.push(...defineVueConfig({
            typescript: verifyTs,
            indent: styleConfig.indent,
            ...getConfig(vue),
        }));
    }
    // jsonc
    if(verifyJson) {
        result.push(...defineJsonConfig({
            indent: styleConfig.indent,
            ...getConfig(jsonc),
            package: pkg,
        }));
    }
    // yaml
    if(verifyYaml) {
        result.push(...defineYamlConfig({
            indent: styleConfig.indent,
            ...getConfig(yaml)
        }));
    }
    // stylistic
    if(verifyStyle) {
        result.push(defineStylistic(styleConfig) as any);
    }
    result.push(...(config?.flatESLintConfig || []), ...flats);
    return result;
}

const configs = {
    base: defineEslint(),
    baseV2: defineEslint({
        vue: { v2: true }
    }),
    js: defineBaseConfig(),
    ts: [
        ...defineBaseConfig(),
        ...defineTsConfig(),
    ],
    ignores: defineIgnores(),
    jsonc: defineJsonConfig(),
    yaml: defineYamlConfig(),
};

export {
    defineEslint,
    defineRules,
    defineTsRules,
    defineVueRules,
    defineJsoncRules,
    defineOrders,
    defineYamlRules,
    defineIgnoresRules,
    defineStylistic,
}

export default {
    configs,
};
