import DomListener from "core/DomListener";
import { Dom } from "./domManager";
import { Emitter } from "./Emitter";

type Options = {
    name: string;
    listeners?: string[];
    emitter?: Emitter;
};

export default abstract class ExcelComponent extends DomListener {
    protected emitter: Emitter;
    protected unsubs: (() => void)[] = [];

    constructor($root: Dom, options: Options = { name: "", listeners: [] }) {
        super($root, options.listeners);
        this.name = options.name;
        this.emitter = options.emitter;
    }

    abstract toHTML(): string;

    init() {
        this.initDOMListeners();
    }

    $emit(event: string, ...args: any) {
        this.emitter.emit(event, args);
    }

    $on(event: string, fn: (...args: any) => void) {
        const unsub = this.emitter.subscribe(event, fn);
        this.unsubs.push(unsub);
    }

    destroy() {
        this.unsubs.forEach((unsub) => unsub());
    }
}
