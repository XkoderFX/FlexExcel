import { Reducer } from "core/store";
import types from "./types";

export type Action = {
    type: string;
    [prop: string]: any;
};

export function rootReducer(state: any, action: Action): Reducer {
    let prevState = state || {};

    switch (action.type) {
        case types.TABLE_RESIZE:
            if (action.data.type == "row") {
                prevState.rowState[action.data.id] = action.data.updatedSize;
                return { ...state, rowState: prevState.rowState };
            } else {
                prevState.colState[action.data.id] = action.data.updatedSize;
                return { ...state, colState: prevState.colState };
            }
        case types.CHANGE_TEXT:
            prevState = prevState["dataState"] || {};

            if (action.data.id) {
                prevState[action.data.id] = action.data.text;
            }
            return {
                ...state,
                currentText: action.data.text,
                dataState: prevState,
            };

        case types.CHANGE_STYLE:
            return { ...state, currentStyles: action.data };
        case types.APPLY_STYLE:
            const val = state["stylesState"] || {};

            action.data.ids.forEach((id: string) => {
                val[id] = { ...val[id], ...action.data.value };
            });

            return {
                ...state,
                stylesState: val,
                currentStyles: { ...state.currentStyles, ...action.data.value },
            };
        case types.CHANGE_TITLE:
            return { ...state, title: action.data };
        case types.SET_DATE:
            if (!state.creationDate) {
                const parsed = new Date()
                    .toLocaleDateString()
                    .replace(/\//g, ".");
                return { ...state, creationDate: parsed };
            }
            return { ...state };

        default:
            return state;
    }
}
