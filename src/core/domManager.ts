export class Dom {
    private $el: HTMLElement;
    constructor(selector: string | HTMLElement) {
        this.$el =
            typeof selector === "string"
                ? document.querySelector(selector)
                : selector;
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

    get textContent() {
        return this.$el.textContent;
    }

    get width() {
        return this.$el.offsetWidth;
    }

    get height() {
        return this.$el.offsetHeight;
    }

    get boundingRect() {
        return this.$el.getBoundingClientRect();
    }

    css(styles: { [prop: string]: string } = {}) {
        Object.keys(styles).forEach((key: any) => {
            this.$el.style[key] = styles[key];
        });
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
