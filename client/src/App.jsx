import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import PrivateRoute from "./components/PrivateRoute";
import Dashboard from "./pages/Dashboard"; 
import CreateGroup from "./pages/CreateGroup";

function App() {
    return (
        <Router>
            <Routes>
                <Route path = "/login" element = {<Login />} />
                <Route path = "/signnup" element = {<Signup />} />
                <Route path = "/dashboard" 
                element = {
                    <PrivateRoute>
                        <Dashboard />
                    </PrivateRoute>
                }
                />
                <Route path = "/create-group" 
                element = {
                    <PrivateRoute>
                        <CreateGroup />
                    </PrivateRoute>
                }
                />
                <Route path = "/groups" 
                element = {
                    <PrivateRoute>
                        <GroupList />
                    </PrivateRoute>
                }
                />
                <Route path = "/group/:id" 
                element = {
                    <PrivateRoute>
                        <GroupDashboard />
                    </PrivateRoute>
                }
                />
            </Routes>
        </Router>
    )
}