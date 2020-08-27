import ExcelComponent from "core/ExcelComponent";
import { Dom } from "core/domManager";

export class Header extends ExcelComponent {
    static className: string = "header";

    constructor($root: Dom , options: any) {
        super($root, {
            name: "Header",
            ...options
        });
    }

    toHTML(): string {
        return /*html*/ `
        <input
        type="text"
        value="New Table"
        class="header__title-input"
        />

        <div class="buttons">
            <div class="buttons__btn buttons__btn--trash">
                <i class="material-icons">delete</i>
            </div>

            <div class="buttons__btn buttons__btn--back">
                <i class="material-icons">exit_to_app</i>
            </div>
        </div>
       `;
    }
}
