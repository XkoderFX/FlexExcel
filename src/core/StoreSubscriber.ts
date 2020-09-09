import { Store } from "./store";
import ExcelComponent from "./ExcelComponent";
import { State } from "./stateTypes";
import { isEqual } from "./utils";

export class StoreSubscriber {
    store: Store;
    sub: {
        unsubscribe: () => void;
    };
    prevState: State;
    constructor(store: Store) {
        this.store = store;
        this.sub = null;
    }

    subscribeComponents(components: ExcelComponent[]) {
        this.prevState = this.store.getState();

        this.sub = this.store.subscribe((state: any) => {
            Object.keys(state).forEach((key) => {
                if (!isEqual(this.prevState[key], state[key])) {
                    components.forEach((component) => {
                        if (component.isWatching(key)) {
                            const changes = { [key]: state[key] };

                            component.storeChanged(changes);
                        }
                    });
                }
            });

            this.prevState = this.store.getState();
        });
    }

    unsubscribeFromStore() {
        this.sub.unsubscribe();
    }
}
