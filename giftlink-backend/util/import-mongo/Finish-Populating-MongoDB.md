# Finish Populating MongoDB

## Course Information

- **Course:** IBM Full-Stack JavaScript Certificate
- **Project:** GiftLink Full-Stack Capstone Project
- **Lab:** Finish Populating MongoDB
- **Estimated Duration:** 60 minutes

---

## Lab Overview

In this lab, you will clone the GiftLink project repository, initialize MongoDB, import gift data, and validate the imported documents using MongoDB Shell.

You will use Node.js scripts and MongoDB commands to populate the `giftdb` database with gift records.

---

## Objectives

By completing this lab, you will learn how to:

- Clone a GitHub repository.
- Initialize MongoDB in the Cloud IDE.
- Configure MongoDB using environment variables.
- Install Node.js dependencies.
- Import JSON data into MongoDB.
- Use Node.js to insert documents into a database.
- Use `mongosh` to inspect and validate MongoDB data.
- Confirm that 16 gift documents were imported successfully.
- Prepare evidence for the final project assessment.

---

## Security Information

The Cloud IDE environment is temporary and shared.

Follow these security practices:

- Do not store personal information in the lab environment.
- Do not commit passwords or access tokens to GitHub.
- Do not share your MongoDB password.
- Do not commit the `.env` file.
- Store sensitive values in environment variables.
- Use a GitHub Personal Access Token when Git requests a password.
- Push completed changes to your own GitHub repository because the lab environment may not be available later.

---

# Prerequisites

Before starting, make sure that:

- You have a GitHub account.
- You created the `fullstack-capstone-project` repository.
- You have access to the Cloud IDE.
- You have a GitHub Personal Access Token if required.
- Your token has the permissions needed to push to your repository.
- You can access the Skills Network Toolbox.

If you need a Personal Access Token, follow the instructions provided by the course.

> Never include your Personal Access Token or MongoDB password in this README or in your GitHub repository.

---

# Step 1: Clone Your Repository

If you already cloned the repository during the previous lab, you may skip this step.

## Tasks

1. Open your GitHub account.
2. Locate the repository created from the GiftLink template.
3. Confirm that the repository is named:

"fullstack-capstone-project"

4. Open a terminal in the Cloud IDE.
5. Clone your repository using Git.
6. Confirm that the repository files have been downloaded.
7. Confirm that the gift data file exists.

## Clone Command

Replace the repository URL with your own GitHub repository URL:

"git clone <repository-url>"

## Confirm the Project Files

After cloning the repository, navigate into the project directory:

"cd /home/project/fullstack-capstone-project"

Confirm that the backend and gift data files are available.

The gift data file should be located at:

"giftlink-backend/util/import-mongo/gifts.json"

---

# Step 2: Initialize MongoDB

MongoDB must be running before the gift data can be imported.

## Tasks

1. Open the **Skills Network Toolbox**.
2. Open the **Databases** category.
3. Select **MongoDB**.
4. Select **Create**.
5. Wait for the MongoDB service to start.
6. Open the connection information tab.
7. Copy the following values:
   - `MONGO_HOST`
   - `MONGO_PORT`
   - `MONGO_PASSWORD`

The generated host, port, and password may change each time the temporary environment is recreated.

## Required Evidence

Take a screenshot of the MongoDB terminal output as requested by the course.

Save the screenshot in a safe location because it may be required for the final project submission.

---

# Step 3: Import the Gifts Data

The gift data is stored in the following file:

"giftlink-backend/util/import-mongo/gifts.json"

The file contains gift documents with attributes such as:

- `id`
- `name`
- `category`
- `condition`
- `posted_by`
- `zipcode`
- `date_added`
- `age_days`
- `age_years`
- `description`
- `image`

## Example Gift Document

The following example represents the structure of a gift document:

"_id: ObjectId('65c166b57361698a5cdd82cc')  
id: '875'  
name: 'Lamp'  
category: 'Kitchen'  
condition: 'New'  
posted_by: '26872'  
zipcode: '94805'  
date_added: 1667520000  
age_days: 400  
age_years: 1.1  
description: 'A charming lamp that is ready to illuminate a new home.'  
image: '/images/lamp.jpeg'"

Do not modify the `gifts.json` file unless the lab instructions specifically require it.

## Navigate to the Import Directory

Open a terminal and change to the MongoDB import directory:

"cd /home/project/fullstack-capstone-project/giftlink-backend/util/import-mongo"

## Create the Environment File

Copy the sample environment file and rename it to `.env`.

The `.env` file must not be committed to GitHub because it contains sensitive connection information.

Use the following command:

"cp .env.sample .env"

Open the `.env` file and configure the MongoDB connection.

The username should remain:

"root"

The connection format is:

"MONGO_URL=mongodb://root:<mongodb-password>@<mongodb-host>:<mongodb-port>"

Replace the placeholder values with the MongoDB connection details provided by the Skills Network Toolbox.

## Install Dependencies

Install the required Node.js packages:

"npm install"

## Start the Import Program

Run the Node.js import program:

"npm start"

If the import is successful, the terminal should confirm that 16 documents were inserted.

Expected result:

"Inserted documents: 16"

This confirms that the gift data was imported into MongoDB successfully.

---

# Step 4: Validate the Gift Data Import

After importing the data, use `mongosh` to verify that the database contains the expected records.

`mongosh` is the official MongoDB Shell. It allows you to:

- View databases.
- Select a database.
- View collections.
- Count documents.
- Query documents.
- Perform database administration tasks.

## Open MongoDB Shell

1. Open the MongoDB tab in the Cloud IDE.
2. Open the MongoDB terminal.
3. Start or access `mongosh`.

## View Available Databases

Use the following command:

"show databases"

You should see a database named:

"giftdb"

## Select the GiftLink Database

Switch to the GiftLink database:

"use giftdb"

## View the Collections

Display the collections in the database:

"show collections"

You should see the following collection:

"gifts"

## Count the Gift Documents

Count the number of documents in the `gifts` collection:

"db.gifts.countDocuments()"

Expected result:

"16"

This confirms that 16 gift documents were imported.

## Retrieve the First Two Gifts

Retrieve two documents from the collection:

"db.gifts.find().limit(2)"

## Find Gift ID 429

Search for the gift with the ID `429`:

"db.gifts.find({ id: '429' })"

The result should contain a gift similar to the following:

"_id: ObjectId('65c166b57361698a5cdd82da')  
id: '429'  
name: 'Side Table'  
category: 'Living Room'  
condition: 'Older'  
posted_by: '23789'  
zipcode: '94102'  
date_added: 1664928900  
age_days: 1100  
age_years: 3.01  
description: 'This side table has been a convenient spot for lamps and books. It is still functional but has some scratches.'  
image: '/images/side-table.jpeg'"

---

# Important Files

| File | Purpose |
|---|---|
| `giftlink-backend/util/import-mongo/gifts.json` | Contains the gift data to import |
| `giftlink-backend/util/import-mongo/.env.sample` | Provides the environment variable template |
| `giftlink-backend/util/import-mongo/.env` | Stores local MongoDB connection details |
| `giftlink-backend/util/import-mongo/package.json` | Contains the import script and dependencies |

---

# Important Commands

## Clone the Repository

"git clone <repository-url>"

## Navigate to the Project

"cd /home/project/fullstack-capstone-project"

## Navigate to the MongoDB Import Directory

"cd /home/project/fullstack-capstone-project/giftlink-backend/util/import-mongo"

## Create the Environment File

"cp .env.sample .env"

## Install Dependencies

"npm install"

## Import the Gift Data

"npm start"

## Show Databases

"show databases"

## Select the GiftLink Database

"use giftdb"

## Show Collections

"show collections"

## Count Gift Documents

"db.gifts.countDocuments()"

## Retrieve Two Gifts

"db.gifts.find().limit(2)"

## Find Gift ID 429

"db.gifts.find({ id: '429' })"

---

# Assessment Requirements

## Option 1: AI-Graded Submission

1. Copy the terminal output showing that 16 documents were inserted.
2. Save the output in a text file.
3. Name the file:

"inserted_items"

4. Submit the file with the final project submission.

The output should include:

"Inserted documents: 16"

## Option 2: Peer-Graded Submission

1. Take a screenshot of the terminal output.
2. Confirm that the output shows 16 inserted documents.
3. Save the screenshot using one of the following filenames:

"inserted_items.png"

or

"inserted_items.jpeg"

4. Submit the screenshot with the peer assignment.

---

# Completion Checklist

Before finishing the lab, confirm that:

- [ ] The `fullstack-capstone-project` repository was cloned.
- [ ] The `gifts.json` file is available.
- [ ] MongoDB was initialized successfully.
- [ ] The MongoDB connection information was copied.
- [ ] The `.env` file was created locally.
- [ ] The MongoDB password and host were configured correctly.
- [ ] The `.env` file was not committed to GitHub.
- [ ] The required npm packages were installed.
- [ ] The import program was executed successfully.
- [ ] The terminal displayed `Inserted documents: 16`.
- [ ] The `giftdb` database exists.
- [ ] The `gifts` collection exists.
- [ ] The collection contains 16 documents.
- [ ] The first two gift documents were retrieved successfully.
- [ ] Gift ID `429` was found successfully.
- [ ] The required assessment evidence was saved.

---

# Security Checklist

- [ ] Do not commit `.env` to GitHub.
- [ ] Do not commit MongoDB passwords.
- [ ] Do not commit GitHub Personal Access Tokens.
- [ ] Do not share terminal screenshots containing passwords.
- [ ] Use environment variables for sensitive configuration.
- [ ] Check Git status before pushing changes.

Check the repository status using:

"git status"

---

# Summary

In this lab, you cloned the GiftLink repository, initialized MongoDB, configured the database connection, installed the required Node.js dependencies, and imported gift data.

You also used `mongosh` to verify that:

- The `giftdb` database exists.
- The `gifts` collection exists.
- The collection contains 16 documents.
- Gift ID `429` can be retrieved successfully.

This lab demonstrates how Node.js applications interact with MongoDB and prepares the GiftLink project for future backend and frontend development.

---

## Next Steps

Continue practicing MongoDB commands in the Cloud IDE.

Useful commands to explore include:

"db.gifts.find()"

"db.gifts.find({ category: 'Kitchen' })"

"db.gifts.find({ condition: 'New' })"

"db.gifts.find().sort({ name: 1 })"

"db.gifts.find().limit(5)"

"db.gifts.countDocuments({ category: 'Living Room' })"