import type { FlatESLintConfig as BaseFlatESLintConfig } from "eslint-define-config";
import type { Linter } from "eslint";
import type { ParserOptions } from "@typescript-eslint/parser";
import type { Enable } from "../types";
import type { StylisticCustomizeOptions } from "@stylistic/eslint-plugin";

export type Rules = Linter.RulesRecord;

export interface Indent {
    indent?: "tab" | number;
};

export interface RulesConfig extends Indent {
    type?: "default" | "global",
}

export interface BaseConfig {
    files?: string[],
    rules?: FlatESLintConfig["rules"];
}

export interface JsonConfig extends BaseConfig, Indent {
    package?: boolean;
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
    v2?: boolean;
    typescript?: boolean;
    rules?: Rules;
}

export interface EslintConfig {
    package?: boolean;
    deprecated?: boolean;
    base?: BaseConfig;
    yaml?: boolean | Enable<YamlConfig>;
    jsonc?: boolean | Enable<Omit<JsonConfig, "package">>;
    typescript?: boolean | Enable<TsConfig>;
    vue?: boolean | Enable<VueConfig>;
    stylistic?: boolean | Enable<StylisticCustomizeOptions<false>>
    flatESLintConfig?: FlatESLintConfig[]
}

export interface FlatESLintConfig extends BaseFlatESLintConfig {
    name?: string;
}
