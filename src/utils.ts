import { FlatESLintConfig } from "./eslint/eslint";
import type { IsEnable } from "./types";

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
export function isEnable<T extends object>(config?: IsEnable<T>, defaultValue = true): boolean {
    if(isBol(config)) return config;
    if(isObj<T>(config)) return config?.enable ?? defaultValue;
    return defaultValue;
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