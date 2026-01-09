# tech-challenge-fiap-auth

Authentication Lambda function for FIAP Tech Challenge.

## Setup

1. Clone the repository.
2. Install dependencies: `npm install`
3. Build: `npm run build`

## Deployment

This project uses GitHub Actions for automatic deployment to AWS.

### Required GitHub Secrets

Set the following secrets in your GitHub repository settings:

- `AWS_ACCESS_KEY_ID`: Your AWS access key ID
- `AWS_SECRET_ACCESS_KEY`: Your AWS secret access key
- `DB_HOST`: Database host
- `DB_USER`: Database user
- `DB_PASSWORD`: Database password

### Deployment Process

On push to the `main` branch, the workflow will:
- Build the TypeScript code
- Deploy the Lambda function and API Gateway using Terraform

## Local Development

To test locally, ensure you have the environment variables set.