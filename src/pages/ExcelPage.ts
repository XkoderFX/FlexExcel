import { Dom } from "core/domManager";
import Page from "core/Page";

import { Store } from "core/store";
import { State } from "core/stateTypes";
import { debounce } from "core/utils";
import { rootReducer } from "@/reducer/rootReducer";
import { Header } from "@/components/header/Header";
import Excel from "@/components/excel/Excel";
import { Formula } from "@/components/formula/formula";
import { Table } from "@/components/table/Table";
import { Toolbar } from "@/components/toolbar/Toolbar";
import { DB } from "@/index";
import ActiveRoute from "core/routes/ActiveRoute";

function storageName(param: string): string {
    return `excel:${param}`;
}

export default class ExcelPage extends Page {
    private excel: Excel;

    async init() {
        const params = this.params.join("");

        const initState = await DB.getItem(storageName(params));

        const store = new Store(rootReducer, initState);

        const stateListener = debounce(async (state: State) => {
            await DB.setItem(storageName(params), state);
        }, 50);

        store.subscribe(stateListener);

        this.excel = new Excel({
            components: [Header, Toolbar, Formula, Table],
            store,
        });
    }

    getRoot(): Dom {
        return this.excel.getRoot();
    }
    afterRender(): void {
        this.excel.init();
    }
    destroy(): void {
        this.excel.destroy();
    }
}
