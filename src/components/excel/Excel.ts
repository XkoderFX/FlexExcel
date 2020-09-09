import ExcelComponent from "core/ExcelComponent";
import { DM, Dom } from "core/domManager";
import { Emitter } from "core/Emitter";
import { Store } from "core/store";
import { StoreSubscriber } from "core/StoreSubscriber";

type Options = {
    components: any;
    store: Store;
};

export default class Excel {
    private $el: Dom;
    private components: ExcelComponent[];
    private emitter: Emitter = new Emitter();
    private store: Store;
    private subscriber: StoreSubscriber;

    constructor(selector: string, options: Options) {
        this.$el = DM(selector);
        this.components = options.components || [];
        this.store = options.store;
        this.subscriber = new StoreSubscriber(this.store);
    }

    getRoot(): Dom {
        const $root = DM.create("div", "excel");

        const componentOptions = {
            emitter: this.emitter,
            store: this.store,
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

        this.subscriber.subscribeComponents(this.components);
        this.components.forEach((component) => component.init());
    }

    destroy() {
        this.subscriber.unsubscribeFromStore();
    }
}
