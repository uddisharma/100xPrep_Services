import express from 'express';
import cors from 'cors';
import responseHandler from './responses/responseHandler';
import path from 'path';
import dotenv from 'dotenv';
import sendMail from './services/email';
dotenv.config();
const app = express();
const port = 5000;

app.use(cors());
app.use(express.json());
app.use(responseHandler);
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.get('/', (req, res: any) => {
    res.render('index', { name: 'Uddibhardwaj' });
});

app.post('/send', async (req: Request, res: any) => {
    try {
        let mailObj = {
            subject: 'Interview Scheduled @wits technologies',
            to: "uddibhardwaj2001@gmail.com",
            template: '/views/email/InterviewRequest',
            data: { username: "Uddibhardwaj", otp: "123456" }
        };
        await sendMail(mailObj);
        res.status(200).send({ message: 'Email sent successfully' });
    } catch (error: any) {
        console.error('Error sending email:', error);
        res.status(500).send({ message: 'Failed to send email', error: error.message });
    }
});

app.listen(port, () => {
    console.log(`app listening on port ${port}`)
})