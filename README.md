Here's a well-structured `README.md` file with a clickable Table of Contents:

````markdown
# Motorcycle Sales Platform

Welcome to the Motorcycle Sales Platform, a comprehensive solution for buying and selling motorcycles. This platform is built using the MERN stack (MongoDB, Express, React, Node.js) and is designed to provide a seamless experience for both buyers and sellers.

## Live Website

Check out the live website: [Motorcycle Sales Platform](https://motorcycle-arena.vercel.app)

## Table of Contents

- [Features](#features)
- [Technologies Used](#technologies-used)
- [Installation](#installation)
- [Prerequisites](#prerequisites)
  - [Clone the Repository](#clone-the-repository)
  - [Backend Setup](#backend-setup)
  - [Frontend Setup](#frontend-setup)
- [Usage](#usage)
  - [Admin Features](#admin-features)
  - [User Features](#user-features)
- [API Endpoints](#api-endpoints)
  - [Authentication](#authentication)
  - [Motorcycles](#motorcycles)
  - [Chat](#chat)
- [Environment Variables](#environment-variables)
- [Contributing](#contributing)
- [License](#license)

## Features

- **User Authentication**: Secure login and registration with JWT authentication.
- **Admin Dashboard**: Manage users, motorcycles, and view messages.
- **Motorcycle Listings**: Add, edit, delete, and view motorcycle listings.
- **Live Chat**: Real-time chat support with agents.
- **Responsive Design**: Fully responsive design for mobile and desktop devices.
- **Dark Mode**: Toggle between light and dark mode.

## Technologies Used

### Frontend:

- React
- Vite
- React Router
- Axios
- Socket.io-client
- FontAwesome

### Backend:

- Node.js
- Express
- MongoDB
- Mongoose
- Socket.io
- Cloudinary (for image uploads)
- JWT (for authentication)

## Installation

### Prerequisites

- Node.js
- MongoDB
- Cloudinary account

### Clone the Repository

```bash
git clone https://github.com/your-username/motorcycle-sales-platform.git
cd motorcycle-sales-platform
```
````

### Backend Setup

Navigate to the backend directory:

```bash
cd backend
```

Install dependencies:

```bash
npm install
```

Create a `.env` file and add the following environment variables:

```plaintext
MONGO_URL=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
CLOUDINARY_API_KEY=your_cloudinary_api_key
CLOUDINARY_API_SECRET=your_cloudinary_api_secret
```

Start the backend server:

```bash
npm start
```

### Frontend Setup

Navigate to the frontend directory:

```bash
cd ../frontend
```

Install dependencies:

```bash
npm install
```

Create a `.env` file and add the following environment variable:

```plaintext
VITE_API_URL=https://backend-api-pi-black.vercel.app
```

Start the frontend server:

```bash
npm run dev
```

## Usage

### Admin Features

- **Login as Admin**: Use the admin credentials to log in.
- **Manage Motorcycles**: Add, edit, and delete motorcycle listings.
- **Manage Users**: View total users and assign/remove admin roles.
- **View Messages**: View and reply to user messages.

### User Features

- **Register and Login**: Create an account and log in.
- **View Motorcycles**: Browse and search for motorcycles.
- **Live Chat**: Chat with agents for support.

## API Endpoints

### Authentication

- `POST /auth/register`: Register a new user.
- `POST /auth/login`: Login a user.
- `GET /auth/me`: Get current user details.

### Motorcycles

- `GET /motorcycles`: Get all motorcycles.
- `GET /motorcycles/:id`: Get a specific motorcycle by ID.
- `POST /motorcycles/add`: Add a new motorcycle (Admin only).
- `PUT /motorcycles/edit/:id`: Edit a motorcycle (Admin only).
- `DELETE /motorcycles/:id`: Delete a motorcycle (Admin only).

### Chat

- `GET /chat/availability`: Check agent availability.
- `POST /chat/message`: Save a message.
- `GET /chat/messages`: Get all messages (Admin only).
- `GET /chat/messages/unread`: Get unread messages (Admin only).
- `POST /chat/reply`: Reply to a message (Admin only).

## Environment Variables

Ensure you have the following environment variables set up in your `.env` files:

### Backend

```plaintext
MONGO_URL=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
CLOUDINARY_API_KEY=your_cloudinary_api_key
CLOUDINARY_API_SECRET=your_cloudinary_api_secret
```

### Frontend

```plaintext
VITE_API_URL=https://backend-api-pi-black.vercel.app
```

## Contributing

Contributions are welcome! Please fork the repository and create a pull request with your changes.

1. Fork the repository
2. Create a new branch (`git checkout -b feature-branch`)
3. Commit your changes (`git commit -am 'Add new feature'`)
4. Push to the branch (`git push origin feature-branch`)
5. Create a new Pull Request

```
LINK TO THE LIVE DEMO [https://motorcycle-arena.vercel.app/](https://motorcycle-arena.vercel.app)
```
