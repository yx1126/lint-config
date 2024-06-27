import type { FlatESLintConfig, Rules } from "eslint-define-config";
import type {  } from "typescript-eslint";
import type { ParserOptions } from "@typescript-eslint/parser";

export interface DeprecatedConfig {
    indent?: "tab" | number;
};

export interface BaseConfig extends DeprecatedConfig {
    deprecated?: boolean;
    rules?: FlatESLintConfig["rules"];
}

export interface JsonConfig extends DeprecatedConfig {
    package?: boolean;
    rules?: FlatESLintConfig["rules"];
}

export interface YamlConfig extends DeprecatedConfig {
    rules?: FlatESLintConfig["rules"];
}

export interface TsConfig extends DeprecatedConfig {
    deprecated?: boolean;
    rules?: FlatESLintConfig["rules"];
    parserOptions?: ParserOptions;
}

export interface VueCinfig extends DeprecatedConfig {
    typescript?: boolean;
    rules?: FlatESLintConfig["rules"];

}

export interface EslintConfig {
    typescript?: boolean;
    vue?: boolean;
    yaml?: boolean;
    jsonc: boolean;
    package?: boolean;
}

export {
    FlatESLintConfig
}
