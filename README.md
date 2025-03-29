# Device Atlas - React + Express/Java Spring-Boot + PostgreSQL/MS-SQL + Docker

## Overview
This project is a full-stack application using:
- **Frontend**: React with Bootstrap for UI components
- **Backend**: Express.js (Node.js framework) OR Java Spring-Boot // Explained in Backend repository
- **Database**: PostgreSQL OR MS-SQL
- **Containerization**: Docker (with separate containers for frontend, backend, and database)

## Prerequisites
Make sure you have the following installed:
- **Docker & Docker Compose**
- **Node.js OR Java**(if running locally)
- **PostgreSQL OR MS-SQL** (if running locally)

## Environment Variables
Create a `.env` file in both frontend and backend directories.

### Frontend `.env`
```
REACT_APP_API_URL=http://192.168.0.15:5000 # For Express.js Backend
#REACT_APP_API_URL=http://192.168.0.15:8080/devices # For Java Spring-Boot Backend
```

## Docker Setup
### 1. Build and Start Containers
Run the following command to build and start all services:
```
docker-compose up --build
```

### 2. Stop Containers
To stop running containers:
```
docker-compose down
```

## API Endpoints
### Backend Routes
- **`GET /tablets`** - Fetch stored tablet data
- **`GET /all`** - Fetch all device records
- **`GET /fetch-devices`** - Add records to the database

## Running Locally (Without Docker)
### Backend - Express.js
1. Install dependencies: `cd backend && npm install`
2. Start the server: `npm start`

### Backend - Java Spring-Boot
1. Install dependencies: `cd backend `
2. Start the server: `mvn clean install mvn spring-boot:run`

### Frontend
1. Install dependencies: `cd frontend && npm install`
2. Start React: `npm start`

## Database Setup (PostgreSQL/MS-SQL)
- If running locally, ensure server is installed and running.
- If using Docker, a DB container container will be created automatically.

## License
This project is licensed under the MIT License.

