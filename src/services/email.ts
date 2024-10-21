import nodemailer from 'nodemailer';
import ejs from 'ejs';
import * as path from 'path';
import dotenv from 'dotenv';
const __basedir = path.resolve(__dirname, '..');

dotenv.config();


interface MailOptions {
    from?: string;
    to: string | string[];
    cc?: string | string[];
    bcc?: string | string[];
    subject?: string;
    template?: string;
    data?: any;
    attachments?: any[];
}

const transporter = nodemailer.createTransport({
    service: 'gmail',
    name: "smtp.google.com",
    host: "smtp.google.com",
    port: parseInt("586"),
    secure: true,
    auth: {
        user: process.env.SENDEREMAIL as string,
        pass: process.env.SENDERPASS as string
    }
});

const sendMail = async (obj: MailOptions): Promise<nodemailer.SentMessageInfo> => {
    if (!Array.isArray(obj.to)) {
        obj.to = [obj.to];
    }

    let htmlText = '';
    if (obj.template) {
        htmlText = await ejs.renderFile(`${__basedir}${obj.template}/html.ejs`, obj.data || {});
    }

    const mailOpts: nodemailer.SendMailOptions = {
        from: obj.from || 'noreply@yoyo.co',
        subject: obj.subject || 'Sample Subject',
        to: obj.to,
        cc: obj.cc || [],
        bcc: obj.bcc || [],
        html: htmlText,
        attachments: obj.attachments || []
    };

    return transporter.sendMail(mailOpts);
};

export default sendMail;