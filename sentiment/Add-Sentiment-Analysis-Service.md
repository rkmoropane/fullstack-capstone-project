# Add a Sentiment Analysis Service

**Estimated duration:** 60 minutes

## Overview

In this lab, you will create an Express server that performs sentiment analysis using the `"natural"` npm package.

The Natural library provides natural language processing features for Node.js, including sentiment analysis for English sentences.

The service will expose a `"POST /sentiment"` endpoint that analyzes a sentence and classifies it as:

- Positive.
- Negative.
- Neutral.

---

## Objectives

By the end of this lab, you will be able to:

- Install the `"natural"` npm package.
- Import and configure the Natural library.
- Create an Express server.
- Implement a `"POST /sentiment"` endpoint.
- Extract a sentence from the request.
- Calculate a sentiment score.
- Classify the result as positive, negative, or neutral.
- Return successful and error responses.
- Push the completed service to GitHub.

---

## Prerequisites

Before starting, make sure that:

- The GitHub repository from the previous labs has been cloned.
- Node.js and npm are installed.
- You can access the project in a terminal or IDE.
- You are working inside the sentiment service directory.

Navigate to:

    "fullstack-capstone-project/sentiment"

This directory will be the working directory for the lab.

---

# Step 1: Install the Required Package

The sentiment service requires the `"natural"` npm package.

## Install Natural

Run the following command inside the `"sentiment"` directory:

    npm install natural

This command adds the `"natural"` package to the dependencies listed in `"sentiment/package.json"`.

## Expected Dependency

The `"package.json"` file should contain a dependency similar to:

    "natural": "^6.10.4"

The exact version may be different depending on the current package version installed.

## Evidence of Completion

Confirm that:

- The installation completes successfully.
- The `"natural"` package appears in `"package.json"`.
- A `"package-lock.json"` file is updated or created.
- The package is available inside `"node_modules"`.

---

# Step 2: Implement the Sentiment Analysis Server

The server implementation belongs in:

`"sentiment/index.js"`

The server must:

1. Import the Natural library.
2. Initialize Express.
3. Add JSON request handling.
4. Create the `"POST /sentiment"` endpoint.
5. Extract the sentence from the request.
6. Tokenize the sentence.
7. Calculate the sentiment score.
8. Classify the sentiment.
9. Return a successful JSON response.
10. Handle errors and return an error response.
11. Start the server on the predefined port.

---

## Task 1: Import the Natural Library

Import the Natural library using:

    const natural = require("natural");

Also import Express:

    const express = require("express");

---

## Task 2: Initialize the Express Server

Initialize the Express application using:

    const app = express();

Enable JSON request processing using:

    app.use(express.json());

---

## Task 3: Create the Sentiment Endpoint

Create a `"POST"` route using the `"/sentiment"` path:

    app.post("/sentiment", async (req, res) => {
        // Sentiment analysis logic
    });

---

## Task 4: Extract the Sentence

The lab template uses the request query object to retrieve the sentence.

Extract the sentence using:

    const { sentence } = req.query;

The expected request format is:

    "POST /sentiment?sentence=I love this gift"

If your provided template expects the sentence in the request body instead, use:

    const { sentence } = req.body;

Follow the format required by the existing lab template.

---

## Task 5: Analyze the Sentence

Create a tokenizer and split the sentence into individual words.

Use:

    const tokenizer = new natural.WordTokenizer();
    const tokens = tokenizer.tokenize(sentence);

Create a sentiment analyzer using:

    const analyzer = new natural.SentimentAnalyzer(
        "English",
        natural.PorterStemmer,
        "afinn"
    );

Calculate the sentiment score using:

    const analysisResult = analyzer.getSentiment(tokens);

The sentiment score is based on the words in the sentence.

---

## Sentiment Classification Rules

Use the following rules to classify the sentiment:

| Score | Sentiment |
|---|---|
| Less than `0` | Negative |
| From `0` to `0.33` | Neutral |
| Greater than `0.33` | Positive |

The sentiment should initially be set to neutral:

    let sentiment = "neutral";

Use conditional logic to update the value:

    if (analysisResult < 0) {
        sentiment = "negative";
    } else if (analysisResult <= 0.33) {
        sentiment = "neutral";
    } else {
        sentiment = "positive";
    }

---

## Task 6: Return a Successful Response

Return a successful response with HTTP status `"200"`.

The response should contain:

- The calculated sentiment score.
- The sentiment classification.

Use:

    res.status(200).json({
        sentimentScore: analysisResult,
        sentiment: sentiment
    });

A successful response may look like:

    {
        "sentimentScore": 0.75,
        "sentiment": "positive"
    }

---

## Task 7: Handle Errors

Wrap the sentiment analysis logic in a `"try...catch"` block.

If an error occurs, return an HTTP status of `"500"` with a JSON error message:

    res.status(500).json({
        error: "Error analyzing sentiment"
    });

You may also log the original error:

    console.error("Error analyzing sentiment:", error);

---

## Example Completed `sentiment/index.js`

The completed file may look like this:

    const express = require("express");
    const natural = require("natural");

    const app = express();
    const port = 3060;

    app.use(express.json());

    app.post("/sentiment", async (req, res) => {
        try {
            const { sentence } = req.query;

            if (!sentence || sentence.trim() === "") {
                return res.status(400).json({
                    error: "A sentence is required"
                });
            }

            const tokenizer = new natural.WordTokenizer();

            const tokens = tokenizer.tokenize(sentence);

            const analyzer = new natural.SentimentAnalyzer(
                "English",
                natural.PorterStemmer,
                "afinn"
            );

            const analysisResult = analyzer.getSentiment(tokens);

            let sentiment = "neutral";

            if (analysisResult < 0) {
                sentiment = "negative";
            } else if (analysisResult <= 0.33) {
                sentiment = "neutral";
            } else {
                sentiment = "positive";
            }

            res.status(200).json({
                sentimentScore: analysisResult,
                sentiment: sentiment
            });
        } catch (error) {
            console.error("Error analyzing sentiment:", error);

            res.status(500).json({
                error: "Error analyzing sentiment"
            });
        }
    });

    app.listen(port, () => {
        console.log(`Sentiment server running on port ${port}`);
    });

---

# Testing the Sentiment Service

Start the service using the command specified in `"sentiment/package.json"`.

For example:

    npm start

The server should start on the configured port.

## Test a Positive Sentence

Use:

    curl --request POST "http://localhost:3060/sentiment?sentence=I love this wonderful gift"

The response should classify the sentence as positive.

## Test a Negative Sentence

Use:

    curl --request POST "http://localhost:3060/sentiment?sentence=I hate this terrible gift"

The response should classify the sentence as negative.

## Test a Neutral Sentence

Use:

    curl --request POST "http://localhost:3060/sentiment?sentence=This is a gift"

The response should classify the sentence as neutral or return the score produced by the Natural library.

## Test a Missing Sentence

Use:

    curl --request POST "http://localhost:3060/sentiment"

The service should return a client error indicating that a sentence is required.

---

# Step 3: Push Changes to GitHub

After completing and testing the sentiment service, push the changes to GitHub.

## Stage the Changes

Run:

    git add .

## Commit the Changes

Create a commit using:

    git commit -m "Add sentiment analysis service"

## Push the Changes

Push the commit to GitHub using:

    git push

Confirm that the updated sentiment service files appear in the correct GitHub repository.

---

# Step 4: Assessment and Final Solution

The final solution should include the following files:

- `"sentiment/package.json"`
- `"sentiment/package-lock.json"`
- `"sentiment/index.js"`

## Final Verification Checklist

Before submitting, confirm that:

- The `"natural"` package is installed.
- The package appears in `"package.json"`.
- The Express server starts successfully.
- The `"POST /sentiment"` endpoint exists.
- The sentence parameter is extracted correctly.
- The sentence is tokenized.
- A sentiment score is calculated.
- Negative scores return `"negative"`.
- Scores from `0` to `0.33` return `"neutral"`.
- Scores greater than `0.33` return `"positive"`.
- Successful responses return HTTP status `"200"`.
- Errors return an appropriate error response.
- The changes have been committed to Git.
- The changes have been pushed to GitHub.

---

## Submission Requirement

For both AI-graded and peer-graded submissions:

1. Copy the public GitHub URL for `"sentiment/index.js"`.
2. Save the URL in a text file.
3. Submit the file according to the course instructions.

You may also include the public GitHub URL for:

- `"sentiment/package.json"`
- `"sentiment/package-lock.json"`

---

## Summary

In this lab, you created a sentiment analysis service using Express and the Natural npm library.

The service accepts a sentence, calculates its sentiment score, classifies the sentence as positive, negative, or neutral, and returns the result as JSON.

The main endpoint created in this lab is:

| Method | Endpoint | Purpose |
|---|---|---|
| `"POST"` | `"/sentiment"` | Analyzes the sentiment of a sentence. |

---

## Author

Skills Network

© IBM Corporation. All rights reserved.
