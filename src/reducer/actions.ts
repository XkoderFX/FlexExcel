import types from "./types";

export function tableResize(data: any) {
    return {
        type: types.TABLE_RESIZE,
        data,
    };
}

export function changeText(data: { text: string; id: string }) {
    return {
        type: types.CHANGE_TEXT,
        data,
    };
}

export function updateDate() {
    return {
        type: types.SET_DATE,
    };
}

export function changeStyles(data: any): { type: types; data: any } {
    return {
        type: types.CHANGE_STYLE,
        data,
    };
}

export function applyStyle(data: any): { type: types; data: any } {
    return {
        type: types.APPLY_STYLE,
        data,
    };
}

export function changeTitle(data: any): { type: types; data: any } {
    return {
        type: types.CHANGE_TITLE,
        data,
    };
}
