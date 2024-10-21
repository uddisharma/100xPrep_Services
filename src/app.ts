import express from 'express';
import cors from 'cors';
import path from 'path';
import RedisClient from './RedisManager';
import { EmailService } from './Engine';
export const queueName = 'EmailQueue';

const app = express();
const port = 5000;

app.use(cors());
app.use(express.json());
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

async function main() {
    const engine = new EmailService();
    const redisClient = RedisClient.getInstance().getClient();

    console.log("connected to redis");

    while (true) {
        const response = await redisClient.rPop('EmailQueue');
        if (!response) {
            // No message in queue
        } else {
            await engine.process({ message: JSON.parse(response) });
        }
    }
}

main();

app.listen(port, () => {
    console.log(`app listening on port ${port}`);
});