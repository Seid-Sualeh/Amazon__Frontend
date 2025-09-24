🛒 Amazon Clone

A full-stack Amazon Clone built using React.js, Node.js, and Firebase. This project replicates the core features of Amazon such as user authentication, product browsing, shopping cart, and checkout system.


---

🚀 Tech Stack

Frontend: React.js (Hooks, Context API, React Router, CSS/Bootstrap for styling)

Backend: Node.js & Express.js

Database & Auth: Firebase

Payment Integration: Stripe (optional)



---

✨ Features

✅ User Authentication (Sign up / Login / Logout with Firebase Auth)
✅ Browse Products (fetched dynamically)
✅ Add / Remove products from cart
✅ Subtotal calculation in cart
✅ Checkout page
✅ Responsive design (mobile & desktop friendly)
✅ Deployment ready (Firebase / Render / Vercel)


---

📂 Project Structure

amazon-clone/
│── public/
│── src/
│   ├── components/    # Reusable UI components
│   ├── pages/         # Page components (Home, Checkout, Login)
│   ├── context/       # Context API (Data layer)
│   ├── firebase.js    # Firebase config
│   ├── App.js         # Main App
│── backend/           # Node.js backend (optional for Stripe API)
│── package.json
│── README.md


---

⚙️ Installation & Setup

1. Clone the repository

git clone https://github.com/Seid-Sualeh/amazon-clone.git
cd amazon-clone


2. Install dependencies

npm install


3. Setup Firebase

Go to Firebase Console

Create a new project

Enable Authentication (Email/Password)

Create a Firestore database

Copy config keys to src/firebase.js



4. Start development server

npm start


5.Start backend server

cd amazon backend
npm install
npm run dev




---

🖥️ Deployment

Frontend: Deploy to Netlify 

Backend: Deploy to Render 





👨‍💻 Author

Seid Sualeh Mohammed

🔗 linkedin.com/in/seid-sualeh  

💻 Passionate Full-Stack Developer

