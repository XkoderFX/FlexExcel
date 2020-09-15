import { mainStore } from "@/index";
import DashBoardPage from "@/pages/DashBoardPage";
import ExcelPage from "@/pages/ExcelPage";
import { Dom, DM } from "core/domManager";
import Page from "core/Page";
import ActiveRoute from "./ActiveRoute";
import { Routes } from "./routes.types";

export default class Router {
    private routes: Routes;
    private $placeholder: Dom;
    private page: Page;

    constructor(selector: string, routes: Routes) {
        this.routes = routes;
        this.$placeholder = DM(selector);
        this.changePageHandler = this.changePageHandler.bind(this);
        this.init();
        this.page = null;
    }

    init() {
        window.addEventListener("hashchange", this.changePageHandler);
        this.changePageHandler();
    }

    async changePageHandler() {
        if (this.page) {
            this.page.destroy();
        }

        this.$placeholder.clear();
        this.page = ActiveRoute.path.includes("excel")
            ? new this.routes.excel(ActiveRoute.param)
            : new this.routes.dashboard(ActiveRoute.param);

        const pageForAwait = this.page; //* fix losing this.page in await()

        await pageForAwait.init();

        this.$placeholder.append(pageForAwait.getRoot());
        pageForAwait.afterRender();
    }

    destroy() {
        window.removeEventListener("hashchange", this.changePageHandler);
    }
}
