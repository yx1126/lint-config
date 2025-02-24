# @yx1126/lint-config

### Install

```bash
pnpm add @yx1126/lint-config -D
```

## Eslint Usage

### Config `eslint.config.mjs`

```javascript
import { defineEslint } from "@yx1126/lint-config";

export default defineEslint({
    // ...configs
});
```

EslintConfig see [configs](https://github.com/yx1126/lint-config/blob/main/types/eslint.d.ts#L51)

### Add script for package.json

For example:

```json
{
    "scripts": {
        "lint": "eslint .",
        "lint:fix": "eslint . --fix"
    }
}
```

## Stylelint Usage

### Config `stylelint.config.mjs`

```javascript
import { defineStyleLint } from "@yx1126/lint-config";

export default defineStyleLint({
    // ...configs
});
```

StylelintConfig see [configs](https://github.com/yx1126/lint-config/blob/main/types/stylelint.d.ts#L16)

### Add script for package.json

For example:

```json
{
    "scripts": {
        "stylelint": "stylelint \"**/*.{css,scss}\"",
        "stylelint:fix": "stylelint \"**/*.{css,scss}\" --fix"
    }
}
```

### VS Code support (auto fix)

Install [VS Code ESLint extension](https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint)

Add the following settings to your `settings.json`:

```jsonc
{
    "editor.formatOnSave": true,
    "editor.codeActionsOnSave": {
        "source.fixAll.eslint": false
    },
    // eslint
    "eslint.format.enable": true,
    "eslint.useFlatConfig": true,
    "eslint.validate": ["vue", "javascript", "javascriptreact", "typescript", "typescriptreact", "jsonc", "json", "json5", "yaml", "yml"],
    // stylelint
    "stylelint.enable": true,
    "stylelint.validate": ["css", "scss", "sass", "vue"]
}
```

## License

[MIT](./LICENSE) License &copy; 2023 [Ch Yang](https://github.com/yx1126)
