import { LambdaFunctionURLHandler } from "aws-lambda";
import { verifySignature } from "@vonage/jwt";
import {
  GetSecretValueCommand,
  SecretsManagerClient,
} from "@aws-sdk/client-secrets-manager";
import { InboundMessage } from "./types";
import { parse } from "./parser";

const secretsManager = new SecretsManagerClient({
  region: "us-east-1",
});

export const exec: LambdaFunctionURLHandler = async (event) => {
  const token: string | undefined = (event.headers.authorization || "").split(
    " ",
  )[1];

  const response = await secretsManager.send(
    new GetSecretValueCommand({
      SecretId: "VONAGE_API_SIGNATURE_SECRET",
    }),
  );
  const secret = response.SecretString;

  if (!verifySignature(token, secret)) {
    console.log("Request unauthorized");
    return {
      statusCode: 401,
      body: "Unauthorized",
    };
  }

  const url = parse(event.body);
  console.log("Received URL", url);

  return {
    statusCode: 204,
  };
};
