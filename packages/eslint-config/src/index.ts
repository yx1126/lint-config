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
    // javascript
    const result: FlatESLintConfig[] = [
        ...defineBaseConfig({
            deprecated: config?.deprecated,
            ...config?.base,
        }),
        ...defineIgnores(),
    ];
    // typescript
    const verifyTs = isEnable(typescript);
    if(verifyTs) {
        result.push(...defineTsConfig({
            deprecated: config?.deprecated,
            ...getConfig(typescript)
        }));
    }
    // vue
    const verifyVue = isEnable(vue);
    if(verifyVue) {
        result.push(...defineVueConfig({
            typescript: verifyTs,
            ...getConfig(typescript),
        }));
    }
    // jsonc
    const verifyJson = isEnable(jsonc);
    if(verifyJson) {
        result.push(...defineJsonConfig({
            ...getConfig(jsonc),
            package: pkg,
        }));
    }
    // yaml
    const verifyYaml = isEnable(yaml);
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
    typescript: {
        parserOptions: {
            EXPERIMENTAL_useProjectService: true
        }
    },
}

const configs = {
    base: defineEslint(config),
    v2: defineEslint({
        ...config,
        vue: {
            v2: true
        }
    }),
    js: defineBaseConfig(),
    ts: [
        ...defineBaseConfig(),
        ...defineTsConfig({
            parserOptions: {
                EXPERIMENTAL_useProjectService: true
            }
        }),
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
