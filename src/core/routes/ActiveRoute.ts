export default class ActiveRoute {
    static get path() {
        return window.location.hash.slice(1);
    }

    static get param() {
        return ActiveRoute.path.split("/").slice(1);
    }

    static navigate(path: string) {
        window.location.hash = path;
    }
}
