import type { FlatESLintConfig, Rules, CustomRuleOptions } from "eslint-define-config";
import type { Linter, Rule } from "eslint";
import type { ParserOptions } from "@typescript-eslint/parser";

export interface DeprecatedConfig {
    indent: "tab" | number;
};

export type BaseRules = Linter.RulesRecord;

export interface BaseConfig extends DeprecatedConfig {
    deprecated?: boolean;
    rules?: FlatESLintConfig["rules"];
}

export interface JsonConfig extends DeprecatedConfig {
    package?: boolean;
    rules?: BaseRules;
}

export interface YamlConfig extends DeprecatedConfig {
    rules?: BaseRules;
}

export interface TsConfig extends DeprecatedConfig {
    deprecated?: boolean;
    rules?: BaseRules;
    parserOptions?: ParserOptions;
}

export interface VueCinfig extends DeprecatedConfig {
    typescript?: boolean;
    rules?: BaseRules;
}

export type Enable<T extends object> = T & {
    enable?: boolean;
}

export interface EslintConfig extends Partial<DeprecatedConfig> {
    package?: boolean;
    deprecated?: boolean;
    base?: BaseConfig;
    yaml?: boolean | Enable<Partial<YamlConfig>>;
    jsonc?: boolean | Enable<Partial<Omit<JsonConfig, "package">>>;
    typescript?: boolean | Enable<Partial<TsConfig>>;
    vue?: boolean | Enable<Partial<VueCinfig>>;
}

export {
    FlatESLintConfig
}
