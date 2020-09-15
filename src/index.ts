import "./scss/main.scss";
import Router from "core/routes/Router";
import DashBoardPage from "./pages/DashBoardPage";
import ExcelPage from "./pages/ExcelPage";
import ActiveDB from "core/ActiveDB";
import { Store } from "core/store";

export const DB = new ActiveDB("xed", 4);
export let mainStore: Store;
export let records: string[];

const main = async () => {
    await DB.init();
    new Router("#app", {
        dashboard: DashBoardPage,
        excel: ExcelPage,
    });
};

main();
