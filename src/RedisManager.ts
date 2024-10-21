import { createClient, RedisClientType } from 'redis';

class RedisClient {
    private static instance: RedisClient;
    private client: RedisClientType;

    private constructor() {
        this.client = createClient();
        this.client.connect().catch(console.error);
        this.client.on("error", (err) => console.error("Redis Client Error", err));
    }

    public static getInstance(): RedisClient {
        if (!RedisClient.instance) {
            RedisClient.instance = new RedisClient();
        }
        return RedisClient.instance;
    }

    public getClient(): RedisClientType {
        return this.client;
    }
}

export default RedisClient;