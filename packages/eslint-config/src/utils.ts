import { FlatESLintConfig } from "./types";

const isBol = (v: unknown): v is boolean => typeof v === "boolean";

const isObj = (v: unknown) => Object.prototype.toString.call(v) === "[object Object]";

export function getFlatRules(flats: FlatESLintConfig[]) {
    return flats.reduce<FlatESLintConfig["rules"]>((pre, item) => {
        return Object.assign({}, pre, item.rules);
    }, {})
}

export function isEnable(config?: boolean | { enable?: boolean }) {
    if(isBol(config)) return config;
    if(isObj(config)) return config?.enable ?? true;
    return false;
}

export function getConfig<T extends object>(config?: boolean | T): T {
    return (isBol(config) ? {} : config) as T;
}
