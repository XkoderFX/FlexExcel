//types
import { Action } from "reducer/rootReducer";
import { State } from "./stateTypes";
import { defaultTitle } from "@/constants";

export type Reducer = (state: State, action: Action) => any;
export type Func = (...args: any) => void;
export { Store };
//

class Store {
    private rootReducer: Reducer;
    private state: State;
    private listeners: Func[] = [];

    constructor(
        rootReducer: Reducer,
        initialState: State = {
            colState: {},
            rowState: {},
            dataState: {},
            currentText: "",
            stylesState: {},
            title: defaultTitle,
        }
    ) {
        this.rootReducer = rootReducer;
        this.state = rootReducer({ ...initialState }, { type: "__INIT__" });
    }

    subscribe(fn: Func) {
        this.listeners.push(fn);
        return {
            unsubscribe: () => {
                this.listeners = this.listeners.filter(
                    (listener) => listener != fn
                );
            },
        };
    }

    dispatch(action: Action) {
        this.state = this.rootReducer(this.state, action);
        this.listeners.forEach((listener) => listener(this.state));
    }

    getState() {
        return JSON.parse(JSON.stringify(this.state));
    }
}
