export function capitalize(str: string) {
    return str.charAt(0).toUpperCase() + str.slice(1);
}

let oldX: number = 0;
let oldY: number = 0;

export function getMouseDirection(PageX: number, PageY: number) {
    enum mouseDriections {
        left = 0,
        right = 1,
    }

    if (PageX > oldX) {
        return mouseDriections.right;
    } else {
        return mouseDriections.left;
    }

    oldX = PageX;
    oldY = PageY;
}
