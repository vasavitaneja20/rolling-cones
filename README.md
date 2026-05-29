# The Rolling Cones

A full-stack real-time waffle ordering platform for **The Rolling Cones**, built using the MERN stack with Razorpay payment integration and live order tracking using Socket.IO.

Customers can scan a QR code, browse sweet and savory waffles, place orders online, pay using UPI/cards through Razorpay, and track their order status live.

---

# Features

## Customer Features

- QR-based ordering flow
- Mobile responsive UI
- Browse sweet & savory waffle menu
- Add/remove items from cart
- Dynamic order summary
- Razorpay payment gateway integration
- Online payment support (UPI, cards, wallets)
- Real-time order tracking
- Live order status updates

---

## Staff Features

- Staff login system
- View incoming orders
- Update order status:
  - Placed
  - In Progress
  - Ready
  - Completed
- Live synchronization using Socket.IO

---

# Tech Stack

## Frontend
- React.js
- React Router DOM
- Axios
- Socket.IO Client
- CSS

## Backend
- Node.js
- Express.js
- MongoDB
- Mongoose
- Socket.IO
- Razorpay API
- JWT Authentication

---

# Project Architecture

Customer
   ↓
Frontend (React)
   ↓
Backend API (Express)
   ↓
MongoDB Database

Live Updates:
Socket.IO ↔ Frontend ↔ Backend

Payments:
Razorpay Checkout ↔ Backend Verification


# Folder Structure

```text
root/
│
├── client/
|   ├── public/
│   ├── src/
│   │   ├── api/
│   │   ├── components/
│   │   ├── context/
│   │   ├── pages/
│   │   ├── sockets/
│   │   ├── styles/
│   │   └── App.jsx
│   └── index.html
│   └── package.json
│
├── server/
|   ├── src/
│   |   ├── config/
│   |   ├── controllers/
│   |   ├── middleware/
│   |   ├── models/
│   |   ├── routes/
│   |   ├── utils/
│   |   ├── server.js
│   └── package.json
│
└── README.md
```

---

# Environment Variables

## Backend (`server/.env`)

```env
PORT=5000

MONGO_URI=your_mongodb_connection_string

JWT_SECRET=your_jwt_secret

RAZORPAY_KEY_ID=your_razorpay_key

RAZORPAY_KEY_SECRET=your_razorpay_secret
```

---

## Frontend (`client/.env`)

```env
VITE_RAZORPAY_KEY_ID=your_razorpay_key
```

---

# Installation

## Clone Repository

```bash
git clone https://github.com/your-username/the-rolling-cones.git

cd the-rolling-cones
```

---

# Backend Setup

```bash
cd server

npm install
```

Create `.env` file inside `server/`.

Start backend:

```bash
npm run dev
```

---

# Frontend Setup

```bash
cd client

npm install
```

Create `.env` file inside `client/`.

Start frontend:

```bash
npm run dev
```

---

# Razorpay Setup

1. Create Razorpay account
2. Generate API keys
3. Add keys to frontend and backend `.env`
4. Use test mode during development

Razorpay Dashboard:

[https://dashboard.razorpay.com/](https://dashboard.razorpay.com/)


---

# API Endpoints

## Menu Routes

| Method | Route       | Description        |
| ------ | ----------- | ------------------ |
| GET    | `/api/menu` | Get all menu items |
| POST   | `/api/menu` | Add menu item      |

---

## Order Routes

| Method | Route                               | Description           |
| ------ | ----------------------------------- | --------------------- |
| POST   | `/api/orders`                       | Create order          |
| GET    | `/api/orders/:id`                   | Get order             |
| PUT    | `/api/orders/:id/status`            | Update order status   |
| POST   | `/api/orders/create-razorpay-order` | Create Razorpay order |
| POST   | `/api/orders/verify-payment`        | Verify payment        |

---

# Order Lifecycle

```text
Customer Places Order
        ↓
Payment Completed
        ↓
Order Created
        ↓
Staff Receives Order
        ↓
Preparing
        ↓
Ready for Pickup
        ↓
Completed
```

---

# Contributors

* Ashmit Arora
* Vasavi Taneja

---

# License

This project is licensed under the MIT License.

```
```
