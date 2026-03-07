# 🏠 Talaash – Smart Rental Property Platform

![Buildathon](https://img.shields.io/badge/Buildathon-Project-black)
![React](https://img.shields.io/badge/Frontend-React-blue)
![Node](https://img.shields.io/badge/Backend-Node.js-green)
![MongoDB](https://img.shields.io/badge/Database-MongoDB-darkgreen)

talaash-ap is a **full-stack rental property platform** designed to simplify the process of **finding, listing, and managing rental properties**.

The platform connects **tenants, landlords, and administrators** through a modern and intuitive interface, the goal is to connect the users with the landlord, talaash is not accountable for any contract agreements.

Built for a **Buildathon @chaicode by - HiteshChaudhary**, this project demonstrates real-world **full-stack architecture, authentication systems, and role-based access control.**

---

# 🚀 Features

## 👤 Tenant

- Create an account and login
- Browse rental properties
- View detailed property pages
- Save favorite properties
- Search by location
- Responsive mobile-friendly UI
- move-in flows (in upcoming update v1.1.0)
- Tenant Verification (in upcoming update v1.1.0)

---

## 🏠 Landlord

- Register as landlord
- Add property listings
- Update property details
- Manage availability
- Track listed properties
- move-in flows (in upcoming update v1.1.0)
- Tenant Verification (in upcoming update v1.1.0)

---

## 🛠 Admin

- Admin dashboard
- View all users
- Manage landlords
- Monitor properties
- Platform moderation

---

# 🧠 System Architecture

Frontend (React + Tailwind) → Backend (Node.js + Express) → Database
(MongoDB)
Cloudinary as a Cloud storage for images data

### Frontend

- React.js
- React Router
- Context API for state management
- TailwindCSS for styling

### Backend

- Node.js
- Express.js REST API
- JWT Authentication + token rotation + session termination
- MVC architecture

### Database

- MongoDB
- Mongoose ODM

---

### to setup this project locally

```
git clone url
npm cd frontend && npm install
npm cd backend && npm install
```

---

### sample env var for backend

```JS
PORT=5000
DB_URI=
CLOUDINARY_CLOUD_NAME=
CLOUDINARY_API_KEY=
CLOUDINARY_API_SECRET=
GOOGLE_CLIENT_ID=
GOOGLE_CLIENT_SECRET=
JWT_SECRET=
ACCESS_TOKEN_EXPIRY=
REFRESH_TOKEN_EXPIRY=
REFRESH_TOKEN_EXPIRY_AT=
CLIENT=
SERVER=
```

### sample env var for frontend

```JS
VITE_BACKEND_URL=
VITE_SERVER=
```

## Get your 3rd party credentials

### Get your google oauth20 credential from google cloud consle and create you secret keys

### For cloudinary cloud, register on cloudinary and create a environment and get your api keys
