# Dashboard RMS Dashboard

This is a dashboard for the Dashboard RMS project.

## Getting Started

Create a .env file:
```.env
VITE_API_HOST=
```
Install dependencies:
```bash
yarn install
yarn dev
```

## Build and Deploy

To build the project:

```bash
yarn build
```

This will create build files in the `/dist` directory.

Deploying the project:
To deploy, you can manually trigger the deployment workflow:

- Go to the repository's Actions tab.
- Click on the "Deploy to Development Environment" workflow.
- Click on the "Run workflow" dropdown.
- Select the branch you want to deploy and click "Run workflow".

You may need to set up secrets in Github first:

- S3_BUCKET
- AWS_ACCESS_KEY_ID
- AWS_SECRET_ACCESS_KEY
- AWS_REGION
- CLOUDFRONT_DISTRIBUTION_ID
# Dashboard-admin-dashboard-fe
