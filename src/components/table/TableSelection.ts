import { Dom, DM } from "core/domManager";
import { Info } from "./table.info";

export class TableSelection {
    static className = "selected";
    private group: Dom[] = [];
    public current: Dom;

    constructor() {}

    // $el instanceof DOM === true
    select($el: Dom) {
        console.log($el);

        try {
            this.clear();
            if ($el.tagName !== "INPUT") {
                $el = $el.firstChild;
            }
            $el.addClass(TableSelection.className);
            this.group.push($el);
            this.current = $el;
            this.current.dataSet.id = ($el.id() ??
                $el.parentElement.id()) as string;
            $el.focusOn();
        } catch (error) {
            console.error("no cell there");
        }
    }

    clear() {
        this.group.forEach((el) => el.removeClass(TableSelection.className));
        this.group = [];
    }

    selectGroup(ids: string[]) {
        this.clear();
        ids.forEach((id) => {
            const $elem = DM(
                document.querySelector(`[data-id="${id}"]`)
                    .firstElementChild as HTMLElement
            ); // we need the inner input therefore, FirstChild
            this.group.push($elem);
            $elem.addClass("selected");
        });
    }
}
