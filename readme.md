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

## Folder Structure

```
config/         # App configuration
src/
  config/       # TypeScript config files
  db/           # Database connection logic
  gateway/      # Express API gateway (routes, views, middleware)
  proto/        # gRPC proto files and generated types
  redis/        # Redis client and token/session helpers
  server/       # gRPC server setup
  service/      # Business logic, models, and services
migrations/     # Sequelize migration files
seeders/        # Sequelize seeder files
dist/           # Compiled JavaScript output
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

## Installation & Setup

1. **Clone the repository and install dependencies:**
   ```sh
   git clone https://github.com/pr-a-sh-ant/issue-tracking
   cd issue-tracking
   npm install
   ```
2. **Configure your environment:**
   - Set up `.env` as shown above.
   - Ensure MySQL and Redis are running locally or update connection details in `.env`.
3. **Run database migrations:**
   ```sh
   npm run start:migrate
   ```
4. **(Optional) Seed the database:**
   ```sh
   npm run start:seed
   ```
5. **Generate gRPC TypeScript types from proto files:**
   ```sh
   npm run generate:proto
   ```
6. **Start the development servers:**
   - For the API gateway (Express):
     ```sh
     npm run serve:gateway
     ```
   - For the gRPC service:
     ```sh
     npm run serve
     ```
   - Or build and start the main server:
     ```sh
     npm run build
     npm start
     ```

## Scripts

| Script                                   | Description                                    |
| ---------------------------------------- | ---------------------------------------------- |
| `npm run build`                          | Compile TypeScript to JavaScript (`dist/`)     |
| `npm start`                              | Build and start the server                     |
| `npm run serve`                          | Watch TypeScript and auto-restart with nodemon |
| `npm run serve:gateway`                  | Watch and run the Express API gateway          |
| `npm run migration:create --name <name>` | Create a new migration file                    |
| `npm run start:migrate`                  | Run all migrations                             |
| `npm run migration:undo`                 | Undo last migration                            |
| `npm run seeder:create --name <name>`    | Create a new seeder file                       |
| `npm run start:seed`                     | Run all seeders                                |
| `npm run seed:undo`                      | Undo last seeder                               |
| `npm run generate:proto`                 | Generate TypeScript types from proto files     |

## Usage Flow

1. **Start MySQL and Redis servers.**
2. **Run migrations and seeders to set up the database.**
3. **Generate gRPC types from proto files.**
4. **Start the gRPC server and Express API gateway.**
5. **Use the API endpoints via Express (see `src/gateway/routes/`).**
6. **gRPC services are available for internal microservice communication.**

## API Endpoints

- Auth: `/api/v1/auth/*`
- Issues: `/api/v1/issue/*`
- Comments: `/api/v1/comment/*`
- Audit Logs: `/api/v1/logs/*`

## Development

- Start development server with auto-reload:
  ```sh
  npm run serve
  npm run serve:gateway
  ```

## License

ISC
