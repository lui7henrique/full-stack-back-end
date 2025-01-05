1. **Initial Setup**

   - [x] Create a new NestJS project.
   - [x] Configure MongoDB with Mongoose.
   - [x] Set up environment variables and Docker.

2. **Entities and Relationships**

   - [ ] Create entities: `Product`, `Category`, and `Order` with DTOs and Schemas.
   - [ ] Implement many-to-many relationship (`Product ↔️ Category`).

3. **CRUDs**

   - [ ] Implement CRUD operations for `Product`, `Category`, and `Order` with validations.
   - [ ] Handle errors and ensure data consistency.

4. **Dashboard**

   - [ ] Create an endpoint for aggregated metrics (total orders, revenue, etc.).
   - [ ] Use MongoDB queries to filter data by period, category, and product.

5. **Data Seeding Script**

   - [ ] Create a CLI tool to populate the database with fake categories, products, and orders.

6. **Serverless Lambda**

   - [ ] Implement a Lambda function for background tasks (e.g., processing reports).
   - [ ] Demonstrate how to trigger the Lambda (HTTP, cron, etc.).

7. **Delivery**
   - [ ] Set up Docker/Docker Compose for the backend and MongoDB.
   - [ ] Document the project (README.md) with instructions for running and testing.
