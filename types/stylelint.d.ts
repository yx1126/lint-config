/* eslint-disable @typescript-eslint/no-empty-object-type */
import type { Config } from "stylelint";
import type { IsEnable } from "./types";

export type ConfigOverride = Required<Config>["overrides"];

export interface BaseConfig {
    files?: ConfigOverride[number]["files"];
    rules?: Config["rules"];
}

export interface CssConfig extends BaseConfig { }

export interface ScssConfig extends BaseConfig { }

export interface StylelintConfig extends Config {
    css?: IsEnable<CssConfig>;
    scss?: IsEnable<ScssConfig>;
}