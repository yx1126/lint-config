import eslint from "./eslint";
export { defineEslint } from "./eslint";
export { defineStyleLint } from "./stylelint";

export default {
    eslint: eslint.configs,
};