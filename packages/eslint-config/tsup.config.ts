import { defineConfig } from 'tsup';

export default defineConfig({
    entry: [
        'index.ts',
      ],
      shims: true,
      external: [
        "eslint-define-config",
        "eslint-plugin-jsonc",
        "eslint-plugin-vue",
        "eslint-plugin-yml",
        "typescript-eslint",
        "@typescript-eslint/parser"
      ]
})
