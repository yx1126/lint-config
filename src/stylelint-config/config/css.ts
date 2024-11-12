import type { Config } from "stylelint";
import { BaseConfig } from "../stylelint";

export function defineCssRules(): Config["rules"] {
    return {
        "no-descending-specificity": true,
        "declaration-block-no-duplicate-custom-properties": true,
        "declaration-block-no-duplicate-properties": [
            true,
            {
                ignore: ["consecutive-duplicates-with-different-syntaxes"],
            },
        ],
        "font-family-no-duplicate-names": true,
        "keyframe-block-no-duplicate-selectors": true,
        "no-duplicate-at-import-rules": true,
        "no-duplicate-selectors": true,
        "block-no-empty": true,
        "comment-no-empty": true,
        "no-empty-source": true,
        "color-no-invalid-hex": true,
        "function-calc-no-unspaced-operator": true,
        "keyframe-declaration-no-important": true,
        "media-query-no-invalid": true,
        "named-grid-areas-no-invalid": true,
        "no-invalid-double-slash-comments": true,
        "no-invalid-position-at-import-rule": true,
        "string-no-newline": true,
        "no-irregular-whitespace": true,
        "custom-property-no-missing-var-function": true,
        "font-family-no-missing-generic-family-keyword": true,
        "function-linear-gradient-no-nonstandard-direction": true,
        "declaration-block-no-shorthand-property-overrides": true,
        "selector-anb-no-unmatchable": true,
        "annotation-no-unknown": true,
        "property-no-unknown": true,
        "selector-pseudo-class-no-unknown": true,
        "selector-pseudo-element-no-unknown": true,
        "import-notation": "string",
        "selector-type-no-unknown": [
            true,
            {
                ignore: ["custom-elements"],
            },
        ],
        "at-rule-no-unknown": true,
        "unit-no-unknown": true,
        "function-name-case": "lower",
        "selector-type-case": "lower",
        "value-keyword-case": "lower",
        "at-rule-empty-line-before": [
            "always",
            {
                except: ["blockless-after-same-name-blockless", "first-nested"],
                ignore: ["after-comment"],
            },
        ],
        "comment-empty-line-before": [
            "always",
            {
                except: ["first-nested"],
                ignore: ["stylelint-commands"],
            },
        ],
        "custom-property-empty-line-before": [
            "always",
            {
                except: ["after-custom-property", "first-nested"],
                ignore: ["after-comment", "inside-single-line-block"],
            },
        ],
        "declaration-empty-line-before": [
            "always",
            {
                except: ["after-declaration", "first-nested"],
                ignore: ["after-comment", "inside-single-line-block"],
            },
        ],
        "rule-empty-line-before": [
            "always-multi-line",
            {
                except: ["first-nested"],
                ignore: ["after-comment"],
            },
        ],
        "declaration-block-single-line-max-declarations": 1,
        "number-max-precision": 4,
        "shorthand-property-no-redundant-values": true,
        "comment-whitespace-inside": "always",
    }
}

export default function defineCssConfig(config?: BaseConfig): Required<Config>["overrides"] {
    return [{
        files: ["*.css", "**/*.css", ...(config?.files || [])],
        rules: {
            ...defineCssRules(),
            ...config?.rules,
        },
    }];
}
