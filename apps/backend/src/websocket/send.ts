import * as AWS from "aws-sdk";
import env from "env";

export const sendWSData = async (event, message: string) => {
  let connectionData;

  const apigwManagementApi = new AWS.ApiGatewayManagementApi({
    apiVersion: "2018-11-29",
    // Must configure the endpoint later
    endpoint:
      env.NODE_ENV === "development"
        ? "http://localhost:4001"
        : event?.requestContext.domainName + "/" + event?.requestContext.stage,
  });
  try {
    const postData = JSON.parse(message!);

    for (const { sessID } of connectionData.Items) {
      try {
        console.log("Sending to:", sessID);
        const params = {
          sessID: sessID,
          Data: Buffer.from(JSON.stringify(postData)),
        };
        const res = await apigwManagementApi
          .postToConnection({
            ConnectionId: sessID,
            Data: Buffer.from(JSON.stringify(postData)),
          })
          .promise();
      } catch (e) {
        if (e.statusCode === 410) {
          console.log(`Found stale connection, deleting ${sessID}`);
          // Delete a user session
        } else {
          throw e;
        }
      }
    }
  } catch (e) {
    return { statusCode: 500, body: e.stack };
  }
};
