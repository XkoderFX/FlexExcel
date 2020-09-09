import ExcelComponent, { Options } from "./ExcelComponent";
import { Dom } from "./domManager";
import { State } from "./stateTypes";

export default class ExcelStateComponent extends ExcelComponent {
    protected state: State;

    constructor($root: Dom, options: Options) {
        super($root, options);
    }

    get template() {
        return JSON.stringify(this.state, null, 2);
    }

    initState(initialState: State | {}) {
        this.state = { ...initialState } as State;
    }

    setState(newState: State) {
        this.state = { ...this.state, ...newState };
        this.$root.html(this.template);
    }

    toHTML(): string {
        throw new Error("Method not implemented.");
    }
    storeChanged(changes: any) {
        throw new Error("Method not implemented.");
    }
}
