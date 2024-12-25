import { EslintConfig, FlatESLintConfig } from "./eslint"
import defineBaseConfig, { defineRules } from "./configs/base"
import defineTsConfig, { defineTsRules } from "./configs/typescript"
import defineVueConfig, { defineVueRules } from "./configs/vue"
import defineJsonConfig, { defineJsoncRules, definePkgSort, defineTsSort } from "./configs/jsonc"
import defineYamlConfig, { defineYamlRules } from "./configs/yaml"
import defineIgnores, { defineIgnoresRules } from "./configs/ignores"
import defineStylistic from "./configs/stylistic"
import { isEnable, getConfig } from "../utils"
import { isPackageExists } from "local-pkg"
export type * from "./eslint"

const VuePackages = [
    "vue",
    "nuxt",
    "vitepress",
    "@slidev/cli",
]

function defineEslint(config?: EslintConfig): FlatESLintConfig[]
function defineEslint(config: EslintConfig, ...flats: FlatESLintConfig[]): FlatESLintConfig[]
function defineEslint(config?: EslintConfig, ...flats: FlatESLintConfig[]): FlatESLintConfig[] {
    const { jsonc, package: pkg, tsconfig, yaml, typescript, vue, stylistic: style } = config || {}
    const verifyVue = isEnable(vue, VuePackages.some(i => isPackageExists(i)))
    const verifyTs = isEnable(typescript, isPackageExists("typescript"))
    const verifyJson = isEnable(jsonc)
    const verifyYaml = isEnable(yaml)
    const verifyStyle = isEnable(style)
    // stylistic options
    const styleConfig = getConfig(style, { indent: 4 })

    // javascript
    const result: FlatESLintConfig[] = [
        ...defineBaseConfig({
            ...config?.base,
        }),
        ...defineIgnores(),
    ]
    // typescript
    if(verifyTs) {
        const tsConfig = getConfig(typescript)
        const tsFiles = [...(tsConfig?.files || [])]
        if(verifyVue) {
            tsFiles.push("**/*.vue")
        }
        result.push(...defineTsConfig({
            ...tsConfig,
            files: tsFiles,
        }))
    }
    // stylistic
    if(verifyStyle) {
        result.push(defineStylistic(styleConfig) as any)
    }
    // vue
    if(verifyVue) {
        result.push(...defineVueConfig({
            typescript: verifyTs,
            ...getConfig(vue, { indent: styleConfig.indent }),
        }))
    }
    // jsonc
    if(verifyJson) {
        result.push(...defineJsonConfig({
            ...getConfig(jsonc, { indent: styleConfig.indent }),
            package: pkg ?? true,
            tsconfig: tsconfig ?? true,
        }))
    }
    // yaml
    if(verifyYaml) {
        result.push(...defineYamlConfig(getConfig(yaml, { indent: styleConfig.indent })))
    }
    result.push(...(config?.flatESLintConfig || []), ...flats)
    return result
}

const configs = {
    base: defineEslint(),
    baseV2: defineEslint({
        vue: { vueVersion: 2 },
    }),
    js: defineBaseConfig(),
    ts: [
        ...defineBaseConfig(),
        ...defineTsConfig(),
    ],
    ignores: defineIgnores(),
    jsonc: defineJsonConfig(),
    yaml: defineYamlConfig(),
}

export {
    defineEslint,
    // configs
    defineBaseConfig,
    defineTsConfig,
    defineVueConfig,
    defineJsonConfig,
    definePkgSort,
    defineTsSort,
    defineYamlConfig,
    defineIgnores,
    defineStylistic,
    // rules
    defineRules,
    defineTsRules,
    defineVueRules,
    defineJsoncRules,
    defineYamlRules,
    defineIgnoresRules,
}

export default {
    configs,
}