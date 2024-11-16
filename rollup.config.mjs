// @ts-check
import { defineConfig } from "rollup"
import typescript from "@rollup/plugin-typescript"
import resolve from "@rollup/plugin-node-resolve"
import commonjs from "@rollup/plugin-commonjs"
import json from "@rollup/plugin-json"
import dts from "rollup-plugin-dts"
import fs from "fs-extra"

const input = "./src/index.ts"
const pkg = fs.readJsonSync("./package.json")

const external = [
    ...Object.keys(pkg?.dependencies || {}),
    "vue-eslint-parser",
    "@typescript-eslint/eslint-plugin",
]

export default defineConfig([{
    input,
    output: [{
        file: "./dist/index.cjs",
        format: "cjs",
        exports: "named",
    }, {
        file: "./dist/index.js",
        format: "esm",
        exports: "named",
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
        format: "esm",
    },
    external,
    plugins: [dts()],
}])