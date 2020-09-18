import { State } from "core/stateTypes";
import { toInlineStyles } from "core/utils";
import { defaultStyles } from "@/constants";
import { parse } from "core/parse";

export enum CODES {
    A = 65,
    Z = 90,
}

type letterColumnParameters = { letter: string; index: number; width: number };

function createRow(
    content: string,
    index?: number,
    height: number = 24
): string {
    const resizer = index
        ? /*html*/ `<div data-resize="row" class="row-resize"></div>`
        : "";

    return `
    <tr class="table__row">
        <td data-type="resizable" 
        data-row=${index ?? "nd"} 
        class="table__column table__column-num" 
        style="height:${height}px" 
        data-row >
            ${index ?? ""}
            ${resizer}
        </td>
        ${content}
    </tr>
    `;
}

function createLetterColumn({ letter, index, width }: letterColumnParameters) {
    return /*html*/ `
        <th class="table__column table__column--head"
            style="min-width:${width}px" 
            data-col=${index}
            data-type="resizable">
            ${letter}
            <div data-resize="col" class="col-resize"></div>
        </th>
    `;
}

function createColumn(x: number, y: number, state: State) {
    const id = `${x}:${y}`;

    const data = state.dataState[id] ?? "";

    const style = toInlineStyles({
        ...defaultStyles,
        ...state.stylesState[id],
    });

    return /*html*/ `
        <td data-id="${x}:${y}" data-value="${data}" style='${style}' data-type="cell" class="table__column">
            <input type="text" data-id="${x}:${y}" style='${style}' data-value="${data}" value="${parse(
        data
    )}"  />
        </td>
    `;
}

function createVirtualCol(state: any) {
    return (letter: any, index: number) => {
        return { letter, index, width: getWidthFromState(state, index) };
    };
}

const ToChar = (_: any, index: number) => String.fromCharCode(CODES.A + index);

const getWidthFromState = (state: State, index: number) => {
    return state.colState[index] || 100;
};

const getHeightFromState = (state: State, index: number) => {
    return state.rowState[index] || 24;
};

export function createTable(rowsCount = 10, state: any) {
    const colsCount = CODES.Z - CODES.A + 1;
    const rows: string[] = [];

    const cols = new Array(colsCount)
        .fill("")
        .map(ToChar)
        .map(createVirtualCol(state))
        .map(createLetterColumn)
        .join("");

    rows.push(createRow(cols));

    for (let i = 0; i < rowsCount; i++) {
        const cells = new Array(colsCount)
            .fill("")
            .map((_, index) => createColumn(index, i, state))
            .join("");

        rows.push(createRow(cells, i + 1, getHeightFromState(state, i + 1)));
    }

    return rows.join("");
}
