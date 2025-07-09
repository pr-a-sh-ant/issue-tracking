# Issue Tracking System

A Node.js-based issue tracking system using TypeScript, MySQL, Redis, gRPC, and Sequelize.

## Features

- User authentication with JWT and Redis session management
- MySQL database integration (via `mysql2`)
- gRPC microservices with TypeScript definitions
- Database migrations and seeders (via Sequelize)
- Environment variable management with dotenv

## Prerequisites

- Node.js (v18+ recommended)
- MySQL server
- Redis server

## Installation

```sh
git clone <repo-url>
cd issue-tracking
npm install
```

## Environment Setup

Create a `.env` file in the root directory with your configuration:

```env
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=yourpassword
DB_NAME=issue_tracking
DB_PORT=3306
JWT_SECRET=your_jwt_secret
REDIS_PASSWORD=your_redis_password
```

## Scripts

| Script                                   | Description                                    |
| ---------------------------------------- | ---------------------------------------------- |
| `npm run build`                          | Compile TypeScript to JavaScript (`dist/`)     |
| `npm start`                              | Build and start the server                     |
| `npm run serve`                          | Watch TypeScript and auto-restart with nodemon |
| `npm run migration:create --name <name>` | Create a new migration file                    |
| `npm run start:migrate`                  | Run all migrations                             |
| `npm run migration:undo`                 | Undo last migration                            |
| `npm run seeder:create --name <name>`    | Create a new seeder file                       |
| `npm run start:seed`                     | Run all seeders                                |
| `npm run seed:undo`                      | Undo last seeder                               |
| `npm run generate:porto`                 | Generate TypeScript types from proto files     |
| `npm run proto:watch`                    | Watch proto files and regenerate types         |

## Project Structure

```
src/
  config/         # Configuration files
  db/             # Database connection
  proto/          # gRPC proto files and generated types
  redis/          # Redis client and token/session helpers
  server/         # gRPC server setup
  service/        # Business logic, models, and services
dist/             # Compiled JavaScript output
```

## Database Migration & Seeding

- Create migration:  
  `npm run migration:create --name <migration_name>`
- Run migrations:  
  `npm run start:migrate`
- Undo migration:  
  `npm run migration:undo`
- Create seeder:  
  `npm run seeder:create --name <seeder_name>`
- Run seeders:  
  `npm run start:seed`
- Undo seeder:  
  `npm run seed:undo`

## gRPC & Proto

- Generate TypeScript types from proto files:  
  `npm run generate:porto`
- Watch proto files and auto-generate types:  
  `npm run proto:watch`

## Development

- Start development server with auto-reload:  
  `npm run serve`

##
