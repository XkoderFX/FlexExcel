import ExcelComponent from "core/ExcelComponent";
import { Dom } from "core/domManager";

export class Formula extends ExcelComponent {
    static className: string = "formula";

    constructor($root: Dom) {
        super($root, {
            name: "Formula",
            listeners: ["input"],
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
        console.log(this.$root);
    }
}
