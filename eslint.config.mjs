import { defineEslint } from "@yx1126/eslint-config";

export default defineEslint({
    deprecated: true,
    jsonc: true,
    package: true,
    yaml: true,
    typescript: {
        parserOptions: {
            project: true,
            EXPERIMENTAL_useProjectService: true
        }
    }
});
