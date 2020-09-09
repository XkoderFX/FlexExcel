import ExcelComponent from "core/ExcelComponent";
import { Dom } from "core/domManager";

export class Formula extends ExcelComponent {
    static className: string = "formula";

    constructor($root: Dom, options: any) {
        super($root, {
            name: "Formula",
            listeners: ["input"],
            subscribe: ["currentText"],
            ...options,
        });
    }

    init() {
        super.init();

        const $formula = this.$root.findIn("input");

        this.$on("selectCell", ([$cell]: [Dom]) => {
            $formula.text = $cell.dataSet.value;
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

    storeChanged({ currentText }: { currentText: string }) {
        const $formula = this.$root.findIn("input");

        $formula.text = currentText;
    }
}
