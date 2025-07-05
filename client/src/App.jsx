import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import Login from "./pages/Login";
import PrivateRoute from "./components/PrivateRoute";
import Dashboard from "./pages/Dashboard"; 
import CreateGroup from "./pages/CreateGroup";
import Signup from "./pages/Signup";
import GroupList from "./pages/GroupList";
import GroupDashboard from "./pages/GroupDashboard";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />

        <Route
          path="/"
          element={
            <PrivateRoute>
              <Layout />
            </PrivateRoute>
          }
        >
          <Route index element={<Dashboard />} />
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="create-group" element={<CreateGroup />} />
          <Route path="groups" element={<GroupList />} />
          <Route path="group/:id" element={<GroupDashboard />} />
        </Route>

        <Route path="*" element={<p className="p-6">404 — Page Not Found</p>} />
      </Routes>
    </Router>
  );
}

export default App; 