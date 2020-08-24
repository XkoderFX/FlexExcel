import ExcelComponent from "core/ExcelComponent";
import { createTable, CODES } from "./table.template";
import { Dom, DM } from "core/domManager";
import { resizeHandler } from "./table.resize";
import { Info } from "./table.info";

export class Table extends ExcelComponent {
    static className: string = "table";

    constructor($root: Dom) {
        super($root, {
            name: "table",
            listeners: ["mousedown"],
        });
    }

    toHTML(): string {
        return /*html*/ `<table> ${createTable(Info.rowsCount)} </table> `;
    }

    onMousedown(event: Event) {
        const elem: HTMLElement = event.target as HTMLElement;

        resizeHandler(elem);
    }
}
