import { sendWSData } from "./send";

export const onConnect = async (event, context) => {
  console.log(event);
  const sessID = event.requestContext.sessID;

  try {
    // Create a user session in DB
  } catch (error) {
    console.log(error);
    return {
      statusCode: 500,
      body: JSON.stringify(error),
    };
  }
  return {
    statusCode: 200,
  };
};

export const onDisconnect = async (event, context) => {
  console.log(event);

  const sessID = event.requestContext.sessID;

  try {
    // Delete a user session from DB
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify(error),
    };
  }
  return {
    statusCode: 200,
  };
};

export const onBroadcast = async (event, context) => {
  const body = JSON.parse(event.body!);

  await sendWSData(event, event.body);

  return { statusCode: 200, body: "Data sent." };
};

export const onDefault = async (event) => {
  try {
    console.log(typeof event.body);
    const body = JSON.parse(event.body);
    console.log(body);
  } catch (e) {
    console.log(e);
  }
  return {
    statusCode: 200,
  };
};
