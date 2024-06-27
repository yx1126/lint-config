import type { FlatESLintConfig, YamlConfig } from "../types";
import yml from "eslint-plugin-yml";


export default function defineYamlConfig(config: YamlConfig): FlatESLintConfig[] {
    return [
        ...yml.configs["flat/standard"],
        {
            files: ["**/*.y?(a)ml"],
            rules: {
                "spaced-comment": "off",
                "yml/indent": ["error", config.indent],
                ...config?.rules,
            },
        },
    ];
}
