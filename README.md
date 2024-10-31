A simple Task Management Application built with React and Vite for the frontend and Python with Flask for the backend. This application enables users to add, update, delete, and list tasks with basic user authentication and API communication between frontend and backend.

Technologies Used

# Frontend: React.js (with Vite for optimized build)
# Backend: Python, Flask, Flask-CORS for API development and cross-origin handling
# Database: Local storage for task data
# Authentication: Basic user authentication setup

Project Structure

The project is organized into two main parts: Backend and Frontend.

1. Backend (Flask API)
Located in the root directory, with the main server logic in app.py:

app.py: Contains the Flask app, API endpoint setup, and integration with Flask-CORS for cross-origin requests.
Packages used: Flask, Flask-CORS, jsonify (convert python dictionary into json format)

2. Frontend (React + Vite)
The src folder contains the frontend components:

Components:
login.jsx: Manages user login functionality.
taskList.jsx: Manages task listing, addition, updating, and deletion.

Features
Task Management: Add, update, delete, and view tasks.
User Authentication: Basic login system.
API Communication: Seamless integration of frontend and backend through Flask API endpoints.


