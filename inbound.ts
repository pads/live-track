import { LambdaFunctionURLHandler } from "aws-lambda";
import { verifySignature } from "@vonage/jwt";
import {
  GetSecretValueCommand,
  SecretsManagerClient,
} from "@aws-sdk/client-secrets-manager";
import { parse } from "./parser";
import { PutObjectCommand, S3Client } from "@aws-sdk/client-s3";

const secretsManager = new SecretsManagerClient({
  region: "us-east-1",
});

const s3 = new S3Client({ region: "us-east-1" });

export const exec: LambdaFunctionURLHandler = async (event) => {
  const token: string | undefined = (event.headers.authorization || "").split(
    " ",
  )[1];

  const secretResponse = await secretsManager.send(
    new GetSecretValueCommand({
      SecretId: "VONAGE_API_SIGNATURE_SECRET",
    }),
  );
  const secret = secretResponse.SecretString;

  if (!verifySignature(token, secret)) {
    console.log("Request unauthorized");
    return {
      statusCode: 401,
      body: "Unauthorized",
    };
  }

  const url = parse(event.body);
  console.log("Received URL", url);

  await s3.send(
    new PutObjectCommand({
      Bucket: "live-track-urls",
      Key: "url",
      Body: url,
      ContentType: "text/plain",
    }),
  );

  return {
    statusCode: 204,
  };
};
