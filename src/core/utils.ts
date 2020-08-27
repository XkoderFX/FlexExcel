export function capitalize(str: string) {
    return str.charAt(0).toUpperCase() + str.slice(1);
}

export function range(start: number, end: number) {
    if (start > end) {
        [end, start] = [start, end];
    }

    return new Array(end - start + 1).fill("").map((_, index) => start + index);
}
