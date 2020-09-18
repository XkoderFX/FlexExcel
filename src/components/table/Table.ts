import ExcelComponent from "core/ExcelComponent";
import { createTable } from "./table.template";
import { Dom, DM } from "core/domManager";
import { resizeHandler } from "./table.resize";
import { Info } from "./table.info";
import { TableSelection } from "./TableSelection";
import { cellsMatrix, nextSelector, CordObject } from "./table.functions";
import {
    tableResize,
    changeText,
    changeStyles,
    applyStyle,
} from "@/reducer/actions";
import { Value } from "../toolbar/toolbar.types";
import { defaultStyles } from "@/constants";
import { parse } from "core/parse";

export class Table extends ExcelComponent {
    storeChanged() {
        throw new Error("Method not implemented.");
    }
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
        return /*html*/ `<table> ${createTable(
            Info.rowsCount,
            this.store.getState()
        )} </table> `;
    }

    init() {
        super.init();

        this.selection = new TableSelection();
        const elem = this.$root.find("[data-id='0:0']");
        const input = elem.findIn("input");

        this.selection.select(input);

        this.$on("formulaChanged", (data) => {
            const current = this.selection.current;

            current.attr("data-value", data);

            if (data.startsWith("=")) {
                current.parentElement.dataSet.value = data;
                current.dataSet.value = data;

                const parsed = parse(data);

                current.text = parsed;
                current.attr("value", parsed);
            } else {
                current.text = data;
                current.attr("value", data);
            }

            this.updateTextInStore(data);
        });

        this.$on("toolbar:applyStyle", (style) => {
            this.selection.applyStyle(style);
            const [value] = style;

            this.$dispatch(
                applyStyle({
                    value,
                    ids: this.selection.selectedIds,
                })
            );
        });
    }

    selectCell($cell: Dom) {
        this.selection.select($cell);
        const styles = $cell.getStyles(Object.keys(defaultStyles));
        this.$emit("selectCell", $cell);
        this.$dispatch(changeStyles(styles));
    }

    async resizeTable(elem: HTMLElement) {
        try {
            const data = await resizeHandler(elem);
            this.$dispatch(tableResize(data));

            this.selection.current.focusOn();
        } catch (error) {
            console.warn(`resize error ${error}`);
        }
    }

    onMousedown(event: MouseEvent) {
        const elem: HTMLElement = event.target as HTMLElement;

        if (elem.hasAttribute("data-resize")) {
            this.resizeTable(elem);
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
                this.selectCell(DM(input));
            }


            this.$dispatch(
                changeText({
                    text: DM(elem).dataSet.value || DM(elem).text,
                    id: DM(elem).id() as string,
                })
            );
        }
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

    updateTextInStore(text: string) {
        this.$dispatch(
            changeText({
                text,
                id: this.selection.current.id() as string,
            })
        );
    }

    onInput(event: Event) {
        const elem = DM(event.target as HTMLElement);

        elem.dataSet.value = elem.text;

        this.updateTextInStore(elem.text);
    }
}
