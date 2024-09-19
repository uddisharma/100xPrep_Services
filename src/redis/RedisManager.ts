
import { RedisClientType, createClient } from "redis";
// import { MessageFromServices } from "../types/from";
// import { MessageToServices } from "../types/to";
// import { RedisManagerInstance } from "./Instances";

export class RedisManager {
    private client: RedisClientType;
    private publisher: RedisClientType;
    private static instance: RedisManager;

    private constructor() {
        this.client = createClient();
        this.client.connect();
        this.publisher = createClient();
        this.publisher.connect();
    }

    public static getInstance() {
        if (!this.instance) {
            this.instance = new RedisManager();
        }
        return this.instance;
    }

    // public sendAndAwait(instance: RedisManagerInstance, message: MessageToServices) {
    //     return new Promise<MessageFromServices>((resolve) => {

    //         const id = `${this.getRandomClientId()}-${instance}`;

    //         this.client.subscribe(id, (message) => {
    //             this.client.unsubscribe(id);
    //             resolve(JSON.parse(message));
    //         });

    //         this.publisher.lPush(`${instance}.messages`, JSON.stringify({ clientId: id, message }));
    //     });
    // }

    public getRandomClientId() {
        return Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
    }

}