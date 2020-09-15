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

            this.openRequest.addEventListener("error", () => {
                resolve({ state: "error" });
            });
        });
    }

    async setItem<T>(key: string, value: T) {
        const storage = createTransaction(this.DB, "readwrite");
        const request = storage.put(value, key);

        request.onsuccess = () => {
            return request.result;
        };

        request.onerror = () => {
            throw new Error(`adding ${value} to the storage cause error`);
        };
    }

    async getItem<T>(key: string): Promise<State> {
        return new Promise((res, rej) => {
            const storage = createTransaction(this.DB, "readonly");
            const request = storage.get(key);

            request.onsuccess = () => {
                res(request.result);
            };

            request.onerror = () => {
                rej(new Error(`getting ${key} from the storage cause error`));
            };
        });
    }

    async removeItem(key: string): Promise<State> {
        return new Promise((res, rej) => {
            const storage = createTransaction(this.DB, "readwrite");
            const request = storage.delete(key);

            request.onsuccess = () => {
                res(request.result);
            };

            request.onerror = () => {
                rej(new Error(`getting ${key} from the storage cause error`));
            };
        });
    }

    async getAllKeys(): Promise<any> {
        return new Promise((res, rej) => {
            const storage = createTransaction(this.DB, "readonly");

            const request = storage.getAllKeys();

            request.onsuccess = () => {
                res(request.result);
            };

            request.onerror = () => {
                rej(new Error(`getting all keys from the storage cause error`));
            };
        });
    }
}

function createTransaction(db: IDBDatabase, mode: "readwrite" | "readonly") {
    const transaction = db.transaction("storage", mode);
    const storage: IDBObjectStore = transaction.objectStore("storage");

    return storage;
}
