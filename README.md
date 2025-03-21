# TODO Application

# Tech Stack
- **Frontend:** React, Custom Hooks, API Calls  
- **Backend:** Node.js, Express  
- **Database:** PostgreSQL (via Prisma ORM)  
- **Authentication:** JWT (JSON Web Token)  


## ⏳ Development Time  

This application was built in **4-5 hours** due to a tight work schedule. Some features were prioritized, while others were left out due to time constraints.  

## Features Implemented  

- **User Authentication** using JWT  
- **Get Todos** - Users can fetch their own todos  
- **Create Todos** - Users can create new todos  
- **Add Notes** - Users can add notes to their todos  
- **Delete Todos** - Users can delete todos  
- **Update Todos** - Users can update todos  
- **Basic Error Handling & Validation**
- **Sorting** by **priority, date, and status**  
- **Filtering** by **tags** and **status** 

## What's Not Implemented  
- Users **cannot** view other users' todos.  
- Users **cannot** tag other users in their todos.  
  

## ⚠️ Note on `.env`  

I have **pushed the `.env` file** to the repository **intentionally**. I am fully aware that **one should never do this**, but I did so **to make setup easier** for anyone reviewing or running the project.  

---

## Setup

### 🔹 Test User Credentials  
You can log in with the following test account:  
- **Username:** `robert`  
- **Password:** `0123456789`  


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
   npm run start
   ```
   The backend runs on [http://localhost:8080](http://localhost:8080).

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

