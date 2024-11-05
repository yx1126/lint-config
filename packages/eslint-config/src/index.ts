import { EslintConfig, FlatESLintConfig } from "./types";
import defineBaseConfig, { defineRules } from "./configs/base";
import defineTsConfig, { defineTsRules } from "./configs/typescript";
import defineVueConfig, { defineVueRules } from "./configs/vue";
import defineJsonConfig, { defineJsoncRules, defineOrders } from "./configs/jsonc";
import defineYamlConfig, { defineYamlRules } from "./configs/yaml";
import defineIgnores, { defineIgnoresRules } from "./configs/ignores";
import { isEnable, getConfig } from "./utils";

export type { EslintConfig } from "./types";

function defineEslint(config?: EslintConfig, ...flats: FlatESLintConfig[]): FlatESLintConfig[] {
    const { jsonc, package: pkg, yaml, typescript, vue } = config || {};
    const verifyVue = isEnable(vue);
    const verifyTs = isEnable(typescript);
    const verifyJson = isEnable(jsonc);
    const verifyYaml = isEnable(yaml);

    // javascript
    const files = [...(config?.base?.files || [])];
    if(verifyVue) {
        files.push("**/*.vue");
    }
    const result: FlatESLintConfig[] = [
        ...defineBaseConfig({
            deprecated: config?.deprecated,
            ...config?.base,
            files,
        }),
        ...defineIgnores(),
    ];
    // typescript
    if(verifyTs) {
        result.push(...defineTsConfig({
            deprecated: config?.deprecated,
            ...getConfig(typescript)
        }));
    }
    // vue
    if(verifyVue) {
        result.push(...defineVueConfig({
            typescript: verifyTs,
            ...getConfig(vue),
        }));
    }
    // jsonc
    if(verifyJson) {
        result.push(...defineJsonConfig({
            ...getConfig(jsonc),
            package: pkg,
        }));
    }
    // yaml
    if(verifyYaml) {
        result.push(...defineYamlConfig({
            ...getConfig(yaml)
        }));
    }
    result.push(...(config?.flatESLintConfig || []), ...flats);
    return result;
}

const config: EslintConfig = {
    deprecated: true,
    jsonc: true,
    package: true,
    yaml: true,
    vue: true,
    typescript: true,
}

const configs = {
    base: defineEslint(config),
    baseV2: defineEslint({
        ...config,
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
}

export default {
    configs,
};
