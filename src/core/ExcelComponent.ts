import DomListener from "core/DomListener";
import { Dom } from "./domManager";

type Options = {
    name: string;
    listeners?: string[];
};

export default abstract class ExcelComponent extends DomListener {
    constructor($root: Dom, options: Options = { name: "", listeners: [] }) {
        super($root, options.listeners);
        this.name = options.name; 
    }

    abstract toHTML(): string;

    init() {
        this.initDOMListeners();
    }
}
