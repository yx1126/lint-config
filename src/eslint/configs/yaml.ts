import type { FlatESLintConfig, YamlConfig, Rules, RulesConfig } from "../eslint"
import { getFlatRules } from "../../utils"
import yml from "eslint-plugin-yml"

export function defineYamlRules(config?: RulesConfig): Rules {
    const { indent = 2 } = config || {}
    return {
        ...getFlatRules(yml.configs["flat/standard"]),
        "spaced-comment": "off",
        "yml/indent": ["error", indent],
    }
}

export default function defineYamlConfig(config?: YamlConfig): FlatESLintConfig[] {
    const { files = [], indent = 2, rules } = config || {}
    return [
        ...yml.configs["flat/base"],
        {
            name: "reallyx/yaml",
            files: ["**/*.y?(a)ml", ...files],
            rules: {
                ...defineYamlRules({ indent }),
                ...rules,
            },
        },
    ]
}