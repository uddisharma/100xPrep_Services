import { EmailTypes } from ".";

export type MessageFromApp =
    | {
        type: typeof EmailTypes.INTERVIEW_REQUEST;
        data: {
            intervieweeName: string;
            interviewerName: string;
            intervieweeEmail: string;
            interviewerEmail: string;
            date: string;
            time: string;
            link: string;
        };
    }
    | {
        type: typeof EmailTypes.INTERVIEW_CONFIRMATION;
        data: {
            intervieweeName: string;
            interviewerName: string;
            intervieweeEmail: string;
            interviewerEmail: string;
            date: string;
            time: string;
            link: string;
        };
    }
    | {
        type: typeof EmailTypes.RESET_PASSWORD;
        data: {
            user: string;
            userEmail: string;
        };
    };