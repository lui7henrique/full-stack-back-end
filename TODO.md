1. **Initial Setup**

   - [x] Create a new NestJS project.
   - [x] Configure MongoDB with Mongoose.
   - [x] Set up environment variables and Docker.

2. **Entities and Relationships**

   - [x] Define **Product** schema:
     - Fields: `id`, `name`, `description`, `price`, `categoryIds` (array), `imageUrl`.
   - [x] Define **Category** schema:
     - Fields: `id`, `name`.
   - [x] Define **Order** schema:
     - Fields: `id`, `date`, `productIds` (array), `total`.
   - [x] Implement relationships:
     - Many-to-many: **Product** ↔ **Category**.
     - One-to-many: **Order** ↔ **Product**.

3. **CRUDs**

   - [x] Implement CRUD operations for `Product`, `Category`, and `Order` with validations.
   - [x] Handle errors and ensure data consistency.

4. **Dashboard**

   - [x] Create an endpoint for aggregated metrics (total orders, revenue, etc.).
   - [x] Use MongoDB queries to filter data by period, category, and product.

5. **Data Seeding Script**

   - [x] Create a CLI tool to populate the database with fake categories, products, and orders.

6. **Serverless Lambda**

   - [x] Implement a Lambda function for background tasks (e.g., processing reports).
   - [x] Demonstrate how to trigger the Lambda (HTTP, cron, etc.).

7. **AWS LocalStack Integration**

   - [x] **LocalStack Configuration**

     - [x] Add LocalStack service to Docker Compose for S3 simulation.
     - [x] Configure environment variables for LocalStack S3.
     - [x] Set up AWS SDK with LocalStack endpoints.

   - [x] **S3 Integration**
     - [x] Implement S3 service for file uploads.
     - [x] Add image upload functionality to Product creation/update.
     - [x] Generate and store S3 URLs for product images.
     - [x] Handle image deletion when product is removed.

8. **Delivery**
   - [x] Set up Docker/Docker Compose for the backend and MongoDB.
   - [x] Document the project (README.md) with instructions for running and testing.
