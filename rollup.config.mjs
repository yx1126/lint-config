// @ts-check
import { defineConfig } from "rollup";
import typescript from "@rollup/plugin-typescript";
import resolve from "@rollup/plugin-node-resolve";
import commonjs from "@rollup/plugin-commonjs";
import json from "@rollup/plugin-json";
import dts from "rollup-plugin-dts";
import fs from "fs-extra";

const input = {
    index: "./src/index.ts",
};

const pkg = fs.readJsonSync("./package.json");

const external = [
    ...Object.keys(pkg?.dependencies || {}),
];

export default defineConfig([{
    input,
    output: [{
        dir: "dist",
        format: "esm",
        entryFileNames: "[name].js",
        exports: "named",
    }, {
        dir: "dist",
        format: "cjs",
        entryFileNames: "[name].cjs",
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
        // file: "./dist/index.d.ts",
        dir: "dist",
        format: "esm",
    },
    external,
    plugins: [dts()],
}]);