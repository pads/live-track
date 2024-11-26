import { LambdaFunctionURLHandler } from "aws-lambda";
import { verifySignature } from "@vonage/jwt";
import {
  GetSecretValueCommand,
  SecretsManagerClient,
} from "@aws-sdk/client-secrets-manager";

export const exec: LambdaFunctionURLHandler = async (event) => {
  const token: string | undefined = (event.headers.authorization || "").split(
    " ",
  )[1];

  const secretsManager = new SecretsManagerClient({
    region: "us-east-1",
  });
  const response = await secretsManager.send(
    new GetSecretValueCommand({
      SecretId: "VONAGE_API_SIGNATURE_SECRET",
    }),
  );
  const secret = response.SecretString;

  if (verifySignature(token, secret)) {
    console.log("Request OK");
    return {
      statusCode: 204,
    };
  } else {
    console.log("Request Invalid");
    return {
      statusCode: 401,
      body: "Unauthorized",
    };
  }
};
