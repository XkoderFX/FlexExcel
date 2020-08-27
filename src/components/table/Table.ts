import ExcelComponent from "core/ExcelComponent";
import { createTable } from "./table.template";
import { Dom, DM } from "core/domManager";
import { resizeHandler } from "./table.resize";
import { Info } from "./table.info";
import { TableSelection } from "./TableSelection";
import { cellsMatrix, nextSelector, CordObject } from "./table.functions";

export class Table extends ExcelComponent {
    static className: string = "table";
    private selection: TableSelection;

    constructor($root: Dom, options: any) {
        super($root, {
            name: "table",
            listeners: ["mousedown", "keydown", "input"],
            ...options,
        });

        $root.off("focus", () => false);
    }

    toHTML(): string {
        return /*html*/ `<table> ${createTable(Info.rowsCount)} </table> `;
    }

    init() {
        super.init();

        this.selection = new TableSelection();
        const elem = this.$root.find("[data-id='0:0']");
        const input = elem.findIn("input");

        this.selection.select(input);

        this.$on("formulaChanged", (data) => {
            this.selection.current.text = data;
        });
    }

    onMousedown(event: MouseEvent) {
        const elem: HTMLElement = event.target as HTMLElement;

        if (elem.hasAttribute("data-resize")) {
            resizeHandler(elem);
        } else if (
            elem.dataset.type == "cell" ||
            elem.parentElement.dataset.type == "cell"
        ) {
            const input = elem.querySelector("input") ?? elem; // find the input
            const cell = elem.closest("[data-type='cell']") ?? elem;

            if (event.shiftKey) {
                const target = DM(<HTMLElement>cell).id(true) as {
                    row: number;
                    col: number;
                };
                const current = this.selection.current.id(true) as {
                    row: number;
                    col: number;
                };

                const ids = cellsMatrix(target, current);
                this.selection.selectGroup(ids);
            } else {
                this.selection.select(DM(input));
            }
        }

        this.emitter.emit("cellChanged", this.selection.current.text);
    }

    onKeydown(event: KeyboardEvent) {
        const keys = [
            "Enter",
            "Tab",
            "ArrowLeft",
            "ArrowRight",
            "ArrowDown",
            "ArrowUp",
        ];

        const { key } = event;

        if (keys.includes(key) && !event.shiftKey) {
            event.preventDefault();

            const id = this.selection.current.id(true) as CordObject;

            const $next = this.$root.find(nextSelector(key, id));

            this.selection.select($next);
        }
    }

    onInput() {
        this.emitter.emit("cellChanged", this.selection.current.text);
    }
}
