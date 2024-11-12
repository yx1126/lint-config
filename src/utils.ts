import { FlatESLintConfig } from "./eslint-config/eslint";

export const isBol = (v: unknown): v is boolean => typeof v === "boolean";

export const isObj = <T extends object>(v: unknown): v is T => Object.prototype.toString.call(v) === "[object Object]";

export const isStr = (v: unknown): v is string => typeof v === "string";

export const isArray = <T = any>(v: unknown): v is T[] => Array.isArray(v);

export function getFlatRules(flats: FlatESLintConfig[]) {
    return flats.reduce<FlatESLintConfig["rules"]>((pre, item) => {
        return Object.assign({}, pre, item.rules);
    }, {})
}

export function isEnable(config?: boolean | { enable?: boolean }) {
    if(isBol(config)) return config;
    if(isObj(config)) return config?.enable ?? true;
    return true;
}

export function getConfig<T extends object>(config?: boolean | T): T {
    return (isBol(config) ? {} : config) as T;
}
