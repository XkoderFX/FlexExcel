import { State } from "./stateTypes";

export default class ActiveDB {
    private readonly openRequest: IDBOpenDBRequest;
    private DB: IDBDatabase;

    constructor(name: string, version: number) {
        this.openRequest = indexedDB.open(name, version);
    }

    async init() {
        return new Promise((resolve) => {
            this.openRequest.addEventListener("upgradeneeded", () => {
                this.openRequest.result.createObjectStore("storage");
                this.DB = this.openRequest.result;
                resolve({ state: "upgrade complete" });
            });

            this.openRequest.addEventListener("success", () => {
                this.DB = this.openRequest.result;
                resolve({ state: "success" });
            });
        });
    }

    async setItem<T>(key: string, value: T) {
        const transaction = this.DB.transaction("storage", "readwrite");
        const storage = transaction.objectStore("storage");
        const request = storage.put(value, key);

        request.onsuccess = () => {
            return request.result;
        };

        request.onerror = () => {
            throw new Error(`adding ${value} to the storage cause error`);
        };
    }

    async getItem(key: string): Promise<State> {
        return new Promise((res, rej) => {
            const transaction = this.DB.transaction("storage", "readwrite");
            const storage = transaction.objectStore("storage");
            const request = storage.get(key);

            request.onsuccess = () => {
                res(request.result);
            };

            request.onerror = () => {
                rej(new Error(`getting ${key} from the storage cause error`));
            };
        });
    }
}
