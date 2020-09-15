import ExcelComponent from "core/ExcelComponent";
import { Dom, DM } from "core/domManager";
import { changeTitle } from "@/reducer/actions";
import ActiveRoute from "core/routes/ActiveRoute";
import { DB } from "@/index";

export class Header extends ExcelComponent {
    storeChanged() {
        throw new Error("Method not implemented.");
    }
    static className: string = "header";

    constructor($root: Dom, options: any) {
        super($root, {
            name: "Header",
            listeners: ["input", "click"],
            ...options,
        });
    }

    toHTML(): string {
        const { title } = this.store.getState();

        const dataButton = (type: string) => `data-button = ${type}`;

        return /*html*/ `
        <input
        type="text"
        value='${title || "New Table"}'
        class="header__title-input"
        />

        <div class="buttons">
            <div ${dataButton(
                "remove"
            )} class="buttons__btn buttons__btn--trash">
                <i ${dataButton("remove")} class="material-icons">delete</i>
            </div>

            <div ${dataButton("exit")}  class="buttons__btn buttons__btn--back">
                <i ${dataButton("exit")}  class="material-icons">exit_to_app</i>
            </div>
        </div>
       `;
    }

    async onClick(event: MouseEvent) {
        const $target = DM(event.target as HTMLElement);

        if ($target.dataSet.button === "remove") {
            const decision = confirm("Are you sure you want to remove?");
            if (decision) {
                DB.removeItem(`excel:${ActiveRoute.param}`);
                ActiveRoute.navigate("dashboard");
            }
        } else if ($target.dataSet.button === "exit") {
            ActiveRoute.navigate("dashboard");
        }
    }

    onInput(event: Event) {
        const $target = DM(event.target as HTMLElement);
        this.$dispatch(changeTitle($target.text));
    }
}
