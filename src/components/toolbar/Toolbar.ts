import ExcelComponent from "core/ExcelComponent";
import { Dom } from "core/domManager";

export class Toolbar extends ExcelComponent {
    static className: string = "excel__toolbar";

    constructor($root: Dom, options:any) {
        super($root, {
            name: "Toolbar",
            ...options,
        });
    }

    toHTML(): string {
        return /*html*/ `
        <div class="buttons">
            <div class="buttons__btn">
                <i class="material-icons">format_align_left </i>
            </div>

            <div class="buttons__btn">
                <i class="material-icons">format_align_center</i>
            </div>

            <div class="buttons__btn">
                <i class="material-icons">format_align_right </i>
            </div>

            <div class="buttons__btn">
                <i class="material-icons">format_bold</i>
            </div>

            <div class="buttons__btn">
                <i class="material-icons">format_italic</i>
            </div>

            <div class="buttons__btn">
                <i class="material-icons">format_underlined</i>
            </div>
        </div>
       `;
    }
}
