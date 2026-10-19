# ClassNotion Backend

ClassNotion is a full-stack ed-tech platform built with React, Express, Prisma and PostgreSQL. The backend of this platform is developed with Express.js, providing a robust API for managing courses, users, payments, and other features of an educational platform.

## Table of Contents
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Getting Started](#getting-started)
- [API Documentation](#api-documentation)
- [Authentication](#authentication)
- [Payment Integration](#payment-integration)
- [Folder Structure](#folder-structure)
- [Contributing](#contributing)
- [License](#license)

## Features

- **User authentication and authorization** (JWT-based).
- **Role-based access control** for students and instructors.
- **Course management**: Create, edit, and delete courses (for instructors).
- **Student enrollment and progress tracking**.
- **Payment integration** using Razorpay.
- **Review and rating system** for courses.
- **Secure password handling** using Bcrypt.
- RESTful APIs for all backend functionalities.

## Tech Stack

- **Backend**: Express.js, Node.js
- **Database**: PostgreSQL (Neon) with Prisma ORM
- **Authentication**: JWT, Bcrypt
- **Payment Gateway**: Razorpay
- **Other tools**: express-fileupload (for file uploads), Nodemailer (for sending emails)

For Render deployment, automatic migrations, and Neon configuration, see [backend/DEPLOYMENT.md](backend/DEPLOYMENT.md). Existing Atlas data is not copied automatically.

## Getting Started

To run the backend server locally, follow these steps:

### Prerequisites

- Node.js 22.12+ (22 or 24)
- A PostgreSQL database (Neon supported)
- Razorpay account for payment integration (optional)

### Installation

1. Clone the repository:

    ```bash
    git clone https://github.com/yourusername/classnotion-backend.git
    ```

2. Navigate to the project directory:

    ```bash
    cd ClassNotion/backend
    ```

3. Install dependencies:

    ```bash
    npm install
    ```

4. Create a `.env` file in the `backend` directory and add the following environment variables:

    ```bash
    PORT=4000

    DATABASE_URL=your_neon_postgresql_connection_string
    JWT_SECRET=your_jwt_secret

    MAIL_HOST=yoursmtp
    MAIL_USER=examplegmail.com
    MAIL_PASS=mailpassword

    FOLDER_NAME=upload_files_in_folder

    CLOUD_NAME=cloudinary_name
    API_KEY=cloudinary_API_key
    API_SECRET=clodinary_secret

    RAZORPAY_KEY=your_razorpay_key_id
    RAZORPAY_SECRET=your_razorpay_key_secret
    ```

5. Start the development server:

    ```bash
    npm run dev
    ```

Your server should now be running on `http://localhost:5000`.

## API Documentation

The backend exposes a set of RESTful APIs for interacting with the ClassNotion platform.

- **Authentication**:
    - `POST /api/auth/register`: Register a new user.
    - `POST /api/auth/login`: Log in as an existing user.
    
- **Courses**:
    - `GET /api/courses`: Get a list of all courses.
    - `POST /api/courses`: Create a new course (Instructor only).
    - `PUT /api/courses/:id`: Edit a course (Instructor only).
    - `DELETE /api/courses/:id`: Delete a course (Instructor only).

- **Payments**:
    - `POST /api/payments/order`: Create a new payment order using Razorpay.
    - `POST /api/payments/verify`: Verify the payment status.

For a full list of available endpoints and their descriptions, please refer to the API documentation in the `docs/` folder.

## Authentication

ClassNotion uses **JWT (JSON Web Tokens)** for authentication and authorization. The tokens are signed with a secret key and are used to protect routes from unauthorized access.

- Users must provide a valid token to access protected routes.
- Role-based access control is enforced to restrict actions like creating or editing courses to instructors.

## Payment Integration

The platform uses **Razorpay** for payment processing. Instructors can sell their courses, and students can purchase them securely. Payment status is verified using the Razorpay API, ensuring secure and reliable transactions.

## Folder Structure

```text
backend/
├── config/            # Prisma client, environment and service configuration
├── controllers/       # API handlers using native Prisma queries
├── prisma/
│   ├── schema.prisma  # PostgreSQL models and relationships
│   ├── migrations/    # Versioned SQL applied at startup
│   └── seed.js        # Idempotent starter categories
├── routes/            # Express API routes
├── middlewares/       # JWT and role checks
├── scripts/           # Deployment database setup
├── test/              # Unit and PostgreSQL API integration tests
├── utils/             # Response serialization, mail and media helpers
└── index.js           # HTTP server and health check
```
