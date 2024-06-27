import { EslintConfig, FlatESLintConfig } from "./types";
import defineBaseConfig from "./configs/base";
import defineJsonConfig from "./configs/jsonc";
import defineYamlConfig from "./configs/yaml";
import defineTsConfig from "./configs/typescript";
import defineVueConfig from "./configs/vue";

const isBol = (v: unknown): v is boolean => typeof v === "boolean";

const isObj = (v: unknown) => Object.prototype.toString.call(v) === "[object Object]";

function isEnable(config?: boolean | { enable?: boolean }) {
    if(isBol(config)) return config;
    if(isObj(config)) return config?.enable ?? true;
    return false;
}

function getConfig<T extends object>(config?: boolean | T): T {
    return (isBol(config) ? {} : config) as T;
}

function defineEslint(config?: EslintConfig, ...flats: FlatESLintConfig[]): FlatESLintConfig[] {
    const { jsonc, package: pkg, yaml, typescript, vue } = config || {};
    // javascript
    const result: FlatESLintConfig[] = [
        ...defineBaseConfig({
            deprecated: config?.deprecated,
            indent: config?.indent ?? 4,
            ...config?.base,
        }),
    ];
    // jsonc
    const verifyJson = isEnable(jsonc);
    if(verifyJson) {
        result.push(...defineJsonConfig({
            indent: config?.indent ?? 4,
            ...getConfig(jsonc),
            package: pkg,
        }));
    }
    // yaml
    const verifyYaml = isEnable(yaml)
    if(verifyYaml) {
        result.push(...defineYamlConfig({
            indent: config?.indent ?? 2,
            ...getConfig(yaml)
        }));
    }
    // typescript
    const verifyTs = isEnable(typescript);
    if(verifyTs) {
        result.push(...defineTsConfig({
            deprecated: config?.deprecated,
            indent: config?.indent ?? 4,
            ...getConfig(typescript)
        }));
    }
    // vue
    const verifyVue = isEnable(vue);
    if(verifyVue) {
        result.push(...defineVueConfig({
            typescript: verifyTs,
            indent: config?.indent ?? 4,
            ...getConfig(typescript)
        }));
    }
    result.push(...flats);
    return result;
}

export  {
    defineEslint
}

export default defineEslint;
