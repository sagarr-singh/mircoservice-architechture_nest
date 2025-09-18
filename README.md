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
