# MERN Password Manager

Welcome to MERN Password Manager, a secure and convenient way to manage your passwords for various online accounts.

## Installation

1. Clone the repository:
   ```sh
   git clone https://github.com/Darshan910/passwodManager
   ```

2. Install dependencies for both the frontend and backend:
   ```sh
   # Install frontend dependencies (in the root directory)
   npm install
   
   # Navigate to the backend directory
   cd backend
   
   # Install backend dependencies
   npm install
   ```

3. Set up environment variables:
   - change a `.env` file in the `backend` directory.
   - Define the following environment variables in the `.env` file according to your requirement:
     ```
     PORT=3000
     MONGO_URI=your_mongodb_connection_string
     JWT_SECRET=your_jwt_secret
     ```

4. Run the development servers:
   ```sh
   # Start the backend server (in the backend directory)
   npm start
   
   # Start the frontend development server (in the root directory)
   npm run dev
   ```

5. Access the application in your web browser:
   Open [http://localhost:3000](http://localhost:3000) to view the application in your browser.

## Usage

- Sign up for a new account or log in with an existing one.
- Add, edit, and delete site entries in your password manager.
- You can add as many as site details you want.

## Technologies Used

- Frontend: React, Vite, React Router, Axios
- Backend: Node.js, Express.js, MongoDB, Mongoose
- Authentication: JSON Web Tokens (JWT)


## Contributor

This project has been developed by:
- Darshan Ajani (UI21EC07)

## Contributing

Contributions are welcome! Feel free to submit bug reports, feature requests, or pull requests.

