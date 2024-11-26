import { Handler } from "aws-lambda";

export const exec: Handler = async (event) => {
  console.log("received event", event);
  return {
    statusCode: 204,
  };
};
