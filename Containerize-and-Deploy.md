# Containerize and Deploy the GiftLink Application

**Estimated time:** 90 minutes

## Overview

This lab containerizes and deploys the GiftLink application using a hybrid-cloud architecture.

The deployment uses:

- Kubernetes for MongoDB.
- Kubernetes for the GiftLink back-end service.
- IBM Cloud Code Engine for the React front-end service.
- IBM Cloud Container Registry for storing Docker images.

---

## Prerequisites

Before starting, confirm that:

- `giftlink-frontend` is complete.
- `giftlink-backend` is complete.
- The front end communicates correctly with the back end.
- All code has been pushed to GitHub.
- You are working in the `/home/project` directory.
- You are logged in to IBM Cloud and Skills Network Labs.

Do not commit `.env` files containing passwords, JWT secrets, or private credentials.

---

# 1. Clean Up Previous Deployments

Check for existing Kubernetes deployments:

"bash
kubectl get deployments | grep sn-labs-$USERNAME
"

If an old MongoDB deployment exists, remove it:

"bash
kubectl delete deployment mongodb-deployment
"

If the deployment is named `mongodb`, remove it with:

"bash
kubectl delete deployment mongodb
"

Remove an existing GiftLink deployment:

"bash
kubectl delete deployment giftapp
"

Check existing IBM Cloud Container Registry images:

"bash
ibmcloud cr images
"

Remove old MongoDB images if they exist:

"bash
ibmcloud cr image-rm us.icr.io/sn-labs-$USERNAME/mongodb:latest
docker rmi us.icr.io/sn-labs-$USERNAME/mongodb:latest
"

Remove old GiftLink images if they exist:

"bash
ibmcloud cr image-rm us.icr.io/sn-labs-$USERNAME/giftapp:latest
docker rmi us.icr.io/sn-labs-$USERNAME/giftapp:latest
"

Find your IBM Cloud registry namespace:

"bash
oc project
"

or:

"bash
ibmcloud cr namespaces
"

Use the namespace formatted as:

"text
sn-labs-$USERNAME
"

If the lab environment has problems:

1. Sign out of Skills Network Labs.
2. Clear the browser cache and cookies.
3. Sign in again.
4. Restart the lab.

---

# 2. Deploy MongoDB on Kubernetes

Change to the project directory:

"bash
cd /home/project
"

Create the MongoDB deployment file:

"text
deploymongo.yml
"

Add the following configuration:

"yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: mongodb-deployment
spec:
  replicas: 1
  selector:
    matchLabels:
      app: mongodb
  template:
    metadata:
      labels:
        app: mongodb
    spec:
      securityContext:
        fsGroup: 999
        seccompProfile:
          type: RuntimeDefault
      containers:
        - name: mongodb
          image: mongo:6.0
          imagePullPolicy: IfNotPresent
          ports:
            - containerPort: 27017
          volumeMounts:
            - name: datadir
              mountPath: /data/db
          securityContext:
            runAsUser: 999
            runAsNonRoot: true
            allowPrivilegeEscalation: false
            capabilities:
              drop:
                - ALL
      volumes:
        - name: datadir
          emptyDir: {}

---
apiVersion: v1
kind: Service
metadata:
  name: mongodb-service
spec:
  type: NodePort
  ports:
    - port: 27017
      targetPort: 27017
      nodePort: 30007
  selector:
    app: mongodb
"

Deploy MongoDB:

"bash
kubectl apply -f deploymongo.yml
"

If you receive a port allocation error, change:

"yaml
nodePort: 30007
"

to:

"yaml
nodePort: 30008
"

Then apply the file again.

Check the deployment:

"bash
kubectl get deployments
"

Check the service:

"bash
kubectl get services
"

The MongoDB service should be named:

"text
mongodb-service
"

---

# 3. Configure the Back-End Server

Clone the repository:

"bash
git clone <your-github-repository-link>
"

Change to the project directory:

"bash
cd fullstack-capstone-project
"

Change to the back-end directory:

"bash
cd giftlink-backend
"

Set the IBM Cloud registry namespace:

"bash
MY_NAMESPACE=$(ibmcloud cr namespaces | grep sn-labs-)
echo $MY_NAMESPACE
"

Create a Dockerfile:

"bash
touch Dockerfile
"

The back-end Dockerfile should:

- Use a Node.js base image.
- Copy the back-end files.
- Install the required dependencies.
- Expose port `3060`.
- Start the back-end server.

## Configure the Back-End Environment

Update the back-end `.env` file so MongoDB uses the Kubernetes service:

"text
mongodb://mongodb-service:27017
"

Add a JWT secret:

"text
JWT_SECRET=<your-jwt-secret>
"

If MongoDB uses authentication, include the username and password in the connection string.

Do not commit the `.env` file if it contains private credentials.

## Build and Push the Back-End Image

Build the back-end Docker image:

"bash
docker build . -t us.icr.io/$MY_NAMESPACE/giftapp
"

Push the image to IBM Cloud Container Registry:

"bash
docker push us.icr.io/$MY_NAMESPACE/giftapp
"

---

# 4. Deploy the Back End on Kubernetes

Create a file named:

"text
deployment.yml
"

Add the following configuration:

"yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: giftapp
  labels:
    app: giftapp
spec:
  replicas: 2
  selector:
    matchLabels:
      app: giftapp
  template:
    metadata:
      labels:
        app: giftapp
    spec:
      securityContext:
        seccompProfile:
          type: RuntimeDefault
      imagePullSecrets:
        - name: icr
      containers:
        - name: giftapp-container
          image: us.icr.io/<your-namespace>/giftapp
          ports:
            - containerPort: 3060
          securityContext:
            runAsNonRoot: true
            runAsUser: 1000
            allowPrivilegeEscalation: false
            capabilities:
              drop:
                - ALL

---
apiVersion: v1
kind: Service
metadata:
  name: gift-app-service
spec:
  type: NodePort
  ports:
    - port: 80
      targetPort: 3060
      protocol: TCP
  selector:
    app: giftapp
"

Replace:

"text
us.icr.io/<your-namespace>/giftapp
"

with your actual image name, for example:

"text
us.icr.io/sn-labs-yourusername/giftapp
"

Deploy the back end:

"bash
kubectl apply -f deployment.yml
"

Check the deployments:

"bash
kubectl get deployments
"

Check the pods:

"bash
kubectl get pods
"

If a pod does not start, inspect it:

"bash
kubectl describe pod <pod-name>
"

Forward the back-end port:

"bash
kubectl port-forward deployment.apps/giftapp 3060:3060
"

Keep this terminal running while testing the back end.

---

# 5. Test the Back-End Server

Open the Skills Network Toolbox:

1. Select **Skills Network Toolbox**.
2. Select **OTHER**.
3. Select **Launch Application**.
4. Enter port `3060`.
5. Launch the application.
6. Add the following path to the generated URL:

"text
/api/gifts
"

The endpoint should return the gifts as JSON.

Copy the base URL without `/api/gifts` and save it for the front-end configuration.

Example:

"text
https://<backend-url>
"

Take a screenshot showing MongoDB and the back-end deployment running.

Save it as:

"text
backend_deployment.png
"

or:

"text
backend_deployment.jpg
"

---

# 6. Create the Front-End Server

Return to the project root:

"bash
cd /home/project/fullstack-capstone-project
"

Create the front-end server directory:

"bash
mkdir giftwebsite
"

Change into the directory:

"bash
cd giftwebsite
"

Initialize a Node.js project:

"bash
npm init
"

Install Express and CORS:

"bash
npm install express cors
"

Create the server file:

"bash
touch index.js
"

Add the following code to `index.js`:

"javascript
const express = require('express');
const path = require('path');

const app = express();

app.use(express.static(path.join(__dirname, 'build')));

app.get('/', function (req, res) {
    res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

app.get('/app', function (req, res) {
    res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

app.listen(9000);
"

---

# 7. Build the React Front End

Change to the front-end directory:

"bash
cd ../giftlink-frontend
"

Open the `.env` file and update the back-end URL:

"text
REACT_APP_BACKEND_URL=<backend-base-url>
"

Replace `<backend-base-url>` with the back-end URL copied during testing.

Install the dependencies:

"bash
npm install
"

Add the following script to `package.json` immediately after the `build` script:

"json
"postbuild": "cp -r build ../giftwebsite/"
"

Build the React application:

"bash
npm run build
"

The build files should be copied into:

"text
giftwebsite/build
"

---

# 8. Containerize the Front End

Change to the `giftwebsite` directory:

"bash
cd ../giftwebsite
"

Create a Dockerfile:

"bash
touch Dockerfile
"

The front-end Dockerfile should:

- Use a Node.js base image.
- Copy `package.json`.
- Install Express and CORS.
- Copy `index.js`.
- Copy the `build` directory.
- Expose port `9000`.
- Start the Express server.

Set the IBM Cloud registry namespace:

"bash
MY_NAMESPACE=$(ibmcloud cr namespaces | grep sn-labs-)
echo $MY_NAMESPACE
"

Build the front-end image:

"bash
docker build . -t us.icr.io/$MY_NAMESPACE/giftwebsite
"

Push the image:

"bash
docker push us.icr.io/$MY_NAMESPACE/giftwebsite
"

Run the container locally:

"bash
docker run -p 9000:9000 us.icr.io/$MY_NAMESPACE/giftwebsite
"

---

# 9. Test the Front-End Server

Open the Skills Network Toolbox:

1. Select **Skills Network Toolbox**.
2. Select **OTHER**.
3. Select **Launch Application**.
4. Enter port `9000`.
5. Launch the application.
6. Add the following path to the generated URL:

"text
/home.html
"

Test the website and confirm that:

- The landing page loads.
- Gifts can be displayed.
- Registration works.
- Login works.
- Gift details load correctly.
- Searching works.

---

# 10. Deploy the Front End with IBM Cloud Code Engine

Create or start a Code Engine project.

The Code Engine environment may take several minutes to prepare.

When it is ready:

1. Open the Code Engine CLI.
2. Use the preconfigured terminal.
3. Confirm that the Code Engine project is active.
4. Confirm that the Kubernetes configuration is available.

Deploy the front-end application:

"bash
ibmcloud ce application create \
  --name giftwebsite \
  --image us.icr.io/${SN_ICR_NAMESPACE}/giftwebsite \
  --registry-secret icr-secret \
  --port 9000
"

Wait for the deployment to complete.

Copy the generated public URL and open it in a browser.

---

# 11. Test the Deployed Application

Confirm that the deployed application can:

- Display the landing page.
- Display available gifts.
- Register a new user.
- Log in a user.
- Display the logged-in username.
- Display gift details.
- Search for gifts.
- Communicate with the back-end service.

---

# 12. Assessment Requirements

Save the public URLs for:

1. The back-end application running on Kubernetes.
2. The front-end application running on IBM Cloud Code Engine.

The browser address bar must be visible in every screenshot.

The URL in the address bar must match the URL submitted for evaluation.

## AI-Graded Submission

Take a screenshot of the deployed landing page.

Save it as:

"text
deployed_landingpage.png
"

## Peer-Graded Submission

Take the following screenshots:

| Screenshot | File Name |
|---|---|
| Deployed landing page | `deployed_landingpage.png` |
| Main page showing gifts | `deployed_mainpage.png` |
| Registration form before submission | `registration.png` |
| Logged-in home page | `deployed_loggedin.png` |
| Gift details page | `deployed_gift_detail.png` |
| Search results for older living-room gifts | `deployed_search_gift.png` |

---

# 13. Verification Checklist

## MongoDB

- [ ] MongoDB deployment was created.
- [ ] MongoDB service is running.
- [ ] The service is named `mongodb-service`.
- [ ] MongoDB is accessible from the back end.

## Back End

- [ ] The back-end Dockerfile was created.
- [ ] The MongoDB URL uses `mongodb-service`.
- [ ] `JWT_SECRET` is configured.
- [ ] The Docker image was built.
- [ ] The image was pushed to IBM Cloud Container Registry.
- [ ] The Kubernetes deployment was created.
- [ ] Back-end pods are running.
- [ ] Port `3060` was forwarded.
- [ ] `/api/gifts` returns gift data.
- [ ] The back-end screenshot was captured.

## Front End

- [ ] The `giftwebsite` directory was created.
- [ ] Express and CORS were installed.
- [ ] `index.js` was created.
- [ ] `REACT_APP_BACKEND_URL` points to the back end.
- [ ] The `postbuild` script was added.
- [ ] The React application was built.
- [ ] The front-end Dockerfile was created.
- [ ] The Docker image was built.
- [ ] The image was pushed to IBM Cloud Container Registry.
- [ ] The container was tested on port `9000`.
- [ ] The front end was deployed to IBM Cloud Code Engine.
- [ ] All required screenshots were captured.

---

## Summary

This lab containerizes and deploys the GiftLink application using a hybrid-cloud architecture.

MongoDB and the back-end service run on Kubernetes, while the front-end application runs on IBM Cloud Code Engine.

The completed application allows users to:

- View the landing page.
- Register an account.
- Log in.
- View available gifts.
- View gift details.
- Search for gifts.
- Use the complete GiftLink application through the deployed public URL.

---

## Authors

- Lavanya T. S.
- Upkar Lidder

© IBM Corporation. All rights reserved.
