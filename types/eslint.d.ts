import type { Linter } from "eslint";
import type { ParserOptions } from "@typescript-eslint/parser";
import type { IsEnable, VendoredPrettierOptions } from "./types";
import type { StylisticCustomizeOptions } from "@stylistic/eslint-plugin";
import type { Options as VueBlocksOptions } from "eslint-processor-vue-blocks";

export type Rules = Linter.RulesRecord;

export type FlatESLintConfig = Linter.Config;

export interface RulesConfig {
    indent?: "tab" | number;
};

export interface VueRulesConfig extends RulesConfig {
    typescript?: boolean;
    blockLang?: Record<string, {
        lang: string | string[];
        allowNoLang?: boolean;
    }>;
}

export interface BaseConfig {
    files?: string[];
    rules?: FlatESLintConfig["rules"];
}

export interface JsonConfig extends BaseConfig, RulesConfig {
    package?: boolean;
    tsconfig?: boolean;
    rules?: Rules;
}

export interface YamlConfig extends BaseConfig, RulesConfig {
    rules?: Rules;
}

export interface TsConfig extends BaseConfig {
    parserOptions?: ParserOptions;
    rules?: Rules;
    typeChecked?: boolean;
}

export interface VueConfig extends BaseConfig, VueRulesConfig {
    vueVersion?: 2 | 3;
    sfcBlocks?: boolean | VueBlocksOptions;
    rules?: Rules;
}

export interface SvelteConfig<T = any> extends BaseConfig, RulesConfig {
    typescript?: boolean;
    rules?: Rules;
    svelteConfig?: T;
}

export interface CssConfig extends BaseConfig, RulesConfig, Pick<StylisticCustomizeOptions, "quotes" | "semi"> {
    prettierOptions?: VendoredPrettierOptions;
    css?: BaseConfig;
    scss?: BaseConfig;
    less?: BaseConfig;
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
    css?: IsEnable<CssConfig>;
    stylistic?: IsEnable<StylisticCustomizeOptions>;
    flatESLintConfig?: FlatESLintConfig[];
    ignore?: string[];
    rules?: Rules;
}

export interface FlatESLintConfig extends BaseFlatESLintConfig {
    name?: string;
}