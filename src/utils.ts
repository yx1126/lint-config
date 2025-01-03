import type { IsEnable } from "../types/types";
import type { EslintConfig, FlatESLintConfig } from "./eslint";

export const isBol = (v: unknown): v is boolean => typeof v === "boolean";

export const isObj = <T extends object>(v: unknown): v is T => Object.prototype.toString.call(v) === "[object Object]";

export const isStr = (v: unknown): v is string => typeof v === "string";

export const isArray = <T = any>(v: unknown): v is T[] => Array.isArray(v);

export function getFlatRules(flats: FlatESLintConfig[]) {
    return flats.reduce<FlatESLintConfig["rules"]>((pre, item) => {
        return Object.assign({}, pre, item.rules);
    }, {});
}

/**
 * Is enable
 * @template {object} T
 * @param {IsEnable<T>} [config]
 * @param {boolean} [defaultValue]
 * @returns {boolean}
 */
export function isEnable<T extends object>(config?: IsEnable<T>, defaultValue?: boolean): boolean {
    if(isBol(config)) return config;
    if(isObj<T>(config)) {
        if(isBol(config.enable)) return config.enable;
        if(isBol(defaultValue)) return defaultValue;
        return true;
    }
    return !!defaultValue;
}

/**
 * Get config
 * @template {object} T
 * @param {boolean | T} [config]
 * @param {T} [defaultValue]
 * @returns {T}
 */
export function getConfig<T extends object>(config?: boolean | T, defaultValue?: T): T {
    return Object.assign({}, defaultValue, (isBol(config) ? {} : config)) satisfies T;
}

/**
 * Get files list
 * @param {string | string[]} [files]
 * @returns {string[]}
 */
export function getFiles(files?: string | string[]) {
    return isArray(files) ? files : isStr(files) ? [files] : [];
}

/**
 * Flat files
 * @param {string[]} files
 * @returns {string[]}
 */
export function flatFiles(files: string[]) {
    return files.flatMap(f => [`*.${f}`, `**/*.${f}`]);
}

/**
 *
 * @param {EslintConfig} config
 * @param {EslintConfig[]} [...values]
 * @returns
 */
export function mergeConfig(config?: EslintConfig, ...values: EslintConfig[]) {
    const baseConfig: EslintConfig = config || {};
    values.forEach(item => {
        Object.entries(item).forEach(([_key, value]) => {
            const key = _key as keyof EslintConfig;
            if(isObj(value)) {
                baseConfig[key] = Object.assign(baseConfig[key] as any, value);
            } else if(isArray(value)) {
                baseConfig[key] = [...baseConfig[key] as any, ...value] as any;
            } else {
                baseConfig[key] = value as any;
            }
        });
    });
    return baseConfig;
}