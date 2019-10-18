import AWS from "aws-sdk";

const ses = new AWS.SES();

const sendSms = (request: any) => {

    const { to, title, body, from } = request;
    const recievers: Array<string> = Array.isArray(to) ? to : [to];

    return new Promise((res, rej) => ses.sendEmail({
        Message: {
            Subject: {
                Data: title
            },
            Body: {
                Html: {
                    Data: body
                }
            }
        },
        Destination: {
            ToAddresses: recievers
        },
        Source: "erik.rehn98@gmail.com"
    }, (error: any, data: any) => {
        if (error) rej(error);
        if (data) res(data);
    }))
}

export default sendSms;