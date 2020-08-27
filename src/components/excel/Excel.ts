import ExcelComponent from "core/ExcelComponent";
import { DM, Dom } from "core/domManager";
import { Emitter } from "core/Emitter";

type Options = {
    components: any;
};

export default class Excel {
    private $el: Dom;
    private components: ExcelComponent[];
    private emitter: Emitter = new Emitter();

    constructor(selector: string, options: Options) {
        this.$el = DM(selector);
        this.components = options.components || [];
    }

    getRoot(): Dom {
        const $root = DM.create("div", "excel");

        const componentOptions = {
            emitter: this.emitter,
        };

        this.components = this.components.map((Component: any) => {
            const $elem = DM.create("div", Component.className);

            const component: ExcelComponent = new Component(
                $elem,
                componentOptions
            );

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
