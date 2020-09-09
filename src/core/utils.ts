import { defaultStyles } from "@/constants";

export function capitalize(str: string) {
    return str.charAt(0).toUpperCase() + str.slice(1);
}

export function range(start: number, end: number) {
    if (start > end) {
        [end, start] = [start, end];
    }

    return new Array(end - start + 1).fill("").map((_, index) => start + index);
}

export function isEqual(a: any, b: any) {
    if (typeof a === "object" && typeof b === "object") {
        return JSON.stringify(a) === JSON.stringify(b);
    }
    return a === b;
}

export function camelToDash(str: string) {
    return str.replace(/[A-Z]/g, (m) => "-" + m.toLowerCase());
}

export function toInlineStyles(styles: { [key: string]: string }) {
    try {
        return Object.keys(defaultStyles)
            .map((key) => `${camelToDash(key)}: ${styles[key]}`)
            .join(";");
    } catch (error) {}
}

export function debounce(fn: CallableFunction, wait: number) {
    let timeout: NodeJS.Timeout;

    return (...args: any) => {
        const callback = () => {
            clearTimeout(timeout);
            fn(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(callback, wait);
    };
}
