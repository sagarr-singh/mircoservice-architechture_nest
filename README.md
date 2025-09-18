# 🧩 Product-Order Microservices

A **microservices-based system** built with [NestJS](https://nestjs.com/), [PostgreSQL](https://www.postgresql.org/), and [TypeORM](https://typeorm.io/), managed using [Yarn Workspaces](https://classic.yarnpkg.com/en/docs/workspaces/).

This project has:

- **products-service** → TCP microservice on port 4001
- **orders-service** → TCP microservice on port 4002
- **api-gateway** → REST API on port 3000, routes to both microservices

---

## ⚙️ Prerequisites

- [Node.js](https://nodejs.org/) (LTS)
- [Yarn](https://classic.yarnpkg.com/en/docs/install/)
- [PostgreSQL](https://www.postgresql.org/download/)

---

## 🗃️ Database Setup

Run these in `psql`:

```sql
CREATE DATABASE products_db;
CREATE DATABASE orders_db;


🏃‍♀️🏃‍♀️🏃‍♀️🏃‍♀️🏃‍♀️🏃‍♀️🏃🏃‍♀️----------- Run each services of package like this

first do yarn install in root

-- Terminal 1
# API Gateway
cd packages/api-gateway
yarn install
yarn start:dev

-- Terminal 2
# Orders Service
cd packages/orders-service
yarn install
yarn start:dev

-- Terminal 3
# Products Service
cd packages/products-service
yarn install
yarn start:dev

-- Terminal 4
# Frontend
cd packages/frontend
yarn install
npm run dev

-- You can see SWAGGER UI running on this address
http://localhost:3000/docs#/
