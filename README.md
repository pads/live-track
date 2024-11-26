# Live Track

A Lambda function that extracts a Strava live track URL via SMS for automatic publishing on a website.

## Usage

Requires:

- Node JS
- Serverless

### Deployment

In order to deploy the example, you need to run the following command:

```
sls deploy
```

After running deploy, you should see output similar to:

```
Deploying "live-track" to stage "dev" (us-east-1)

✔ Service deployed to stack live-track-dev (90s)

functions:
  inbound: live-track-dev-inbound (1.5 kB)
```

#### Code-only Deployment

```
serverless deploy function -f inbound
```

### Invocation

After successful deployment, you can invoke the deployed function by using the following command:

```
sls invoke --function inbound
```

Which should result in response similar to the following:

```json
{
  "statusCode": 204
}
```

### Local development

The easiest way to develop and test your function is to use the Serverless Framework's `dev` command:

```
sls dev
```

This will start a local emulator of AWS Lambda and tunnel your requests to and from AWS Lambda, allowing you to interact with your function as if it were running in the cloud.

Now you can invoke the function as before, but this time the function will be executed locally. Now you can develop your function locally, invoke it, and see the results immediately without having to re-deploy.

When you are done developing, don't forget to run `sls deploy` to deploy the function to the cloud.
