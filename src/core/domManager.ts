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
