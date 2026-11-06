# Create API for Gift Service

**Estimated duration:** 60 minutes

## Overview

In this lab, you will develop the gift-related APIs and endpoints for the `"giftlink-backend"` project.

You will connect the application to MongoDB, create endpoints for retrieving gifts, configure the Express routes, test the API, and push your changes to GitHub.

---

## Objectives

By the end of this lab, you will be able to:

- Establish a MongoDB connection in `"models/db.js"`.
- Create an endpoint to retrieve all gifts using `"/api/gifts"`.
- Create an endpoint to retrieve a specific gift using `"/api/gifts/:id"`.
- Configure gift routes in `"app.js"`.
- Test the API endpoints using `"curl"`.
- Push the completed changes to GitHub.

---

## Prerequisites

Before starting, make sure that:

- The `"giftlink-backend"` repository is cloned locally.
- MongoDB is available and configured.
- Node.js and npm are installed.
- You can access the project using an IDE or terminal.
- You have access to the GitHub repository.

The `"giftlink-backend"` repository will be the working directory for this lab.

---

# Step 1: Connect to MongoDB

In this step, you will edit `"giftlink-backend/models/db.js"` and complete the `"connectToDatabase()"` function.

The function must connect to MongoDB, select the `"giftDB"` database, and return the database instance.

## Tasks

1. Connect to MongoDB.
2. Connect to the `"giftDB"` database.
3. Store the database instance in `"dbInstance"`.
4. Return `"dbInstance"`.

## Instructions

Open `"db.js"` in your IDE and complete the `"connectToDatabase()"` function.

## Required Operations

Use `"await client.connect()"` to connect to MongoDB.

Assign the database instance using `"dbInstance = client.db(dbName)"`.

Return the database instance using `"return dbInstance"`.

## Expected Logic

The function should follow this sequence:

1. Connect the MongoDB client.
2. Select the database using the configured database name.
3. Assign the selected database to `"dbInstance"`.
4. Return `"dbInstance"`.

---

# Step 2: Implement the `/api/gifts` Endpoint

In this step, you will implement the endpoint that retrieves all gifts stored in MongoDB.

The implementation belongs in `"giftlink-backend/routes/giftRoutes.js"`.

## Tasks

1. Connect to MongoDB and store the connection in `"db"`.
2. Access the `"gifts"` collection.
3. Retrieve all gifts using MongoDB's `"find()"` method.
4. Convert the result into an array using `"toArray()"`.
5. Return the gifts using `"res.json()"`.

## Instructions

Open `"giftRoutes.js"` in your IDE and complete the `"get()"` function for the gifts endpoint.

## Required Operations

Connect to the database using:

`"const db = await connectToDatabase();"`

Access the gifts collection using:

`"const collection = db.collection("gifts");"`

Retrieve all gifts using:

`"const gifts = await collection.find({}).toArray();"`

Return the gifts using:

`"res.json(gifts)"`

## Expected Result

A successful request to `"/api/gifts"` should return an array containing the gift records stored in MongoDB.

---

# Step 3: Implement the `/api/gifts/:id` Endpoint

In this step, you will create an endpoint that retrieves one gift using its ID.

The implementation belongs in `"giftlink-backend/routes/giftRoutes.js"`.

## Tasks

1. Connect to MongoDB and store the connection in `"db"`.
2. Access the `"gifts"` collection.
3. Read the gift ID from the request parameters.
4. Find the matching gift using `"findOne()"`.
5. Store the result in `"gift"`.
6. Return the requested gift.

## Instructions

Continue editing `"giftRoutes.js"` and add the `"/:id"` route.

## Required Operations

Connect to the database using:

`"const db = await connectToDatabase();"`

Access the gifts collection using:

`"const collection = db.collection("gifts");"`

Find the gift using:

`"const gift = await collection.findOne({ id: id });"`

The value of `"id"` should come from the route parameter.

## Expected Result

A successful request to `"/api/gifts/:id"` should return the gift that matches the requested ID.

If no gift matches the provided ID, the application should handle the result appropriately according to the project implementation.

---

# Step 4: Connect the Routes in `app.js`

In this step, you will integrate the gift routes into the main Express application.

The routes must be configured so that all gift-related requests use the `"/api/gifts"` path.

## Tasks

1. Import `"giftRoutes"` into `"app.js"`.
2. Register `"giftRoutes"` as Express middleware.
3. Configure the middleware to use the `"/api/gifts"` path.

## Instructions

Open `"app.js"` in your IDE.

## Import the Gift Routes

Import the routes using:

`"const giftRoutes = require('./routes/giftRoutes');"`

## Register the Gift Routes

Attach the routes to the Express application using:

`"app.use('/api/gifts', giftRoutes);"`

This configuration means that routes defined in `"giftRoutes.js"` will be available under the `"/api/gifts"` path.

For example:

- A route defined as `"/"` becomes `"/api/gifts"`.
- A route defined as `"/:id"` becomes `"/api/gifts/:id"`.

---

# Step 5: Test the API Endpoints

In this step, you will start the application and use `"curl"` to test the API endpoints.

## Tasks

1. Start the terminal.
2. Start the back-end server.
3. Test the `"/api/gifts"` endpoint.
4. Test the `"/api/gifts/:id"` endpoint.
5. Save the required output for assessment.

## Test the All-Gifts Endpoint

Use `"curl"` to send a request to the `"/api/gifts"` endpoint.

Example:

`"curl http://localhost:<PORT>/api/gifts"`

Replace `"<PORT>"` with the port used by your application.

The response should contain an array of gifts.

## Test the Gift-by-ID Endpoint

Use `"curl"` to request a specific gift.

Example:

`"curl http://localhost:<PORT>/api/gifts/<GIFT_ID>"`

Replace `"<PORT>"` with the application port and `"<GIFT_ID>"` with a valid gift ID.

The response should contain the matching gift.

---

## Assessment Requirements

### Option 1: AI-Graded Submission

For the all-gifts endpoint:

1. Copy the `"curl"` command.
2. Copy the command output.
3. Save both in a text file named `"mainpage"`.

For the gift-by-ID endpoint:

1. Copy the `"curl"` command.
2. Copy the command output.
3. Save both in a text file named `"item_detail"`.

These files will be used for the final project submission and evaluation.

### Option 2: Peer-Graded Submission

You must submit a screenshot showing the successfully deployed application.

The deployment process is covered in:

`"Module 5 Hands-on Lab: Containerize and Deploy the Application"`

---

# Step 6: Push Changes to GitHub

In this step, you will configure your Git identity and push the completed changes to GitHub.

## Configure Git

Set your GitHub username using:

`"git config --global user.name "<GitHub username>""`

Set your GitHub email using:

`"git config --global user.email "<GitHub email address>""`

Use the email address associated with your GitHub account.

## Tasks

1. Configure your Git username.
2. Configure your Git email.
3. Stage the changes.
4. Commit the changes.
5. Push the changes to GitHub.

## Stage the Changes

Stage all modified files using:

`"git add ."`

## Commit the Changes

Create a commit using:

`"git commit -m "Implement gift service API""`

You may replace the commit message with another meaningful description.

## Push the Changes

Push the commit to GitHub using:

`"git push"`

Confirm that the changes appear in the correct GitHub repository.

---

# Step 7: Final Assessment and Solution

After completing the lab, verify that the following files contain the required implementation:

- `"giftlink-backend/models/db.js"`
- `"giftlink-backend/routes/giftRoutes.js"`
- `"giftlink-backend/app.js"`

## Final Verification Checklist

Before submitting, confirm that:

- MongoDB connection logic is implemented.
- The `"giftDB"` database is selected.
- The `"/api/gifts"` endpoint returns all gifts.
- The `"/api/gifts/:id"` endpoint returns a specific gift.
- The gift routes are imported in `"app.js"`.
- The gift routes are mounted using `"/api/gifts"`.
- Both endpoints have been tested with `"curl"`.
- The changes have been committed to Git.
- The changes have been pushed to GitHub.

## Submission Requirements

For both AI-graded and peer-graded submissions:

1. Copy the public GitHub URL for `"app.js"`.
2. Copy the public GitHub URL for `"giftRoutes.js"`.
3. Copy the public GitHub URL for `"db.js"`.
4. Save the URLs in a text file for submission.

For AI-graded submissions, also include:

- The `"mainpage"` output file.
- The `"item_detail"` output file.

For peer-graded submissions, also include:

- A screenshot showing the successfully deployed application.

---

## Summary

In this lab, you created the gift service API for the `"giftlink-backend"` project.

You connected the application to MongoDB, retrieved all gifts, retrieved individual gifts by ID, configured Express middleware, tested the endpoints, and pushed the completed project to GitHub.

The main API endpoints created in this lab are:

| Endpoint | Purpose |
|---|---|
| `"/api/gifts"` | Retrieves all gifts. |
| `"/api/gifts/:id"` | Retrieves a specific gift by ID. |

---

## Author

Skills Network

© IBM Corporation. All rights reserved.
