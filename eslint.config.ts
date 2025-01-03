import { defineEslint } from "./src/eslint";

export default defineEslint({
    json: true,
    package: true,
    tsconfig: true,
    stylistic: true,
});