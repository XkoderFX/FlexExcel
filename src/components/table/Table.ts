import ExcelComponent from "core/ExcelComponent";
import { createTable } from "./table.template";

export class Table extends ExcelComponent {
    static className: string = "table";

    toHTML(): string {
        return /*html*/ `<table> ${createTable(40)} </table> `;
    }
}
