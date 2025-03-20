# Project Name

## Description
A brief description of the project, including its purpose, features, and key technologies used.

## Tech Stack
- **Frontend:** React, Custom Hooks, API Calls  
- **Backend:** Node.js, Express  
- **Database:** PostgreSQL (via Prisma ORM)  
- **Authentication:** JWT (JSON Web Token)  

## Features
- User Authentication using JWT  
- **Get Todos** - Users can fetch their own todos  
- **Create Todos** - Users can create new todos  

## What's Not Implemented
- Users can view other users' todos by navigating to a different tab  
- Users can tag other users in their todos  

---

## Setup

### Client Setup

1. Navigate to the client folder:
   ```sh
   cd client
   ```
2. Install dependencies:
   ```sh
   npm install
   ```
3. Start the frontend:
   ```sh
   npm run dev
   ```
   The frontend runs on [http://localhost:3000](http://localhost:3000).

---

### Server Setup

1. Navigate to the server folder:
   ```sh
   cd server
   ```
2. Install dependencies:
   ```sh
   npm install
   ```
3. Set up environment variables:
   - Create a `.env` file in the `server/` directory
   - Add necessary configurations for database and JWT secret  
4. Run database migrations:
   ```sh
   npx prisma migrate dev
   ```
5. Start the backend:
   ```sh
   npm run dev
   ```
   The backend runs on [http://localhost:5000](http://localhost:5000).

---

## API Endpoints

### Todo Routes (`/api/todos`)
These routes handle operations related to user todos.

- **GET /api/todos/:username**  
  - Fetches all todos for a specific user.  
  - `:username` is a dynamic parameter representing the user's identifier.  
  - No authentication is required.  

- **POST /api/todos/create**  
  - Creates a new todo for the authenticated user.  
  - Requires authentication (`authenticate` middleware is applied).  

---

### User Routes (`/api/users`)
These routes allow fetching and managing user accounts.  
All routes under `/api/users` require authentication.

- **GET /api/users/**  
  - Fetches a list of all users.  

- **GET /api/users/:id**  
  - Fetches details of a specific user by their unique ID.  

- **PUT /api/users/:id**  
  - Updates a user's details based on their ID.  

- **DELETE /api/users/:id**  
  - Deletes a user from the system based on their ID.  

---

### Authentication Routes (`/api/auth`)
These routes handle user registration and login.

- **POST /api/auth/register**  
  - Registers a new user in the system.  

- **POST /api/auth/login**  
  - Authenticates a user and returns a JWT token.  

---

## Contributing
1. Fork the repository  
2. Create a new branch (`feature/my-feature`)  
3. Commit your changes  
4. Push to your branch  
5. Create a Pull Request  

---

## License
This project is licensed under the MIT License - see the LICENSE file for details.

