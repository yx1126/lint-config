import type { Config } from "stylelint"
import defineCssConfig, { defineCssRules } from "./config/css"
import defineScssConfig, { defineScssRules } from "./config/scss"
import { StylelintConfig } from "./stylelint"
import { isEnable, getConfig, isStr } from "../utils"

export function defineStyleLint(config?: StylelintConfig): Config {
    const { css, scss, ...other } = config || {}
    const verifyCss = isEnable(css)
    const verifyScss = isEnable(scss)
    const result: Config = {
        ...other,
        overrides: [...(other.overrides || [])],
    }
    if(verifyCss) {
        const cssConfig = getConfig(css)
        const files = []
        if(Array.isArray(cssConfig.files)) {
            files.push(...cssConfig.files)
        } else if(isStr(cssConfig.files)) {
            files.push(cssConfig.files)
        }
        if(verifyScss) files.push(...["*.scss", "*.sass", "**/*.scss", "**/*.sass"])
        result.overrides!.push(...defineCssConfig({
            ...cssConfig,
            files,
        }))
    }
    if(verifyScss) {
        result.overrides!.push(...defineScssConfig(getConfig(scss)))
    }

    return result
}

export {
    defineCssRules,
    defineCssConfig,
    defineScssRules,
}

export default {}