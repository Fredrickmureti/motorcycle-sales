
```markdown
# Motorcycle Sales Platform

A comprehensive platform for selling motorcycles, built using the MERN stack (MongoDB, Express, React, Node.js). This project allows motorcycle owners to upload motorcycles with images and descriptions, and potential buyers to browse, inquire, add to favorites, and create accounts to receive updates.

## Table of Contents

- [Features](#features)
- [Technologies](#technologies)
- [Installation](#installation)
  - [Prerequisites](#prerequisites)
  - [Backend Setup](#backend-setup)
  - [Frontend Setup](#frontend-setup)
- [Usage](#usage)
- [API Endpoints](#api-endpoints)
  - [Authentication](#authentication)
  - [Motorcycles](#motorcycles)
- [Contributing](#contributing)
- [License](#license)
- [Contact](#contact)

## Features

- User Authentication (Register, Login)
- Motorcycle Management (Add, View, Inquire)
- Image Upload using Cloudinary
- Favorites Management
- Real-time Notifications
- Secure Routes and JWT Authentication

## Technologies

- MongoDB
- Express.js
- React.js
- Node.js
- Cloudinary
- JWT (JSON Web Tokens)
- Axios
- Multer

## Installation

### Prerequisites

- Node.js
- MongoDB
- Cloudinary Account

### Backend Setup

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/motorcycle-sales.git
   cd motorcycle-sales/backend
   ```

2. Install backend dependencies:
   ```bash
   npm install
   ```

3. Create a `.env` file in the `backend` directory and add the following variables:
   ```
   PORT=5000
   MONGO_URI=your_mongodb_connection_string
   JWT_SECRET=your_jwt_secret
   CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
   CLOUDINARY_API_KEY=your_cloudinary_api_key
   CLOUDINARY_API_SECRET=your_cloudinary_api_secret
   ```

4. Start the backend server:
   ```bash
   npm start
   ```

### Frontend Setup

1. Navigate to the `frontend` directory:
   ```bash
   cd ../frontend
   ```

2. Install frontend dependencies:
   ```bash
   npm install
   ```

3. Create a `.env` file in the `frontend` directory and add the following variable:
   ```
   REACT_APP_API_URL=http://localhost:5000
   ```

4. Start the frontend development server:
   ```bash
   npm start
   ```

## Usage

- Register a new user account.
- Login with your credentials.
- Add a new motorcycle listing with images and descriptions.
- Browse motorcycles on the home page.
- View details of a specific motorcycle.
- Add motorcycles to your favorites.
- Receive real-time notifications for new listings.

## API Endpoints

### Authentication

- `POST /auth/register`: Register a new user
- `POST /auth/login`: Login an existing user

### Motorcycles

- `POST /motorcycles/add`: Add a new motorcycle
- `GET /motorcycles`: Get all motorcycles
- `GET /motorcycles/:id`: Get a specific motorcycle by ID

## Contributing

Contributions are welcome! Please fork the repository and create a pull request.

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request


## Contact

Fredrick Mureti - frredrickmureti612@gmail.com

Project Link: [https://github.com/Fredrickmureti/motorcycle-sales](https://github.com/Fredrickmureti/motorcycle-sales)
```
