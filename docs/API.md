# 🏋️‍♂️ Fitness Tracker API Documentation 📝

## *🌵🌵🌵This documentation is not definitive🌵🌵🌵*

Welcome to the Fitness Tracker API documentation! 🎉 This guide provides detailed information on each endpoint and how to use them effectively.

## Base URL

The base URL for all API endpoints is `https://api.fitness-tracker.com`.

## Authentication

Before making requests to certain endpoints, you may need to authenticate using JSON Web Tokens (JWT). Include the JWT in the `Authorization` header of your request.

### Authentication Endpoints

- **POST /auth/register**: Register a new user.

  - **Request Body**:
    ```json
    {
      "username": "example_user",
      "email": "user@example.com",
      "password": "password123"
    }
    ```
  - **Response**:
    ```json
    {
      "success": true,
      "message": "User registered successfully"
    }
    ```

- **POST /auth/login**: Log in an existing user.

  - **Request Body**:
    ```json
    {
      "email": "user@example.com",
      "password": "password123"
    }
    ```
  - **Response**:
    ```json
    {
      "success": true,
      "token": "your_jwt_token_here"
    }
    ```

## User Endpoints

- **GET /users**: Get all users.

  - **Response**:
    ```json
    [
      {
        "id": 1,
        "username": "example_user",
        "email": "user@example.com"
      },
      {
        "id": 2,
        "username": "another_user",
        "email": "another_user@example.com"
      }
    ]
    ```

- **GET /users/:id**: Get user by ID.

  - **Response**:
    ```json
    {
      "id": 1,
      "username": "example_user",
      "email": "user@example.com"
    }
    ```

- **PUT /users/:id**: Update user by ID.

  - **Request Body**:
    ```json
    {
      "username": "new_username",
      "email": "new_email@example.com"
    }
    ```
  - **Response**:
    ```json
    {
      "success": true,
      "message": "User updated successfully"
    }
    ```

- **DELETE /users/:id**: Delete user by ID.

  - **Response**:
    ```json
    {
      "success": true,
      "message": "User deleted successfully"
    }
    ```

## Workouts Endpoints

Workouts endpoints allow you to manage workout sessions.

- **GET /workouts**: Get all workouts.
- **GET /workouts/:id**: Get workout by ID.
- **POST /workouts**: Create a new workout session.
- **PUT /workouts/:id**: Update workout by ID.
- **DELETE /workouts/:id**: Delete workout by ID.

## Exercises Endpoints

Exercises endpoints allow you to manage exercises and their details.

- **GET /exercises**: Get all exercises.
- **GET /exercises/:id**: Get exercise by ID.
- **POST /exercises**: Create a new exercise.
- **PUT /exercises/:id**: Update exercise by ID.
- **DELETE /exercises/:id**: Delete exercise by ID.

For more information on each endpoint and how to use them, refer to the appropriate section above.

## Contributing 🤝

We welcome contributions to improve the Fitness Tracker API documentation. If you find any errors or have suggestions for improvement, please feel free to submit a pull request or open an issue on our GitHub repository.

Thank you for using the Fitness Tracker API! 🏋️‍♂️📈
```
