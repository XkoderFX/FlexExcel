import "./scss/main.scss";
import Excel from "./components/excel/Excel";
import { Header } from "./components/header/Header";
import { Toolbar } from "./components/toolbar/Toolbar";
import { Formula } from "./components/formula/formula";
import { Table } from "./components/table/Table";
import { Store } from "core/store";
import { rootReducer } from "./reducer/rootReducer";
import ActiveDB from "core/ActiveDB";
import { State } from "core/stateTypes";
import { debounce } from "core/utils";

export const DB = new ActiveDB("database", 1);

async function main() {
    await DB.init();
    const initState = await DB.getItem("excel state");

    const store = new Store(rootReducer, initState);

    const stateListener = debounce(async (state: State) => {
        await DB.setItem("excel state", state);
    }, 300);

    store.subscribe(stateListener);

    const excel = new Excel("#app", {
        components: [Header, Toolbar, Formula, Table],
        store,
    });

    excel.render();
}

main();
