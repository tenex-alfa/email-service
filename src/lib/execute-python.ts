import AWS from "aws-sdk";

const lambda = new AWS.Lambda();

const executePython = async (code: string, name: string, input:any) => {

    return new Promise((res: any, rej: any) => lambda.invoke({
        FunctionName: name,
        Payload: JSON.stringify({ code, input }, null, 2)
    }, (error: any, data: any) => {
        if (error) rej(error)
        if (data) res(JSON.parse(data.Payload))
    }))

}

export default executePython;