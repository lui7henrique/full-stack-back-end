# Full-stack back-end

A NestJS API for managing products, categories, and orders with an automated order notification system using AWS Lambda.

### 1. Clone and Install

```bash
git clone https://github.com/lui7henrique/full-stack-back-end.git
cd full-stack-back-end
pnpm install
```

### 2. Setup MongoDB

```bash
docker compose up -d
```

### 3. Configure Environment

Create a `.env` file:

```
MONGODB_URI=mongodb://localhost:27017
MONGODB_DATABASE=db
```

### 4. Seed Database

```bash
pnpm run seed
```

### 5. Run the project

```bash
pnpm run start:dev
```

The API documentation will be available at `http://localhost:3333/api/docs`

### 6. Start Serverless Framework

In a new terminal:

```bash
pnpm run start:lambda
```

### 7. Test Lambda Function

```bash
pnpm run test:lambda
```

## Testing Order Notifications

You can test the Lambda function in two ways:

1. **Through Swagger UI**:

   - Go to `http://localhost:3333/api/docs`
   - Create a new order using the POST /orders endpoint
   - The notification will be triggered automatically

2. **Through CLI** (requires code modification):
   - Currently, you need to modify the order ID directly in the test file
   - Run `pnpm run test:lambda`
   - Note: This should be improved in future versions to accept CLI parameters

## Lambda Trigger Options

Currently, the Lambda function is triggered by an event emitter when orders are created. In a production environment, it could also be triggered by:

- API Gateway HTTP endpoints
- SQS/SNS message queues
- CloudWatch scheduled events (cron)
- S3 bucket events
- DynamoDB stream events
- EventBridge rules

## Known Issues

- Lambda test command requires hardcoding the order ID in the source code
- This should be updated to accept command line parameters for better testing flexibility

## **Notes**

- When deleting a category, the system first checks if any products are linked to it.
- If products are associated, the category is removed from them before the category is deleted.

**Reasoning:**
This approach prevents invalid references, preserves order history, and avoids unintended data loss.

```

```
