import { Dom } from "./domManager";

export default abstract class Page {
    public params: string[];

    constructor(params: string[]) {
        this.params = params;
    }

    abstract getRoot(): Dom;
    abstract afterRender(): void;
    abstract destroy(): void;
    abstract init(): Promise<void>;
}
