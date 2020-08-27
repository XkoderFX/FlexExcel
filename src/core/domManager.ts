export class Dom {
    private $el: HTMLElement;
    constructor(selector: string | HTMLElement) {
        this.$el =
            typeof selector === "string"
                ? document.querySelector(selector)
                : selector;
    }

    addClass(className: string) {
        this.$el.classList.add(className);
    }

    removeClass(className: string) {
        this.$el.classList.remove(className);
    }

    html(html?: string) {
        if (typeof html === "string") {
            this.$el.innerHTML = html;
            return this;
        }
        return this.$el.outerHTML.trim();
    }

    on(eventType: string, fn: (event?: Event) => void) {
        this.$el.addEventListener(eventType, fn);
    }

    off(eventType: string, fn: (event?: Event) => void) {
        this.$el.removeEventListener(eventType, fn);
    }

    append(elem: HTMLElement | Dom) {
        if (elem instanceof Dom) {
            elem = elem.$el;
        }

        this.$el.append(elem);
        return this;
    }

    clear() {
        this.html("");
        return this;
    }

    closest(selector: string) {
        return DM(this.$el.closest(selector) as HTMLElement);
    }

    setMinWidth(num: number, unit: string) {
        this.$el.style.minWidth = num + unit;
    }

    setMinheight(num: number, unit: string) {
        this.$el.style.height = num + unit;
    }

    get text() {
        if (this.$el.tagName == "INPUT") {
            return (<HTMLInputElement>this.$el).value;
        }
        return this.$el.textContent;
    }

    set text(text: string) {
        if (this.$el.tagName == "INPUT") {
            (<HTMLInputElement>this.$el).value = text;
        }
        this.$el.textContent = text;
    }

    get width() {
        return this.$el.offsetWidth;
    }

    get height() {
        return this.$el.offsetHeight;
    }

    get dataSet() {
        return this.$el.dataset;
    }

    id(parse?: boolean): string | { row: number; col: number } {
        if (parse) {
            const parsed = this.dataSet.id.split(":");

            return {
                col: Number(parsed[0]),
                row: Number(parsed[1]),
            };
        }
        return this.dataSet.id;
    }

    get parentElement() {
        return DM(this.$el.parentElement);
    }

    get boundingRect() {
        return this.$el.getBoundingClientRect();
    }

    find(selector: string) {
        const $elem = document.querySelector(selector) as HTMLElement;

        return DM($elem);
    }

    findIn(selector: string) {
        const $elem = this.$el.querySelector(selector) as HTMLElement;

        return DM($elem);
    }

    css(styles: { [prop: string]: string } = {}) {
        Object.keys(styles).forEach((key: any) => {
            this.$el.style[key] = styles[key];
        });
    }

    focusOn() {
        this.$el.focus();
    }

    get tagName() {
        return this.$el.tagName;
    }

    get firstChild() {
        return DM(this.$el.firstElementChild as HTMLElement);
    }
}

export function DM(selector: string | HTMLElement) {
    return new Dom(selector);
}

DM.create = (tagName: string, classes?: string) => {
    const el: HTMLElement = document.createElement(tagName);

    if (classes) {
        el.classList.add(classes);
    }

    return DM(el);
};
