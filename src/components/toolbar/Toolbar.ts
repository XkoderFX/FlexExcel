import { Dom, DM } from "core/domManager";
import { createToolbar } from "./toolbar.template";
import ExcelStateComponent from "core/ExcelStateComponent";
import { defaultStyles } from "@/constants";
import * as HtmlWebpackPlugin from "html-webpack-plugin";

export class Toolbar extends ExcelStateComponent {
    static className: string = "excel__toolbar";

    constructor($root: Dom, options: any) {
        super($root, {
            name: "Toolbar",
            listeners: ["click"],
            subscribe: ["currentStyles"],
            ...options,
        });
        this.prepare();
    }

    prepare() {
        const initialState = defaultStyles;

        this.initState(initialState);
    }

    get template() {
        return createToolbar(this.state);
    }

    storeChanged(changes: any) {
        this.setState(changes.currentStyles);
    }

    toHTML(): string {
        return this.template;
    }

    onClick(event: Event) {
        const $target = DM(event.target as HTMLElement);

        if ($target.dataSet.type === "button") {
            const value = JSON.parse($target.dataSet.value);

            this.$emit("toolbar:applyStyle", value);

            this.setState(value);
        }
    }
}
