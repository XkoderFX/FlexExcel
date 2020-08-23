import { Dom } from "./domManager";
import { capitalize } from "./utils";

export default class DomListener {
    protected $root: Dom;
    private listeners: string[];
    [prop: string]: any;

    constructor($root: Dom, listeners: string[] = []) {
        if (!$root) {
            throw new Error("no $root provided");
        }
        this.$root = $root;
        this.listeners = listeners;
    }

    initDOMListeners() {
        this.listeners.forEach((listener) => {
            const method: string = getMethodName(listener);

            if (method in this) {
                this[method] = this[method].bind(this);
                this.$root.on(listener, this[method]);
            } else {
                throw new ReferenceError(
                    `method ${method} is not defined in ${this.name}`
                );
            }
        });
    }

    removeDOMListeners() {
        this.listeners.forEach((listener) => {
            const method: string = getMethodName(listener);
            this.$root.off(listener, this[method]);
        });
    }
}

function getMethodName(eventName: string): string {
    return `on${capitalize(eventName)}`;
}
