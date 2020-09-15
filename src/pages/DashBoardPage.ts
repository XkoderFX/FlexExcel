import { DB } from "@/index";
import { DM, Dom } from "core/domManager";
import Page from "core/Page";
import { State } from "core/stateTypes";
import { createRecordsTable } from "./dashboard.functions";

export default class DashBoardPage extends Page {
    records: State[];
    getRoot(): Dom {
        const uniqueId = Date.now().toString();

        return <Dom>DM.create("div", "dashboard").html(/*html*/ ` 
        
        <header class="dashboard__header">
            <h2 class="dashboard__title">Flexcel</h2>
        </header>

        <div class="dashboard__new">
            <div class="dashboard__create-new">
                <a href="#excel/${uniqueId}">New Table</a>
            </div>
        </div>

        <div class="dashboard__list">
            ${createRecordsTable(this.records)}
        </div>
        
        
        `);
    }

    async init() {
        let keys: string[] = await DB.getAllKeys();

        keys = keys.filter((key) => {
            return key.includes("excel") === true;
        });

        this.records = await Promise.all(
            keys.map(async (key) => {
                const state = await DB.getItem(key);
                state.id = key;
                return state;
            })
        );
    }

    //TODO: implement the following functions
    afterRender(): void {
        //! throw new Error("Method not implemented.");
    }
    destroy(): void {
        //! throw new Error("Method not implemented.");
    }
}
