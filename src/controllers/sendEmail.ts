import sendMail from "../services/email";
import RedisClient from "../RedisManager";
import { MessageFromApp } from "../types/from";
import { queueName } from "../app";
import { EmailTypes } from "../types";

export const ResetPassword = async (data: MessageFromApp) => {
    if (data.type !== EmailTypes.RESET_PASSWORD) {
        throw new Error("Invalid data type");
    }

    const redisClient = RedisClient.getInstance().getClient();
    const { user, userEmail } = data.data;

    const mailObj = {
        subject: `Reset Password`,
        to: userEmail,
        template: '/views/email/ResetPassword',
        data: { user }
    };

    try {
        await sendMail(mailObj);
        console.log("email sent successfully");
    } catch (error: any) {
        console.error('Error sending email:', error);
        await redisClient.rPush(queueName, JSON.stringify(mailObj));
    }
}

export const InterviewRequest = async (data: MessageFromApp) => {
    if (data.type !== EmailTypes.INTERVIEW_REQUEST) {
        throw new Error("Invalid data type");
    }

    const redisClient = RedisClient.getInstance().getClient();
    const { date, time, intervieweeName, interviewerEmail, interviewerName, link } = data.data;

    const mailObj = {
        subject: `Interview Request from ${intervieweeName}`,
        to: interviewerEmail,
        template: '/views/email/InterviewRequest',
        data: {
            interviewer: interviewerName,
            interviewee: intervieweeName,
            date_time: `${date} ${time}`,
            link
        }
    };

    try {
        await sendMail(mailObj);
        console.log("email sent successfully");
    } catch (error: any) {
        console.error('Error sending email:', error);
        await redisClient.rPush(queueName, JSON.stringify(mailObj));
    }
}

export const InterviewRequestConfirmation = async (data: MessageFromApp) => {
    if (data.type !== EmailTypes.INTERVIEW_CONFIRMATION) {
        throw new Error("Invalid data type");
    }

    const redisClient = RedisClient.getInstance().getClient();
    const { date, time, intervieweeName, interviewerName, intervieweeEmail, link } = data.data;

    const mailObj = {
        subject: `Interview Request Sent to ${interviewerName}`,
        to: intervieweeEmail,
        template: '/views/email/RequestSent',
        data: {
            interviewer: interviewerName,
            interviewee: intervieweeName,
            date_time: `${date} ${time}`,
            link
        }
    };

    try {
        await sendMail(mailObj);
        console.log("email sent successfully");
    } catch (error: any) {
        console.error('Error sending email:', error);
        await redisClient.rPush(queueName, JSON.stringify(mailObj));
    }
}