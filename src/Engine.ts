import { InterviewRequest, InterviewRequestConfirmation, ResetPassword } from "./controllers/sendEmail";
import { EmailTypes } from "./types";
import { MessageFromApp } from "./types/from";

export class EmailService {
    async process({
        message,
    }: {
        message: MessageFromApp;
    }) {
        switch (message.type) {

            case EmailTypes.RESET_PASSWORD:
                await ResetPassword(message);
                break;

            case EmailTypes.INTERVIEW_REQUEST:
                await InterviewRequest(message);
                break;

            case EmailTypes?.INTERVIEW_CONFIRMATION: {
                await InterviewRequestConfirmation(message);
                break;
            }
            case EmailTypes?.INTERVIEW_SCHEDULED: {
                console.log('processing email scheduled', message.data);
                break;
            }
            case EmailTypes?.INTERVIEW_CANCEL: {
                console.log('processing email cancel', message.data);
                break;
            }
        }
    }
}
