import ExcelComponent from "core/ExcelComponent";
import { Dom } from "core/domManager";

export class Formula extends ExcelComponent {
    static className: string = "formula";

    constructor($root: Dom, options: any) {
        super($root, {
            name: "Formula",
            listeners: ["input"],
            ...options,
        });
    }

    init() {
        super.init();

        this.$on("cellChanged", (text) => {
            this.$root.findIn("input").text = text;
        });
    }

    toHTML(): string {
        return /*html*/ `
        <div class="formula__icon">
            Fx
        </div>
        <input type="text" class="formula__input" />
       `;
    }

    onInput(event: Event) {
        const text = (<HTMLInputElement>event.target).value;
        this.emitter.emit("formulaChanged", text);
    }
}
