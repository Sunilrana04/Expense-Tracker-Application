# Expense Tracker

A simple **Expense Tracker** web application built with **MERN stack** (MongoDB, Express.js, React, Node.js).  
It allows users to track their daily expenses, add new expenses, delete them, and view a list of all expenses.  

💻 **Live Demo:** [Expense Tracker Live](https://expense-tracker-tan-theta.vercel.app)

---

## Features

- User Authentication (Login / Signup) using JWT & Cookies  
- Add, View, and Delete Expenses  
- Persistent login across browser refresh  
- Dashboard shows user's name after login  
- Responsive UI using **React + Tailwind CSS**  
- Clean and modern interface  

---

## Screenshots

**Login Page**  
![Login Page](./screenshots/login.png)

**Dashboard / Expense List**  
![Dashboard](./screenshots/dashboard.png)

**Add Expense Form**  
![Add Expense](./screenshots/add-expense.png)

---

## Tech Stack

**Frontend:**  
- React.js  
- Tailwind CSS  
- Axios  
- React Router DOM  

**Backend:**  
- Node.js  
- Express.js  
- MongoDB (via Mongoose)  
- JWT Authentication  

**Other Tools:**  
- Vercel (Frontend Deployment)  
- Postman (API Testing)  

---

## Installation

1. Clone the repository:

```bash
git clone https://github.com/<your-username>/expense-tracker.git
cd expense-tracker
Install dependencies for backend:

bash
Copy code
cd Backend
npm install
Install dependencies for frontend:

bash
Copy code
cd ../Frontend
npm install
Create a .env file in Backend:

env
Copy code
PORT=8000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret_key
Usage
Start Backend server:

bash
Copy code
cd Backend
npm run dev
Start Frontend server:

bash
Copy code
cd Frontend
npm start
Open in browser:
http://localhost:5173 (or default port)

Folder Structure
pgsql
Copy code
expense-tracker/
│
├── Backend/
│   ├── controllers/
│   ├── middlewares/
│   ├── models/
│   ├── routes/
│   ├── server.js
│   └── package.json
│
├── Frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── context/
│   │   ├── pages/
│   │   ├── api.js
│   │   └── App.jsx
│   └── package.json
│
└── README.md
