# Create API for Search Service

**Estimated duration:** 60 minutes

## Overview

In this lab, you will develop the search API for the `"giftlink-backend"` project.

The search API allows users to filter gifts using:

- Name.
- Category.
- Condition.
- Maximum age in years.

You will also integrate the search routes into Express, test the endpoint, and push the completed changes to GitHub.

---

## Objectives

By the end of this lab, you will be able to:

- Create a search endpoint in `"searchRoutes.js"`.
- Filter gifts using multiple query parameters.
- Connect the search routes to the Express application.
- Test the search API using `"curl"`.
- Save the required output for assessment.
- Push the completed changes to GitHub.

---

## Prerequisites

Before starting, make sure that:

- The `"giftlink-backend"` repository is cloned locally.
- MongoDB is configured and available.
- Node.js and npm are installed.
- The back-end project can run successfully.
- You have access to the GitHub repository.

---

# Step 1: Implement the Search Endpoint

Create a search endpoint that filters gifts using query parameters.

The implementation belongs in:

`"giftlink-backend/routes/searchRoutes.js"`

The endpoint will be available at:

`"/api/search"`

## Search Filters

| Query Parameter | Description |
|---|---|
| `"name"` | Searches gift names using a case-insensitive partial match. |
| `"category"` | Filters gifts by category. |
| `"condition"` | Filters gifts by condition. |
| `"age_years"` | Returns gifts suitable for the specified maximum age. |

---

## Tasks

1. Connect to MongoDB.
2. Access the `"gifts"` collection.
3. Create an empty query object.
4. Add the name filter when a name is provided.
5. Add the category filter.
6. Add the condition filter.
7. Add the age filter.
8. Fetch the filtered gifts.
9. Return the gifts as JSON.

---

## Instructions

Open `"searchRoutes.js"` in your IDE.

The route should:

1. Call `"connectToDatabase()"`.
2. Retrieve the `"gifts"` collection.
3. Build a MongoDB query object.
4. Add only the filters provided by the user.
5. Retrieve the matching gifts.
6. Return the results using `"res.json()"`.

---

## Task 1: Connect to MongoDB

Connect to MongoDB using:

`"const db = await connectToDatabase();"`

Retrieve the gift collection using:

`"const collection = db.collection("gifts");"`

---

## Task 2: Add the Name Filter

Check that the `"name"` query parameter exists and is not empty.

Use:

`"if (req.query.name && req.query.name.trim() !== '')"`

For a case-insensitive partial match, use:

`"query.name = { $regex: req.query.name, $options: "i" }"`

This allows a user to search for part of a gift name without matching the exact capitalization.

---

## Task 3: Add the Other Filters

Add the category filter using:

`"query.category = req.query.category;"`

Add the condition filter using:

`"query.condition = req.query.condition;"`

Add the age filter using:

`"query.age_years = { $lte: parseInt(req.query.age_years) };"`

The `"age_years"` filter uses `"$lte"` to return gifts suitable for the requested age or younger.

---

## Task 4: Fetch Filtered Gifts

Retrieve the filtered gifts using:

`"const gifts = await collection.find(query).toArray();"`

Return the results using:

`"res.json(gifts);"`

---

## Completed `searchRoutes.js`

The completed file should look like this:

    const express = require("express");
    const router = express.Router();
    const connectToDatabase = require("../models/db");

    // Search for gifts
    router.get("/", async (req, res, next) => {
        try {
            // Task 1: Connect to MongoDB
            const db = await connectToDatabase();
            const collection = db.collection("gifts");

            // Initialize the query object
            const query = {};

            // Task 2: Add the name filter
            if (req.query.name && req.query.name.trim() !== "") {
                query.name = {
                    $regex: req.query.name,
                    $options: "i"
                };
            }

            // Task 3: Add the category filter
            if (req.query.category) {
                query.category = req.query.category;
            }

            // Add the condition filter
            if (req.query.condition) {
                query.condition = req.query.condition;
            }

            // Add the age filter
            if (req.query.age_years) {
                query.age_years = {
                    $lte: parseInt(req.query.age_years)
                };
            }

            // Task 4: Fetch filtered gifts
            const gifts = await collection.find(query).toArray();

            res.json(gifts);
        } catch (e) {
            next(e);
        }
    });

    module.exports = router;

---

# Step 2: Integrate Search Routes in `app.js`

In this step, you will connect the search routes to the Express application.

Open `"app.js"` in your IDE.

## Task 1: Import `searchRoutes`

Import the search routes using:

    const searchRoutes = require("./routes/searchRoutes");

## Task 2: Register the Search Routes

Add the search routes to the Express application using:

    app.use("/api/search", searchRoutes);

The search endpoint will then be available at:

`"/api/search"`

For example, a route defined as `"/"` inside `"searchRoutes.js"` becomes:

`"/api/search"`

---

## Required `app.js` Route Configuration

Make sure `"app.js"` contains:

    const giftRoutes = require("./routes/giftRoutes");
    const searchRoutes = require("./routes/searchRoutes");

    app.use("/api/gifts", giftRoutes);
    app.use("/api/search", searchRoutes);

---

# Step 3: Test the Search API

After completing the implementation, start the application and test the search endpoint.

## Start the Application

Run:

    "npm start"

The server should start on port `"3060"`.

## Test Command

Use the following `"curl"` command:

    curl "http://localhost:3060/api/search?name=&age_years=6&category=Office&condition=Older"

This request:

- Sends a `"GET"` request.
- Uses the `"/api/search"` endpoint.
- Leaves the `"name"` filter empty.
- Filters gifts with an age of up to `"6"` years.
- Filters gifts in the `"Office"` category.
- Filters gifts with the `"Older"` condition.

The expected result is an array containing the gifts that match these filters.

According to the lab instructions, three items should satisfy these search criteria.

---

## Assessment Requirements

### Option 1: AI-Graded Submission

For the AI-graded submission:

1. Copy the `"curl"` command.
2. Copy the command output.
3. Save the command and output in a text file named:

`"search_item"`

This file will be used for the final project submission and evaluation.

### Option 2: Peer-Graded Submission

For the peer-graded submission:

1. Successfully deploy the application.
2. Take a screenshot showing the working application.
3. Submit the screenshot for evaluation.

The deployment process is covered in:

`"Module 5 Hands-on Lab: Containerize and Deploy the Application"`

---

# Step 4: Push Changes to GitHub

After testing the API, push the completed changes to GitHub.

## Configure Git

Set your GitHub username using:

    git config --global user.name "<GitHub username>"

Set your GitHub email using:

    git config --global user.email "<GitHub email address>"

Use the email address associated with your GitHub account.

## Stage the Changes

Stage all changes using:

    git add .

## Commit the Changes

Commit the staged changes using:

    git commit -m "Implement search service API"

## Push the Changes

Push the commit to GitHub using:

    git push

Confirm that the updated files appear in the correct GitHub repository.

---

# Step 5: Final Assessment and Solution

Before submitting the lab, verify that the following files have been updated correctly:

- `"giftlink-backend/routes/searchRoutes.js"`
- `"giftlink-backend/app.js"`

## Final Verification Checklist

Confirm that:

- The search endpoint is implemented.
- MongoDB is connected using `"connectToDatabase()"`.
- The `"gifts"` collection is accessed.
- The name filter supports partial, case-insensitive searches.
- The category filter works.
- The condition filter works.
- The age filter uses `"$lte"`.
- Filtered gifts are returned as a JSON array.
- `"searchRoutes"` is imported in `"app.js"`.
- The routes are mounted using `"/api/search"`.
- The API has been tested with `"curl"`.
- The output has been saved in `"search_item"`.
- The changes have been committed to Git.
- The changes have been pushed to GitHub.

---

## Final `searchRoutes.js` Solution

    const express = require("express");
    const router = express.Router();
    const connectToDatabase = require("../models/db");

    router.get("/", async (req, res, next) => {
        try {
            const db = await connectToDatabase();
            const collection = db.collection("gifts");
            const query = {};

            if (req.query.name && req.query.name.trim() !== "") {
                query.name = {
                    $regex: req.query.name,
                    $options: "i"
                };
            }

            if (req.query.category) {
                query.category = req.query.category;
            }

            if (req.query.condition) {
                query.condition = req.query.condition;
            }

            if (req.query.age_years) {
                query.age_years = {
                    $lte: parseInt(req.query.age_years)
                };
            }

            const gifts = await collection.find(query).toArray();

            res.json(gifts);
        } catch (e) {
            next(e);
        }
    });

    module.exports = router;

---

## Final `app.js` Route Configuration

    const giftRoutes = require("./routes/giftRoutes");
    const searchRoutes = require("./routes/searchRoutes");

    app.use("/api/gifts", giftRoutes);
    app.use("/api/search", searchRoutes);

---

## Submission Requirement

For both AI-graded and peer-graded submissions:

1. Copy the public GitHub URL for `"searchRoutes.js"`.
2. Save the URL in a text file.
3. Submit the file according to the course instructions.

---

## Summary

In this lab, you created a search API for the `"giftlink-backend"` project.

The API supports filtering gifts by name, category, condition, and age. You also integrated the search routes into Express, tested the endpoint with `"curl"`, saved the output for assessment, and pushed the completed changes to GitHub.

The main endpoint created in this lab is:

| Endpoint | Purpose |
|---|---|
| `"/api/search"` | Searches and filters gifts. |

---

## Author

Skills Network

© IBM Corporation. All rights reserved.
