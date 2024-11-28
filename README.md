# Code Review Tool

![Hero Illustration](https://res.cloudinary.com/dq60qoglh/image/upload/v1731575575/wxx9vo4cduhezab2uc10.png)

## Table of Contents

- [Introduction](#introduction)
- [Features](#features)
- [Screenshots](#screenshots)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
  - [Environment Variables](#environment-variables)
  - [Running the Application](#running-the-application)
- [Project Structure](#project-structure)
- [API Routes](#api-routes)
  - [Snippets](#snippets)
  - [Comments](#comments)
  - [Suggestions](#suggestions)
  - [Likes](#likes)
- [Technologies Used](#technologies-used)
- [Contributing](#contributing)
- [License](#license)

## Introduction

Welcome to the **Code Review Tool**, a comprehensive platform built with Next.js that allows developers to share, comment, and suggest changes to code snippets. This tool facilitates collaborative code reviews, enabling users to enhance code quality through constructive feedback and peer suggestions.

![Upload Illustration](https://res.cloudinary.com/dq60qoglh/image/upload/v1731575575/ww2j5rpdn56sl8c8og5v.png)


## Features

- **User Authentication**: Secure login and registration using NextAuth.js.
- **Code Snippet Management**: Upload, view, and manage code snippets with syntax highlighting.
- **Line-specific Comments**: Comment on specific lines within a code snippet for precise feedback.
- **Suggest Changes**: Propose modifications to code snippets, which authors can approve or reject.
- **Like System**: Users can like their favorite code snippets to show appreciation.
- **Real-time Updates**: Comments and suggestions update in real-time without page refreshes.
- **Responsive Design**: Optimized for both desktop and mobile devices using Tailwind CSS.
- **Notifications**: Users receive notifications for comments, suggestions, and likes on their snippets.

## Screenshots

### Uploading a Code Snippet

![Upload Illustration](https://res.cloudinary.com/dq60qoglh/image/upload/v1731575575/ww2j5rpdn56sl8c8og5v.png)

### Suggesting Changes

![Suggestion Illustration](https://res.cloudinary.com/dq60qoglh/image/upload/v1731575575/wxx9vo4cduhezab2uc10.png)

### Commenting on Code

![Comment Illustration](https://res.cloudinary.com/dq60qoglh/image/upload/v1731575573/uso24ue9uq0jsdycx9ng.png)

## Getting Started

Follow these instructions to set up and run the project on your local machine.

### Prerequisites

- **Node.js** (v14 or later)
- **npm** or **yarn**
- **MongoDB** instance (local or cloud-based, e.g., MongoDB Atlas)

### Installation

1. **Clone the Repository**

   ```bash
   git clone https://github.com/your-username/code-review-tool.git
   cd code-review-tool
   ```

2. **Install Dependencies**

   Using npm:

   ```bash
   npm install
   ```

   Or using yarn:

   ```bash
   yarn install
   ```

### Environment Variables

Create a `.env.local` file in the root directory and add the following environment variables:

```env
# MongoDB Connection URI
MONGODB_URI=your_mongodb_connection_string

# NextAuth.js Secret
NEXTAUTH_SECRET=your_nextauth_secret

# NextAuth.js Provider (e.g., GitHub)
NEXTAUTH_URL=http://localhost:3000

# Email Address
EMAIL_USER=email address

# Email Password with 2 factor auth integrated
EMAIL_PASS= Less Secure App Email Password
```

**Note**: Replace `your_mongodb_connection_string`, `your_nextauth_secret`, `email address` and `Less Secure App Email Password` with your actual MongoDB URI, a secure secret key, email address and app email passsword respectively.

### Running the Application

Start the development server:

Using npm:

```bash
npm run dev
```

Or using yarn:

```bash
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser to view the application.

## Project Structure

Here's an overview of the project's structure:

```
code-review-tool/
├── public/
│   ├── hero-illustration.png
│   ├── upload_illustration.png
│   ├── suggestion_illustration.png
│   └── comment_illustration.png
├── src/
│   ├── app/
│   │   ├── api/
│   │   │   ├── snippets/
│   │   │   │   ├── [id]/
│   │   │   │   │   ├── comments/
│   │   │   │   │   │   └── route.ts
│   │   │   │   │   ├── suggestions/
│   │   │   │   │   │   └── route.ts
│   │   │   │   │   └── like/
│   │   │   │   │       └── route.ts
│   │   │   │   ├── route.ts
│   │   │   │   └── ...
│   │   │   └── ...
│   │   ├── explore/
│   │   │   └── page.tsx
│   │   ├── upload/
│   │   │   └── page.tsx
│   │   └── ...
│   ├── components/
│   │   ├── CodeSnippet.tsx
│   │   ├── Navbar.tsx
│   │   └── ...
│   ├── lib/
│   │   ├── mongodb.ts
│   │   ├── auth.ts
│   │   └── ...
│   ├── models/
│   │   ├── CodeSnippet.ts
│   │   ├── Comment.ts
│   │   ├── Suggestion.ts
│   │   └── User.ts
│   ├── pages/
│   │   └── ...
│   └── styles/
│       └── globals.css
├── .env.local
├── package.json
├── tsconfig.json
└── README.md
```

## API Routes

The application leverages Next.js API routes to handle backend operations. Below is a comprehensive overview of the available API endpoints.

### Snippets

- **GET `/api/snippets`**

  - **Description**: Fetches all code snippets.
  - **Response**:
    ```json
    [
      {
        "id": "snippet_id",
        "code": "console.log('Hello, World!');",
        "language": "javascript",
        "title": "Hello World Example",
        "description": "A simple hello world snippet.",
        "likes": ["user_id_1", "user_id_2"],
        "author": {
          "id": "author_id",
          "name": "Author Name",
          "avatar": null
        }
      },
      ...
    ]
    ```

- **POST `/api/snippets`**

  - **Description**: Creates a new code snippet.
  - **Request Body**:
    ```json
    {
      "title": "Snippet Title",
      "code": "console.log('Hello, World!');",
      "language": "javascript",
      "description": "Optional description."
    }
    ```
  - **Response**:
    ```json
    {
      "success": true,
      "snippet": {
        "_id": "snippet_id",
        "title": "Snippet Title",
        "code": "console.log('Hello, World!');",
        "language": "javascript",
        "description": "Optional description.",
        "author": "author_id",
        "comments": [],
        "suggestions": [],
        "likes": [],
        "createdAt": "timestamp",
        "updatedAt": "timestamp"
      }
    }
    ```

### Comments

- **GET `/api/snippets/[id]/comments`**

  - **Description**: Retrieves all comments for a specific code snippet.
  - **Response**:
    ```json
    [
      {
        "_id": "comment_id",
        "content": "Great snippet!",
        "lineNumber": 1,
        "author": {
          "fullName": "User Name"
        }
      },
      ...
    ]
    ```

- **POST `/api/snippets/[id]/comments`**

  - **Description**: Adds a new comment to a specific line in a code snippet.
  - **Request Body**:
    ```json
    {
      "content": "Consider using const instead of let.",
      "lineNumber": 2
    }
    ```
  - **Response**:
    ```json
    {
      "success": true,
      "comment": {
        "_id": "comment_id",
        "content": "Consider using const instead of let.",
        "lineNumber": 2,
        "author": {
          "fullName": "User Name"
        }
      }
    }
    ```

### Suggestions

- **GET `/api/snippets/[id]/suggestions`**

  - **Description**: Retrieves all suggestions for a specific code snippet.
  - **Response**:
    ```json
    [
      {
        "_id": "suggestion_id",
        "content": "Replace var with let for block scoping.",
        "author": {
          "fullName": "User Name"
        }
      },
      ...
    ]
    ```

- **POST `/api/snippets/[id]/suggestions`**

  - **Description**: Adds a new suggestion to a code snippet.
  - **Request Body**:
    ```json
    {
      "content": "Replace var with let for block scoping."
    }
    ```
  - **Response**:
    ```json
    {
      "success": true,
      "suggestion": {
        "_id": "suggestion_id",
        "content": "Replace var with let for block scoping.",
        "author": {
          "fullName": "User Name"
        }
      }
    }
    ```

- **PATCH `/api/snippets/[id]/suggestions/[suggestionId]`**

  - **Description**: Approves or rejects a suggestion.
  - **Request Body**:
    ```json
    {
      "action": "approve" // or "reject"
    }
    ```
  - **Response**:
    ```json
    {
      "success": true,
      "hasLiked": false,
      "likesCount": 10
    }
    ```

### Likes

- **POST `/api/snippets/[id]/like`**

  - **Description**: Toggles the like status of a code snippet for the authenticated user.
  - **Response**:
    ```json
    {
      "success": true,
      "hasLiked": true, // Indicates the new like status
      "likesCount": 11 // Updated like count
    }
    ```

## Technologies Used

- **Frontend**:
  - [Next.js](https://nextjs.org/) - React framework for server-side rendering and static site generation.
  - [React](https://reactjs.org/) - JavaScript library for building user interfaces.
  - [Tailwind CSS](https://tailwindcss.com/) - Utility-first CSS framework for rapid UI development.
  - [React Icons](https://react-icons.github.io/react-icons/) - Popular icons for React projects.
  - [Axios](https://axios-http.com/) - Promise-based HTTP client for making API requests.

- **Backend**:
  - [Next.js API Routes](https://nextjs.org/docs/api-routes/introduction) - Serverless functions for backend logic.
  - [MongoDB](https://www.mongodb.com/) - NoSQL database for storing data.
  - [Mongoose](https://mongoosejs.com/) - ODM for MongoDB.
  - [NextAuth.js](https://next-auth.js.org/) - Authentication for Next.js applications.

- **Other**:
  - [TypeScript](https://www.typescriptlang.org/) - Typed superset of JavaScript for better code quality.

## Contributing

Contributions are welcome! Please follow these steps to contribute:

1. **Fork the Repository**

2. **Create a New Branch**

   ```bash
   git checkout -b feature/YourFeatureName
   ```

3. **Make Your Changes**

4. **Commit Your Changes**

   ```bash
   git commit -m "Add some feature"
   ```

5. **Push to the Branch**

   ```bash
   git push origin feature/YourFeatureName
   ```

6. **Open a Pull Request**

Please ensure your code follows the project's coding standards and includes relevant tests.

## License

This project is licensed under the [Apache License 2.0](https://github.com/adedayoniyi/nextjs_code_review_tool/blob/main/LICENSE.md).

---
