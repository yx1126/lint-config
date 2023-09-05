# @yx1126/eslint-config

## Usage

### Install

```bash
pnpm add -D eslint @yx1126/eslint-config
```

### Config `.eslintrc`

```json
{
    "extends": "@yx1126/eslint-config"
}
```

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

### VS Code support (auto fix)

Install [VS Code ESLint extension](https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint)

Add the following settings to your `settings.json`:

```jsonc
{
    "editor.formatOnSave": true,
    "editor.codeActionsOnSave": {
        "source.fixAll.eslint": false,
    },
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
    ]
}
```

### TypeScript Aware Rules

Type aware rules are enabled when a `tsconfig.json` is found in the project root, which will introduce some stricter rules into your project. If you want to use for example `tsconfig.eslint.json` in the project root, you can change tsconfig name by modifying `ESLINT_TSCONFIG` env.

```js
// .eslintrc.js
const process = require("node:process");

process.env.ESLINT_TSCONFIG = "tsconfig.eslint.json";

module.exports = {
    extends: "@yx1126/eslint-config"
}
```

## License

[MIT](./LICENSE) License &copy; 2023 [Ch Yang](https://github.com/yx1126)