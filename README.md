# Tasks Track 

**Tasks Track** is a straightforward and smooth Task Manager Web App designed to help you organize your work, track your progress, and boost your productivity. Built with a modern JavaScript stack (React, Node.js, MongoDB) and a clean, responsive interface.

##  Key Features

* ** Secure Authentication:** User registration and login powered by JSON Web Tokens (JWT).
* ** Full CRUD Operations:** Create, read, update, and delete tasks with ease.
* **Input Validation:** Robust form validation using Zod.

## 🛠️ Tech Stack

This project is built using a modern and robust technology stack, separated into a frontend client and a backend server.

| Frontend                               | Backend                          |
| -------------------------------------- | -------------------------------- |
| **Framework:** [React](https://react.dev/)             | **Runtime:** [Node.js](https://nodejs.org/)             |
| **Build Tool:** [Vite](https://vitejs.dev/)              | **Framework:** [Express.js](https://expressjs.com/)     |
| **Language:** [JavaScript](https://www.javascript.org/) | **Database:** [MongoDB](https://www.mongodb.com/)               |
| **Styling:** [Tailwind CSS](https://tailwindcss.com/)  | **Auth:** [JWT](https://jwt.io/)                   |
| **Routing:** [React Router](https://reactrouter.com/)    | **Validation:** [Zod](https://zod.dev/)                |
|                                                         | **ODM:** [Mongoose](https://mongoosejs.com/) (Assumed) |
                                                                 
## Getting Started

Follow these instructions to get a local copy up and running for development and testing.

### Prerequisites

* Node.js (v18.0 or higher)
* npm (or yarn/pnpm)
* A MongoDB connection string (you can get a free one at [MongoDB Atlas](https://www.mongodb.com/cloud/atlas))

### Installation & Setup

1.  **Clone the repository:**
    ```sh
    git clone [https://github.com/aryan55254/tasks-track.git](https://github.com/aryan55254/tasks-track.git)
    cd tasks-track
    ```

2.  **Set up the Backend:**
    * Navigate to the backend directory and install dependencies.
        ```sh
        cd backend
        npm install
        ```
    * Create a `.env` file in the `backend` directory and add the following variables:
        ```env
        # Get this from your MongoDB Atlas connection string
        MONGO_URL="your-mongodb-connection-string"

        # Generate a secret using `openssl rand -base64 32` in your terminal
        JWT_SECRET="your-strong-jwt-secret"

        NODE_ENV=development
        ```
    * Start the backend server (it will typically run on port 3000):
        ```sh
        npm run dev
        ```

3.  **Set up the Frontend:**
    * Open a **new terminal window** and navigate to the frontend directory.
        ```sh
        # From the root project directory:
        cd frontend
        npm install
        ```
    * Create a `.env` file in the `frontend` directory and add the following variable. This tells your frontend where the backend API is running.
        ```env
        # For local development, point this to your running local backend server
        VITE_BACKEND_API="http://localhost:3000"
        ```    
    * Start the frontend development server (it will typically run on port 5173):
        ```sh
        npm run dev
        ```

4.  **You're all set!**
    Open your browser and navigate to `http://localhost:5173` (or whatever port your Vite server indicates) to see the application in action! The frontend will connect to your local backend server.
