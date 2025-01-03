export type IsEnable<T extends object> = boolean | (T & {
    enable?: boolean;
});