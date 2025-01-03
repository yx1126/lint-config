import type { FlatESLintConfig as BaseFlatESLintConfig } from "eslint-define-config";
import type { Linter } from "eslint";
import type { ParserOptions } from "@typescript-eslint/parser";
import type { IsEnable } from "./types";
import type { StylisticCustomizeOptions } from "@stylistic/eslint-plugin";
import type { Options as VueBlocksOptions } from "eslint-processor-vue-blocks";

export type Rules = Linter.RulesRecord;

export interface Indent {
    indent?: "tab" | number;
};

export interface RulesConfig extends Indent {
    type?: "default" | "global";
}

export interface BaseConfig {
    files?: string[];
    rules?: FlatESLintConfig["rules"];
}

export interface JsonConfig extends BaseConfig, Indent {
    package?: boolean;
    tsconfig?: boolean;
    rules?: Rules;
}

export interface YamlConfig extends BaseConfig, Indent {
    rules?: Rules;
}

export interface TsConfig extends BaseConfig {
    parserOptions?: ParserOptions;
    rules?: Rules;
}

export interface VueConfig extends BaseConfig, Indent {
    vueVersion?: 2 | 3;
    typescript?: boolean;
    sfcBlocks?: IsEnable<VueBlocksOptions>;
    rules?: Rules;
}

export interface SvelteConfig<T = any> extends BaseConfig, Indent {
    typescript?: boolean;
    rules?: Rules;
    svelteConfig?: T;
}

export interface EslintConfig {
    package?: boolean;
    tsconfig?: boolean;
    base?: BaseConfig;
    yaml?: IsEnable<YamlConfig>;
    json?: IsEnable<Omit<JsonConfig, "package" | "tsconfig">>;
    typescript?: IsEnable<TsConfig>;
    vue?: IsEnable<VueConfig>;
    svelte?: IsEnable<SvelteConfig>;
    stylistic?: IsEnable<StylisticCustomizeOptions<false>>;
    flatESLintConfig?: FlatESLintConfig[];
}

export interface FlatESLintConfig extends BaseFlatESLintConfig {
    name?: string;
}