import type { Config } from "stylelint";
import type { Enable } from "../types";

export type ConfigOverride = Config["overrides"];

export interface BaseConfig {
    files?: string | string[];
    rules?: Config["rules"];
}

export interface CssConfig extends BaseConfig { }

export interface ScssConfig extends BaseConfig { }

export interface StylelintConfig extends Config {
    css?: Enable<CssConfig> | boolean;
    scss?: Enable<ScssConfig> | boolean;
}
