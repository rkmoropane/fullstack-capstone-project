# Develop Back-End Integration for User Profile

**Estimated duration:** 30 minutes

## Overview

This hands-on lab focuses on developing and testing the user profile update API for the `giftlink-backend` project.

The API allows an authenticated user to update profile information stored in MongoDB.

## Objectives

By completing this lab, you will:

- Create an `"/update"` endpoint in `"routes/authRoutes.js"`.
- Validate request data using `"express-validator"`.
- Check for the user’s email in the request headers.
- Connect to the `"giftsdb"` MongoDB database.
- Access the `"users"` collection.
- Find the user’s existing credentials.
- Update the user’s profile details.
- Add an `"updatedAt"` timestamp.
- Create a JWT authentication token.
- Handle errors and structure API responses.
- Push the completed changes to GitHub.

## Prerequisites

Before starting, ensure that:

- You have completed the previous modules.
- The registration and login APIs have been implemented.
- You have pushed your previous changes to GitHub.
- The `"giftlink-backend"` directory is available locally.
- The repository has been cloned to the local environment.
- MongoDB is configured.
- The JWT secret is stored in the `".env"` file.

---

# Step 1: Implement the `"/update"` Endpoint

Create or update the `"/update"` route in `"routes/authRoutes.js"`.

The endpoint should be available through:

"PUT /api/auth/update"

## Required Imports

Use `"body"` and `"validationResult"` from `"express-validator"`:

"const {
  body,
  validationResult
} = require('express-validator');"

The route should also use the project’s existing imports for:

- Express
- MongoDB database connection
- JSON Web Tokens
- Pino logging
- Environment variables

## Route Structure

The update route should follow this general structure:

"router.put('/update', async (req, res) => {
  const errors = validationResult(req);

  try {
    // Validate the request
    // Check the email header
    // Connect to MongoDB
    // Find the user
    // Update the user
    // Create a JWT
    // Return the response
  } catch (e) {
    return res.status(500).send('Internal server error');
  }
});"

---

## Task 1: Add Input Validation

Use `"validationResult(req)"` to check whether the request contains validation errors:

"const errors = validationResult(req);"

If validation errors exist, log them and return a `400` response:

"if (!errors.isEmpty()) {
  logger.error('Validation errors in update request', errors.array());

  return res.status(400).json({
    errors: errors.array()
  });
}"

The response should provide enough information for the client to identify invalid input.

## Task 2: Check for the Email Header

Read the user’s email from the request headers:

"const email = req.headers.email;"

The email is used to identify the user whose profile should be updated.

If the email header is missing, return an appropriate error:

"if (!email) {
  logger.error('Email not found in the request headers');

  return res.status(400).json({
    error: 'Email not found in the request headers'
  });
}"

The email header must be included when calling the update API.

## Task 3: Connect to MongoDB

Connect to the `"giftsdb"` database through `"connectToDatabase"` in `"db.js"`:

"const db = await connectToDatabase();"

Access the `"users"` collection:

"const collection = db.collection('users');"

## Task 4: Find the Existing User

Find the user using the email from the request header:

"const existingUser = await collection.findOne({ email });"

If the user does not exist, return a `404` response:

"if (!existingUser) {
  logger.error('User not found');

  return res.status(404).json({
    error: 'User not found'
  });
}"

## Task 5: Update User Details

Update the required profile field using the request body.

For example, update the user’s first name:

"existingUser.firstName = req.body.name;"

Add an update timestamp:

"existingUser.updatedAt = new Date();"

Only update the fields required by the project. Avoid overwriting unrelated user data.

## Task 6: Save the Updated User

Use `"findOneAndUpdate"` to save the updated credentials:

"const updatedUser = await collection.findOneAndUpdate(
  { email },
  { $set: existingUser },
  { returnDocument: 'after' }
);"

The `"returnDocument: 'after'"` option ensures that the updated user document is returned.

## Task 7: Create JWT Authentication

Create a JWT using the updated user’s `"_id"`:

"const payload = {
  user: {
    id: updatedUser._id.toString()
  }
};"

Sign the token using the secret stored in the environment:

"const authtoken = jwt.sign(payload, JWT_SECRET);"

The JWT secret should be loaded from the `".env"` file:

"const JWT_SECRET = process.env.JWT_SECRET;"

Do not hard-code or expose the JWT secret.

## Successful Response

After the profile is updated successfully, return the authentication token:

"res.json({
  authtoken
});"

Log the successful update:

"logger.info('User updated successfully');"

Do not return passwords, password hashes, or other sensitive information.

## Error Handling

Wrap the database and update logic in a `"try...catch"` block:

"try {
  // Update logic
} catch (error) {
  logger.error(error);
  return res.status(500).send('Internal Server Error');
}"

---

# Step 2: Configure the API Route

Ensure that `"authRoutes.js"` is connected to the Express application in `"app.js"`.

The authentication routes should be mounted using:

"app.use('/api/auth', authRoutes);"

This makes the update endpoint available at:

"PUT /api/auth/update"

---

# Step 3: Test the Update API

Start the back-end server and test the endpoint using cURL or Postman.

## Required Request Information

The request should include:

- The HTTP method `"PUT"`.
- The API URL.
- The email header.
- The updated profile information.
- The JSON content type.

Example request structure:

"curl -X PUT http://localhost:3060/api/auth/update \
  -H "Content-Type: application/json" \
  -H "email: user@example.com" \
  -d "{\"name\":\"Updated Name\"}""

Replace the URL, email address, and profile details with values appropriate for your project.

## Verify a Successful Update

A successful request should:

- Find the user by email.
- Update the profile information.
- Set the `"updatedAt"` timestamp.
- Return a new authentication token.
- Return a successful HTTP response.

## Test Error Scenarios

Test the following cases:

- Missing email header.
- Invalid request body.
- User email does not exist.
- Database connection failure.
- Invalid or incomplete profile data.

Confirm that the API returns suitable status codes and error messages.

---

# Step 4: Push Changes to GitHub

After implementing and testing the update API, push the changes to GitHub.

## Stage Changes

Stage all modified and new files:

"git add ."

## Commit Changes

Commit the implementation:

"git commit -m "Implement user profile update API""

## Push Changes

Push the commit to GitHub:

"git push"

Verify that the updated `"authRoutes.js"` and related files are visible in the repository.

---

# Final Solution Requirements

The completed `"routes/authRoutes.js"` file should contain the existing:

- `"/register"` API.
- `"/login"` API.
- `"/update"` API.

The final implementation should include:

- Express route configuration.
- MongoDB database integration.
- User lookup by email.
- Input validation.
- Profile update logic.
- Update timestamp.
- JWT generation.
- Pino logging.
- Error handling.
- CommonJS module export.

The authentication routes should be exported using:

"module.exports = router;"

---

# Final Verification Checklist

Before completing the lab, confirm that:

- The `"/update"` route exists.
- The route uses the `"PUT"` method.
- `"body"` and `"validationResult"` are imported.
- Request validation is performed.
- Validation errors return a `400` response.
- The email is read from the request headers.
- Missing email returns an appropriate error.
- The application connects to `"giftsdb"`.
- The `"users"` collection is accessed.
- The user is searched using the email address.
- A missing user returns a `404` response.
- User profile details are updated.
- The `"updatedAt"` field is updated.
- The updated record is saved to MongoDB.
- A JWT is created using the updated user’s `"_id"`.
- The JWT secret is loaded from the `".env"` file.
- The API returns `"authtoken"` after a successful update.
- Passwords and password hashes are not returned.
- Unexpected errors return a `500` response.
- The `"/api/auth"` route is configured in `"app.js"`.
- The endpoint has been tested using cURL or Postman.
- The changes have been committed.
- The changes have been pushed to GitHub.

---

# Lab Summary

In this lab, you develop the back-end integration for updating user profile information.

The completed update flow is:

1. The client sends a `PUT` request to `"/api/auth/update"`.
2. The request contains the user’s email in the headers.
3. The request body contains the updated profile information.
4. The server validates the request.
5. The server connects to MongoDB.
6. The user is located in the `"users"` collection.
7. The profile information is updated.
8. The `"updatedAt"` timestamp is saved.
9. A new JWT is created.
10. The authentication token is returned.
11. Errors are handled with appropriate responses.
12. The completed code is pushed to GitHub.

© IBM Corporation. All rights reserved.
