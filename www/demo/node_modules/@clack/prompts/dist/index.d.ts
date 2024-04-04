export { isCancel } from '@clack/core';

interface TextOptions {
    message: string;
    placeholder?: string;
    defaultValue?: string;
    initialValue?: string;
    validate?: (value: string) => string | void;
}
declare const text: (opts: TextOptions) => Promise<string | symbol>;
interface PasswordOptions {
    message: string;
    mask?: string;
    validate?: (value: string) => string | void;
}
declare const password: (opts: PasswordOptions) => Promise<string | symbol>;
interface ConfirmOptions {
    message: string;
    active?: string;
    inactive?: string;
    initialValue?: boolean;
}
declare const confirm: (opts: ConfirmOptions) => Promise<boolean | symbol>;
type Primitive = Readonly<string | boolean | number>;
type Option<Value> = Value extends Primitive ? {
    value: Value;
    label?: string;
    hint?: string;
} : {
    value: Value;
    label: string;
    hint?: string;
};
interface SelectOptions<Options extends Option<Value>[], Value> {
    message: string;
    options: Options;
    initialValue?: Value;
    maxItems?: number;
}
declare const select: <Options extends Option<Value>[], Value>(opts: SelectOptions<Options, Value>) => Promise<symbol | Value>;
declare const selectKey: <Options extends Option<Value>[], Value extends string>(opts: SelectOptions<Options, Value>) => Promise<symbol | Value>;
interface MultiSelectOptions<Options extends Option<Value>[], Value> {
    message: string;
    options: Options;
    initialValues?: Value[];
    required?: boolean;
    cursorAt?: Value;
}
declare const multiselect: <Options extends Option<Value>[], Value>(opts: MultiSelectOptions<Options, Value>) => Promise<symbol | Value[]>;
interface GroupMultiSelectOptions<Options extends Option<Value>[], Value> {
    message: string;
    options: Record<string, Options>;
    initialValues?: Value[];
    required?: boolean;
    cursorAt?: Value;
}
declare const groupMultiselect: <Options extends Option<Value>[], Value>(opts: GroupMultiSelectOptions<Options, Value>) => Promise<symbol | Value[]>;
declare const note: (message?: string, title?: string) => void;
declare const cancel: (message?: string) => void;
declare const intro: (title?: string) => void;
declare const outro: (message?: string) => void;
type LogMessageOptions = {
    symbol?: string;
};
declare const log: {
    message: (message?: string, { symbol }?: LogMessageOptions) => void;
    info: (message: string) => void;
    success: (message: string) => void;
    step: (message: string) => void;
    warn: (message: string) => void;
    /** alias for `log.warn()`. */
    warning: (message: string) => void;
    error: (message: string) => void;
};
declare const spinner: () => {
    start: (msg?: string) => void;
    stop: (msg?: string, code?: number) => void;
    message: (msg?: string) => void;
};
type PromptGroupAwaitedReturn<T> = {
    [P in keyof T]: Exclude<Awaited<T[P]>, symbol>;
};
interface PromptGroupOptions<T> {
    /**
     * Control how the group can be canceled
     * if one of the prompts is canceled.
     */
    onCancel?: (opts: {
        results: Prettify<Partial<PromptGroupAwaitedReturn<T>>>;
    }) => void;
}
type Prettify<T> = {
    [P in keyof T]: T[P];
} & {};
type PromptGroup<T> = {
    [P in keyof T]: (opts: {
        results: Prettify<Partial<PromptGroupAwaitedReturn<Omit<T, P>>>>;
    }) => void | Promise<T[P] | void>;
};
/**
 * Define a group of prompts to be displayed
 * and return a results of objects within the group
 */
declare const group: <T>(prompts: PromptGroup<T>, opts?: PromptGroupOptions<T> | undefined) => Promise<PromptGroupAwaitedReturn<T> extends infer T_1 ? { [P in keyof T_1]: PromptGroupAwaitedReturn<T>[P]; } : never>;

export { ConfirmOptions, GroupMultiSelectOptions, LogMessageOptions, MultiSelectOptions, PasswordOptions, PromptGroup, PromptGroupAwaitedReturn, PromptGroupOptions, SelectOptions, TextOptions, cancel, confirm, group, groupMultiselect, intro, log, multiselect, note, outro, password, select, selectKey, spinner, text };
