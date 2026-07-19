# Iron Dome Ops

Backend REST API for managing operational incidents.

## Installation

Clone the repository:

```bash
git clone https://github.com/avi-rapaport/Iron-Dome-Ops.git
cd Iron-Dome-Ops
```

Install dependencies:

```bash
npm install
```

---

## Environment Variables

Create a `.env` file in the project root:

```env
PORT=3000

DB_HOST=localhost
DB_PORT=3306
DB_USER=root
DB_PASSWORD=root
DB_NAME=iron_dome
```

---

## Start MySQL with Docker

Run:

```bash
docker compose up -d
```

Verify the container is running:

```bash
docker ps
```

---

## Create the Database

After MySQL is running, execute the SQL script:

```bash
database.sql
```

This will create:

- Database
- operators table
- incidents table
- logs table
- Foreign Keys

---

## Start the Server

Development mode:

```bash
npm run dev
```

Production mode:

```bash
npm start
```

The server will be available at:

```
http://localhost:3000
```

---

## Project Structure

```
iron-dome-ops/
│
├── controllers/
│   ├── incidents_controller.js
│   └── operators_controller.js
│
├── db/
│   ├── database.js
│   └── database.sql
│
├── middleware/
│   └── validation_middleware.js
│
├── node_modules/
│
├── repositories/
│   ├── base_repo.js
│   ├── incidents_repo.js
│   ├── logs_repo.js
│   └── operators_repo.js
│
├── routes/
│   ├── incidents_routes.js
│   └── operators_routes.js
│
├── services/
│   ├── incidents_service.js
│   ├── logs_service.js
│   └── operators_service.js
│
├── .dockerignore
├── .env
├── .gitignore
├── app.js
├── docker-compose.yml
├── Dockerfile
├── package-lock.json
├── package.json
└── readme.MD
```

---

## API Endpoints

### Create Operator

```
POST /operators
```

### Create Incident

```
POST /incidents
```

### Update Incident Status

```
PATCH /incidents/:id/status
```

### Get Open Incidents

```
GET /incidents/open
```

---

## Docker Commands

Start MySQL:

```bash
docker compose up -d
```

Stop MySQL:

```bash
docker compose down
```

View running containers:

```bash
docker ps
```

View logs:

```bash
docker compose logs
```

---

## Notes

- Make sure the MySQL container is running before starting the server.
- Execute `database.sql` before using the API.
- Ensure the values in `.env` match your MySQL configuration.
