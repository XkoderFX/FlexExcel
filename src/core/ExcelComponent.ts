import DomListener from "core/DomListener";
import { Dom } from "./domManager";
import { Emitter } from "./Emitter";
import { Store, Func } from "./store";
import { Action } from "@/reducer/rootReducer";

export type Options = {
    name: string;
    listeners: string[];
    emitter: Emitter;
    store: Store;
    subscribe?: string[];
};

export default abstract class ExcelComponent extends DomListener {
    protected emitter: Emitter;
    protected unsubs: (() => void)[] = [];
    protected store: Store;
    private storeSub: { unsubscribe: Func };
    public readonly subscribe: string[];

    constructor($root: Dom, options?: Options) {
        super($root, options.listeners);
        this.name = options.name;
        this.emitter = options.emitter;
        this.store = options.store;
        this.subscribe = options.subscribe || [];
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

    $dispatch(action: Action) {
        this.store.dispatch(action);
    }

    isWatching(key: string) {
        return this.subscribe.includes(key);
    }

    abstract storeChanged(changes: any): any;

    destroy() {
        this.removeDOMListeners();
        this.unsubs.forEach((unsub) => unsub());
    }
}
