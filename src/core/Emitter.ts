export class Emitter {
    private subscribers: Map<string, any[]> = new Map();

    subscribe(event: string, fn: (...args: any) => void): () => void {
        this.subscribers.set(event, this.subscribers.get(event) ?? []);
        this.subscribers.get(event).push(fn);

        return () => {
            this.subscribers.get(event).filter((listener) => listener != fn);
        };
    }

    emit(eventName: string, ...args: any): boolean {
        if (!Array.isArray(this.subscribers.get(eventName))) {
            return false;
        }

        this.subscribers.get(eventName).forEach((fn) => fn(...args));

        return true;
    }
}
