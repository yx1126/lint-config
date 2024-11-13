import type { FlatESLintConfig as BaseFlatESLintConfig } from "eslint-define-config";
import type { Linter } from "eslint";
import type { ParserOptions } from "@typescript-eslint/parser";
import type { Enable } from "../types";
import type { StylisticCustomizeOptions } from "@stylistic/eslint-plugin";

export type Rules = Linter.RulesRecord;

export interface DeprecatedConfig {
    indent?: "tab" | number;
};

export interface RulesConfig extends DeprecatedConfig {
    type?: "default" | "global",
}

export interface BaseConfig extends DeprecatedConfig {
    files?: string[],
    rules?: FlatESLintConfig["rules"];
}

export interface JsonConfig extends BaseConfig, DeprecatedConfig {
    package?: boolean;
    rules?: Rules;
}

export interface YamlConfig extends BaseConfig, DeprecatedConfig {
    rules?: Rules;
}

export interface TsConfig extends BaseConfig {
    parserOptions?: ParserOptions;
    rules?: Rules;
}

export interface VueCinfig extends BaseConfig {
    v2?: boolean;
    typescript?: boolean;
    rules?: Rules;
}

export interface EslintConfig<Flat extends boolean = false> {
    indent?: DeprecatedConfig["indent"];
    package?: boolean;
    deprecated?: boolean;
    base?: BaseConfig;
    yaml?: boolean | Enable<YamlConfig>;
    jsonc?: boolean | Enable<Omit<JsonConfig, "package">>;
    typescript?: boolean | Enable<TsConfig>;
    vue?: boolean | Enable<VueCinfig>;
    stylistic?: boolean | Enable<StylisticCustomizeOptions<Flat>>
    flatESLintConfig?: FlatESLintConfig[]
}

export interface FlatESLintConfig extends BaseFlatESLintConfig {
    name?: string;
}
