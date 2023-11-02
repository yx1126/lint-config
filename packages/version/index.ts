export interface PackageOptions {
    version: string;
    file: RegExp | RegExp[];
}

/**
 * versions
 */
export const versions: Array<PackageOptions> = [
    { version: "0.0.12", file: [/^eslint-/, /lint-config-utils/] },
];
