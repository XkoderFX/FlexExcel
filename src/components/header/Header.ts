import ExcelComponent from "core/ExcelComponent";
import { Dom, DM } from "core/domManager";
import { changeTitle } from "@/reducer/actions";

export class Header extends ExcelComponent {
    storeChanged() {
        throw new Error("Method not implemented.");
    }
    static className: string = "header";

    constructor($root: Dom, options: any) {
        super($root, {
            name: "Header",
            listeners: ["input"],
            ...options,
        });
    }

    toHTML(): string {
        const { title } = this.store.getState();

        return /*html*/ `
        <input
        type="text"
        value='${title || "New Table"}'
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

    onInput(event: Event) {
        const $target = DM(event.target as HTMLElement);
        this.$dispatch(changeTitle($target.text));
    }
}
