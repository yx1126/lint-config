import { defineConfig } from "rollup";
import typescript from "@rollup/plugin-typescript";
import resolve from "@rollup/plugin-node-resolve";
import commonjs from "@rollup/plugin-commonjs";
import json from "@rollup/plugin-json";
import dts from "rollup-plugin-dts";

const input = "./src/index.ts";

const external = [
    "vue-eslint-parser",
    "typescript-eslint",
    "eslint-define-config",
    "eslint-plugin-jsonc",
    "eslint-plugin-vue",
    "eslint-plugin-yml",
    "eslint",
    "globals",
    "@typescript-eslint/parser"
]

export default defineConfig([{
    input,
    output: [{
        file: "./dist/index.cjs",
        format: "cjs",
        exports: "named"
    }, {
        file: "./dist/index.mjs",
        format: "esm",
        exports: "named"
    }],
    plugins: [
        commonjs(),
        json(),
        resolve(),
        typescript(),
    ],
    external,
}, {
    input,
    output: {
        file: "./dist/index.d.ts",
        format: "esm"
    },
    external,
    plugins: [dts()]
}]);
