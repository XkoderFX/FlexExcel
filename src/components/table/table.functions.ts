import { range } from "core/utils";

export type CordObject = { row: number; col: number };

export function cellsMatrix(target: CordObject, current: CordObject) {
    const cols = range(current.col, target.col);
    const rows = range(current.row, target.row);

    return cols.reduce((acc, col) => {
        rows.forEach((row) => acc.push(`${col}:${row}`));
        return acc;
    }, []);
}

export function nextSelector(key: string, { row, col }: CordObject) {
    const MIN_VALUE = 0;
    switch (key) {
        case "Enter":
        case "ArrowDown":
            row++;
            break;
        case "Tab":
        case "ArrowRight":
            col++;
            break;
        case "ArrowLeft":
            col = col - 1 < MIN_VALUE ? MIN_VALUE : col - 1;
            break;
        case "ArrowUp":
            row = row - 1 < MIN_VALUE ? MIN_VALUE : row - 1;
            break;
    }

    return `[data-id="${col}:${row}"]`;
}
