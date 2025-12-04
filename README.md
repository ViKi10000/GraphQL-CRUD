# GraphQL User Management App

A simple app for managing users,you can create,view,edit and delete users

- View a list of users
- View a single user by ID
- Create a new user
- Update an existing user
- Delete a user

## Features

- **React** for building the frontend
- **Apollo Client** for interacting with the GraphQL API
- **Apollo Server** for building the backend with GraphQL
- **Tailwind CSS** for styles
- Simple User model with fields `id`, `name`, `age`, and `isMarried`
- Full CRUD operations (Create, Read, Update, Delete)


## Installation

Follow these steps to set up the project on your local machine.

### 1. Clone this repository

```bash

cd react-graphql-fullstack
```

### 2. Backend Setup

Go to the server directory:

```bash
cd server
```

Install the required dependencies:

```bash
npm install
```

Start the server:

```bash
node server.js
```

This will run the Apollo Server on `http://localhost:4000`.

You can access the GraphQL Playground at `http://localhost:4000` to test queries and mutations.

### 3. Frontend Setup

Open a **new terminal window** and go to the client directory:

```bash
cd client
```

Install the required dependencies:

```bash
npm install
```

Start the React development server:

```bash
npm run dev
```

This will run the React app on `http://localhost:5173` (or another port if 5173 is occupied).

## How to Use

### 1. View all users

Once the app is running, the **All Users** section will display a list of users retrieved from the GraphQL server.

### 2. View a user by ID

Click on any user card to view their details. The selected user's information will appear in the **Selected User Details** panel on the right.

### 3. Create a new user

Use the **Create New User** form to add a new user. You'll need to provide:
- **Name**: The user's name
- **Age**: The user's age (number)
- **Married**: Check the box if the user is married

Click the **Create** button to add the user.

### 4. Update a user

1. Click on a user card to select it
2. The form will change to **Edit User** mode
3. Modify the information as needed
4. Click **Update** to save changes
5. Click **Cancel** to discard changes

### 5. Delete a user

1. Hover over a user card
2. Click the delete button (trash icon) that appears
3. Confirm the deletion in the dialog

## Tech Stack

- **Frontend**: React, Apollo Client, Vite, Tailwind CSS
- **Backend**: Node.js, Apollo Server, GraphQL
- **Database**: In-memory 
