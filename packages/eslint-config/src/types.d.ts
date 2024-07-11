import type { FlatESLintConfig as BaseFlatESLintConfig } from "eslint-define-config";
import type { Linter } from "eslint";
import type { ParserOptions } from "@typescript-eslint/parser";

export interface DeprecatedConfig {
    indent?: "tab" | number;
};

export interface RulesConfig extends DeprecatedConfig {
    type?: "default" | "deprecated" | "global",
}

export type Rules = Linter.RulesRecord;

export interface BaseConfig extends DeprecatedConfig {
    files?: string[],
    deprecated?: boolean;
    rules?: FlatESLintConfig["rules"];
}

export interface JsonConfig extends Omit<BaseConfig, "deprecated"> {
    package?: boolean;
    rules?: Rules;
}

export interface YamlConfig extends Omit<BaseConfig, "deprecated"> {
    rules?: Rules;
}

export interface TsConfig extends BaseConfig {
    parserOptions?: ParserOptions;
    rules?: Rules;
}

export interface VueCinfig extends Omit<BaseConfig, "deprecated"> {
    v2?: boolean;
    typescript?: boolean;
    rules?: Rules;
}

export type Enable<T extends object> = T & {
    enable?: boolean;
}

export interface EslintConfig {
    indent?: DeprecatedConfig["indent"];
    package?: boolean;
    deprecated?: boolean;
    base?: BaseConfig;
    yaml?: boolean | Enable<YamlConfig>;
    jsonc?: boolean | Enable<Omit<JsonConfig, "package">>;
    typescript?: boolean | Enable<TsConfig>;
    vue?: boolean | Enable<VueCinfig>;
    flatESLintConfig?: FlatESLintConfig[]
}

export interface FlatESLintConfig extends BaseFlatESLintConfig {
    name?: string;
}
