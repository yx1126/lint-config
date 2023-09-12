export interface PackageOptions {
    version: string;
    file: RegExp;
}

/**
 * versions
 */
export const versions: Array<PackageOptions> = [
    { version: "0.0.7", file: /^eslint-/ },
];
