# @yx1126/eslint-config

## Usage

### Install

```bash
pnpm add -D eslint @yx1126/eslint-config
```

### Config `eslint.config.mjs`

```javascript
import yx1126 from "@yx1126/eslint-config";
import { defineFlatConfig } from "eslint-define-config";

export default defineFlatConfig([
    ...yx1126.configs["base"],
]);
```

#### or

[configs](https://github.com/yx1126/front-config/blob/main/packages/eslint-config/src/types.d.ts#L45)

```javascript
import { defineEslint } from "@yx1126/eslint-config";

export default defineEslint({
    // ...configs
});
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

## License

[MIT](./LICENSE) License &copy; 2023 [Ch Yang](https://github.com/yx1126)