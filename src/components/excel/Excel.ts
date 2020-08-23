import ExcelComponent from "core/ExcelComponent";
import { DM, Dom } from "core/domManager";

type Options = {
    components: any;
};

export default class Excel {
    private $el: Dom;
    private components: ExcelComponent[];

    constructor(selector: string, options: Options) {
        this.$el = DM(selector);
        this.components = options.components || [];
    }

    getRoot(): Dom {
        const $root = DM.create("div", "excel");

        this.components = this.components.map((Component: any) => {
            const $elem = DM.create("div", Component.className);

            const component: ExcelComponent = new Component($elem);

            $elem.html(component.toHTML());

            $root.append($elem);

            return component;
        });

        return $root;
    }

    render() {
        this.$el.append(this.getRoot());
        this.components.forEach((component) => component.init());
    }
}
