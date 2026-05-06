# Food4All - Food Donation Management Platform

A full-stack web application that connects food donors (restaurants, individuals, event organizers) with NGOs and shelters to reduce food wastage and feed those in need.

## Tech Stack

- **Frontend:** React.js, Vite, Tailwind CSS
- **Backend:** Node.js, Express.js
- **Database:** MongoDB (Mongoose)
- **Authentication:** JWT-based

## Features

### User Roles
- **Donor** – Create donations, view history, track status
- **NGO** – View available donations, request food, mark as collected
- **Admin** – View users, donations, statistics, block/unblock users

### Core Functionality
- JWT authentication (register, login)
- Role-based access control
- Donation CRUD operations
- Request management
- Admin dashboard with charts
- Responsive UI (mobile + desktop)
- RESTful API structure

## Project Structure

```
Food4All/
├── backend/                 # Node.js + Express API
│   ├── controllers/         # Route handlers
│   ├── models/              # Mongoose schemas
│   ├── routes/              # API routes
│   ├── middleware/          # Auth, error handling
│   ├── scripts/             # createAdmin script
│   ├── server.js
│   └── package.json
├── frontend/                # React + Vite app
│   ├── src/
│   │   ├── api/             # Axios, services
│   │   ├── components/      # Reusable components
│   │   ├── context/         # Auth context
│   │   ├── pages/           # Page components
│   │   ├── App.jsx
│   │   └── main.jsx
│   └── package.json
└── README.md
```

## Setup Instructions

### Prerequisites
- Node.js (v18 or higher)
- MongoDB (local or Atlas)
- npm or yarn

### 1. Clone & Install Dependencies

```bash
cd Food4All

# Backend
cd backend
npm install

# Frontend
cd ../frontend
npm install
```

### 2. Environment Configuration

**Backend:**
```bash
cd backend
cp .env.example .env
# Edit .env with your MongoDB URI, JWT_SECRET, etc.
```

**Frontend:** No .env needed for local dev (Vite proxy handles API)

### 3. Create Admin User (Optional)

Admin users cannot register through the app. Create one manually:

```bash
cd backend
node scripts/createAdmin.js
# Enter name, email, password when prompted
```

### 4. Run the Application

**Terminal 1 – Backend:**
```bash
cd backend
npm run dev
# Server runs on http://localhost:5000
```

**Terminal 2 – Frontend:**
```bash
cd frontend
npm run dev
# App runs on http://localhost:5173
```

### 5. Access the App

- Open **http://localhost:5173** in your browser
- Register as Donor or NGO
- Login with your credentials
- For Admin: create admin via script and login at `/login`

## API Routes

### Auth
- `POST /api/auth/register` – Register (donor/ngo)
- `POST /api/auth/login` – Login

### Donations
- `POST /api/donations` – Create donation (donor)
- `GET /api/donations` – List donations
- `GET /api/donations/:id` – Get single donation
- `PUT /api/donations/:id` – Update donation
- `DELETE /api/donations/:id` – Delete donation (donor/admin)

### Requests
- `POST /api/requests` – Create request (ngo)
- `GET /api/requests` – List requests
- `PUT /api/requests/:id/status` – Update status (ngo)

### Admin
- `GET /api/admin/stats` – Dashboard statistics
- `GET /api/admin/users` – List users
- `PUT /api/admin/users/:id/block` – Block/unblock user

## Database Models

### User
- name, email, password, role (donor|ngo|admin), phone, location, isBlocked

### Donation
- title, description, quantity, location, pickupTime, contactInfo, donorId, status

### Request
- donationId, ngoId, status

## Production Deployment

1. Set production environment variables (MONGODB_URI, JWT_SECRET, FRONTEND_URL)
2. Build frontend: `cd frontend && npm run build`
3. Serve frontend build (e.g., Nginx, Vercel, Netlify)
4. Run backend on a Node host (e.g., Railway, Render, Heroku)
5. Ensure CORS allows your frontend domain

## License

ISC
