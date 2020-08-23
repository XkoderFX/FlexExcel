enum CODES {
    A = 65,
    Z = 90,
}

function createRow(content: string, index?: number): string {
    return /*html*/ `
    <tr class="table__row">
        <td class="table__column table__column-num">${index ?? ""}</td>
        ${content}
    </tr>
    `;
}

function createLetterColumn(letter: string) {
    return /*html*/ `
        <th class="table__column table__column--head">${letter}</th>
    `;
}

function createColumn() {
    return /*html*/ `
    <td class="table__column">
        <input type="text" />
    </td>
    `;
}

const ToChar = (_: any, index: number) => String.fromCharCode(CODES.A + index);

export function createTable(rowsCount = 10) {
    const colsCount = CODES.Z - CODES.A + 1;
    const rows: string[] = [];

    const cols = new Array(colsCount)
        .fill("")
        .map(ToChar)
        .map(createLetterColumn)
        .join("");

    rows.push(createRow(cols));

    for (let i = 0; i < rowsCount; i++) {
        const cells = new Array(colsCount).fill("").map(createColumn).join("");

        rows.push(createRow(cells, i + 1));
    }

    return rows.join("");
}
