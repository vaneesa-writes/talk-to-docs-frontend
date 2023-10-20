import AWS from "aws-sdk";

const credentials = new AWS.Credentials({
    accessKeyId: import.meta.env.ACCESSKEYID,
    secretAccessKey: import.meta.env.ACCESSKEY,
});

const lambda = new AWS.Lambda({
    credentials: credentials,
    region: "us-east-1",
});

export default async function genrate_auth_token(email) {
    const params = {
        FunctionName: "jwt-gen",
        InvocationType: "RequestResponse",
        Payload: JSON.stringify({
            user_data:{
                email: email,
            }
        }),
    };
    try {
        const data = await lambda.invoke(params).promise();
        const response = JSON.parse(JSON.parse(data.Payload).body).token;
        return response;
    } catch (error) {
        console.error(error);
    }
}

// test("hello@gmail.com").then((res) => {
//     console.log(JSON.parse(res.body).token)
// })