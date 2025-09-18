# 🧩 Product-Order Microservices

A **scalable microservices-based system** built using:

- ⚡ [:contentReference[oaicite:0]{index=0}](https://nestjs.com/) — Node.js framework for building efficient server-side applications  
- 🐘 [:contentReference[oaicite:1]{index=1}](https://www.postgresql.org/) — Reliable relational database  
- 🧩 [:contentReference[oaicite:2]{index=2}](https://typeorm.io/) — Powerful TypeScript ORM for data modeling  
- 📦 [:contentReference[oaicite:3]{index=3}](https://classic.yarnpkg.com/en/docs/workspaces/) — Monorepo management for seamless multi-package development

---

## 🏗️ Architecture Overview

This system follows a **microservices architecture** inside a **monorepo structure**, which allows independent development and deployment while keeping everything organized in one codebase.

**Services:**

- **`products-service`**  
  TCP microservice (port `4001`) handling all product CRUD operations.
  
- **`orders-service`**  
  TCP microservice (port `4002`) responsible for order management and customer details.
  
- **`api-gateway`**  
  RESTful API gateway (port `3000`) that routes incoming HTTP requests to the correct microservice and exposes [:contentReference[oaicite:4]{index=4}](https://swagger.io/tools/swagger-ui/) for API documentation.

- **`frontend`**  
  React-based UI that interacts with the API Gateway for managing products and orders.

**Why this architecture?**

- Independent scalability and deployment  
- Clear separation of concerns  
- Easier maintainability and testing  

---

## ⚙️ Prerequisites

Make sure you have the following installed locally:

- 🟢 [:contentReference[oaicite:5]{index=5} (LTS)](https://nodejs.org/)
- 📦 [:contentReference[oaicite:6]{index=6}](https://classic.yarnpkg.com/en/docs/install/)
- 🐘 [:contentReference[oaicite:7]{index=7}](https://www.postgresql.org/download/)

---

## 🗃️ Database Setup

Open your `psql` terminal and run:

```sql
CREATE DATABASE products_db;
CREATE DATABASE orders_db;
🚀 Running the Project
1. Install dependencies (at root):

bash
Copy code
yarn install
2. Start each service in separate terminals:

bash
Copy code
# Terminal 1 - API Gateway
cd packages/api-gateway
yarn install
yarn start:dev

# Terminal 2 - Orders Service
cd packages/orders-service
yarn install
yarn start:dev

# Terminal 3 - Products Service
cd packages/products-service
yarn install
yarn start:dev

# Terminal 4 - Frontend
cd packages/frontend
yarn install
npm run dev
📜 API Documentation
After running the API Gateway, access the Swagger UI at:

🔗 http://localhost:3000/docs#/

👤 Author
Sagar Singh
Software Developer Assignment
Project: Product-Order Microservices