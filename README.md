# Smart Split — Expense Splitting + Reimbursement Tracker
A full-stack web app for splitting group expenses, tracking reimbursements, and settling up with minimal hassle — perfect for roommates, travel squads, or group projects.

---

## Current Features
- Add and categorize shared expenses  
- Automatically split costs between group members  
- Real-time balance tracking and summaries  
- Reimbursement tracking with payment status  
- Visualize group expenses and individual shares  

---

## Upcoming Enhancements (planned)
- Email or push notifications for reimbursements  
- Deployment via Vercel or Render  
- Import/export data for budgeting tools 

---

## Getting Started

1. Clone this repo  
2. Backend Setup (Express + MongoDB): 
   ```bash
   cd server
   npm install
   npm run dev
3. Make sure to create a .env file in the server/ folder with:
   ```ini
   MONGO_URI=your_mongodb_connection_string
   PORT=8080
4. Make sure to create a .env file in the client/ folder with:
   ```ini
   VITE_API_BASE=http://localhost:8080

