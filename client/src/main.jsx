import React from "react"; 
import './index.css'; 
import ReactDOM from "react-dom/client"; 
import App from "./App"; 
import { AuthProvider } from "./context/AuthContext.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
    <React.StrictMode>
        <AuthProvider>
            <App />
        </AuthProvider>
    </React.StrictMode>
);