import { defineConfig } from "tsup";

export default defineConfig({
    clean: true,
    dts: true,
    shims: true,
    treeshake: true,
    format: ["esm", "cjs"],
    entry: [
        "src/index.ts",
    ],
    external: [
        "vue-eslint-parser",
        "typescript-eslint",
    ],
})
