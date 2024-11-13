# @reallyx/front-config

### Install

```bash
pnpm add @reallyx/front-config -D
```

## Eslint Usage

### Config `eslint.config.mjs`

```javascript
import { defineEslint } from "@reallyx/front-config";

export default defineEslint({
    // ...configs
});
```
EslintConfig see [configs](https://github.com/yx1126/front-config/blob/main/src/eslint-config/eslint.d.ts#L43)

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
import { defineStyleLint } from "@reallyx/front-config";

export default defineStyleLint({
    // ...configs
});
```
StylelintConfig see [configs](https://github.com/yx1126/front-config/blob/main/src/stylelint-config/stylelint.d.ts#L15)

### Add script for package.json

For example:

```json
{
    "scripts": {
        "stylelint": "stylelint \"**/*.{css,scss}\"",
        "stylelint:fix": "stylelint \"**/*.{css,scss}\" --fix",
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
        "source.fixAll.eslint": false,
    },
    // eslint
    "eslint.format.enable": true,
    "eslint.useFlatConfig": true,
    "eslint.validate": [
        "vue",
		"javascript",
		"javascriptreact",
		"typescript",
		"typescriptreact",
		"jsonc",
		"json",
		"json5",
		"yaml",
		"yml"
    ],
    // stylelint
    "stylelint.enable": true,
    "stylelint.validate": [
        "css",
        "scss",
        "sass",
        "vue"
    ],
}
```

## License

[MIT](./LICENSE) License &copy; 2023 [Ch Yang](https://github.com/yx1126)