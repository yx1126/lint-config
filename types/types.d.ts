export type IsEnable<T extends object> = boolean | (T & {
    enable?: boolean;
});

export type Awaitable<T> = T | Promise<T>;