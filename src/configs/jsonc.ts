import jsonc from "eslint-plugin-jsonc";
import { getFlatRules } from "../utils";
import type { FlatESLintConfig, JsonConfig, RulesConfig, Rules } from "../../types/eslint";

export function defineJsoncRules(config?: RulesConfig): Rules {
    const { indent = 4 } = config || {};
    return {
        ...getFlatRules(jsonc.configs["flat/recommended-with-jsonc"]),
        "jsonc/array-bracket-newline": ["error",
            {
                multiline: true,
                minItems: null,
            },
        ],
        "jsonc/array-bracket-spacing": ["error", "never"],
        "jsonc/indent": ["error", indent],
        "jsonc/comma-dangle": ["error", "never"],
        "jsonc/comma-style": ["error", "last"],
        "jsonc/key-spacing": ["error",
            {
                beforeColon: false,
                afterColon: true,
                mode: "strict",
            },
        ],
        "jsonc/object-curly-newline": ["error", { multiline: true, consistent: true }],
        "jsonc/object-curly-spacing": ["error", "always"],
        "jsonc/quotes": ["error", "double"],
    };
}

/**
 * Sort package.json
 * @returns {FlatESLintConfig[]}
 */
export function definePkgSort(): FlatESLintConfig[] {
    return [{
        name: "yx1126/jsonc/package-json",
        files: ["**/package.json"],
        rules: {
            "jsonc/sort-keys": [
                "error",
                {
                    pathPattern: "^$",
                    order: [
                        "name",
                        "displayName",
                        "type",
                        "version",
                        "private",
                        "packageManager",
                        "description",
                        "keywords",
                        "license",
                        "author",
                        "contributors",
                        "funding",
                        "files",
                        "main",
                        "module",
                        "exports",
                        "unpkg",
                        "jsdelivr",
                        "browser",
                        "bin",
                        "man",
                        "directories",
                        "homepage",
                        "repository",
                        "bugs",
                        "publishConfig",
                        "scripts",
                        "peerDependencies",
                        "peerDependenciesMeta",
                        "optionalDependencies",
                        "dependencies",
                        "devDependencies",
                        "engines",
                        "config",
                        "overrides",
                        "pnpm",
                        "husky",
                        "lint-staged",
                        "eslintConfig",
                    ],
                },
                {
                    order: { type: "asc" },
                    pathPattern: "^(?:dev|peer|optional|bundled)?[Dd]ependencies$",
                },
                {
                    order: [
                        "types",
                        "import",
                        "require",
                        "default",
                    ],
                    pathPattern: "^exports.*$",
                },
            ],
        },
    }];
}

/**
 * Sort tsconfig.json
 * @returns {FlatESLintConfig[]}
 */
export function defineTsSort(): FlatESLintConfig[] {
    return [{
        name: "yx1126/jsonc/tsconfig-json",
        files: ["**/tsconfig.json", "**/tsconfig.*.json"],
        rules: {
            "jsonc/sort-keys": [
                "error",
                {
                    order: [
                        "extends",
                        "compilerOptions",
                        "references",
                        "files",
                        "include",
                        "exclude",
                    ],
                    pathPattern: "^$",
                },
                {
                    order: [
                        /* Projects */
                        "incremental",
                        "composite",
                        "tsBuildInfoFile",
                        "disableSourceOfProjectReferenceRedirect",
                        "disableSolutionSearching",
                        "disableReferencedProjectLoad",
                        /* Language and Environment */
                        "target",
                        "jsx",
                        "jsxFactory",
                        "jsxFragmentFactory",
                        "jsxImportSource",
                        "lib",
                        "moduleDetection",
                        "noLib",
                        "reactNamespace",
                        "useDefineForClassFields",
                        "emitDecoratorMetadata",
                        "experimentalDecorators",
                        /* Modules */
                        "baseUrl",
                        "rootDir",
                        "rootDirs",
                        "customConditions",
                        "module",
                        "moduleResolution",
                        "moduleSuffixes",
                        "noResolve",
                        "paths",
                        "resolveJsonModule",
                        "resolvePackageJsonExports",
                        "resolvePackageJsonImports",
                        "typeRoots",
                        "types",
                        "allowArbitraryExtensions",
                        "allowImportingTsExtensions",
                        "allowUmdGlobalAccess",
                        /* JavaScript Support */
                        "allowJs",
                        "checkJs",
                        "maxNodeModuleJsDepth",
                        /* Type Checking */
                        "strict",
                        "strictBindCallApply",
                        "strictFunctionTypes",
                        "strictNullChecks",
                        "strictPropertyInitialization",
                        "allowUnreachableCode",
                        "allowUnusedLabels",
                        "alwaysStrict",
                        "exactOptionalPropertyTypes",
                        "noFallthroughCasesInSwitch",
                        "noImplicitAny",
                        "noImplicitOverride",
                        "noImplicitReturns",
                        "noImplicitThis",
                        "noPropertyAccessFromIndexSignature",
                        "noUncheckedIndexedAccess",
                        "noUnusedLocals",
                        "noUnusedParameters",
                        "useUnknownInCatchVariables",
                        /* Emit */
                        "declaration",
                        "declarationDir",
                        "declarationMap",
                        "downlevelIteration",
                        "emitBOM",
                        "emitDeclarationOnly",
                        "importHelpers",
                        "importsNotUsedAsValues",
                        "inlineSourceMap",
                        "inlineSources",
                        "mapRoot",
                        "newLine",
                        "noEmit",
                        "noEmitHelpers",
                        "noEmitOnError",
                        "outDir",
                        "outFile",
                        "preserveConstEnums",
                        "preserveValueImports",
                        "removeComments",
                        "sourceMap",
                        "sourceRoot",
                        "stripInternal",
                        /* Interop Constraints */
                        "allowSyntheticDefaultImports",
                        "esModuleInterop",
                        "forceConsistentCasingInFileNames",
                        "isolatedDeclarations",
                        "isolatedModules",
                        "preserveSymlinks",
                        "verbatimModuleSyntax",
                        /* Completeness */
                        "skipDefaultLibCheck",
                        "skipLibCheck",
                    ],
                    pathPattern: "^compilerOptions$",
                },
            ],
        },
    }];
}

export default function defineJsonConfig(config?: JsonConfig): FlatESLintConfig[] {
    const { files = [], indent = 4, package: pkg, tsconfig, rules } = config || {};
    const result: FlatESLintConfig[] = [
        ...jsonc.configs["flat/base"],
        {
            name: "yx1126/jsonc",
            files: ["**/*.json", "**/*.json5", "**/*.jsonc", ...files],
            rules: {
                ...defineJsoncRules({ indent }),
                ...rules,
            },
        },
    ];
    if(pkg) {
        result.push(...definePkgSort());
    }
    if(tsconfig) {
        result.push(...defineTsSort());
    }
    return result;
}