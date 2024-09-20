import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from '../src/pages/Home';
import AddMotorcycle from '../src/pages/AddMotorcycle';
import EditMotorcycle from '../src/pages/EditMotorcycle';
import MotorcycleDetail from '../src/pages/MotorcycleDetail';
import MotorcyclesList from '../src/pages/MotorcyclesList';
import Login from '../src/pages/Login';
import Register from '../src/pages/Register';
import Profile from '../src/pages/Profile';
import Navbar from '../src/components/Navbar';
import Footer from '../src/components/Footer';
import { AuthProvider, useAuth } from '../src/context/AuthContext';
import PrivateRoute from '../src/components/PrivateRoute';
import AdminList from '../src/pages/AdminList';
import TotalUsers from '../src/pages/TotalUsers';
import AdminDashboard from '../src/pages/AdminDashboard';
import UnreadMessages from '../src/pages/UnreadMessages';
import Chat from '../src/components/Chat';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const AppContent = () => {
    const { darkMode } = useAuth();

    useEffect(() => {
        if (darkMode) {
            document.body.classList.add('dark-mode');
        } else {
            document.body.classList.remove('dark-mode');
        }
    }, [darkMode]);

    return (
        <div className="App">
            <Navbar />
            <div className="container">
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/register" element={<Register />} />
                    <Route path="/profile" element={<PrivateRoute><Profile /></PrivateRoute>} />
                    <Route path="/add-motorcycle" element={<PrivateRoute><AddMotorcycle /></PrivateRoute>} />
                    <Route path="/edit-motorcycle/:id" element={<PrivateRoute><EditMotorcycle /></PrivateRoute>} />
                    <Route path="/motorcycles/:id" element={<MotorcycleDetail />} />
                    <Route path="/motorcycles" element={<MotorcyclesList />} />
                    <Route path="/admins" element={<PrivateRoute><AdminList /></PrivateRoute>} />
                    <Route path="/total-users" element={<PrivateRoute><TotalUsers /></PrivateRoute>} />
                    <Route path="/admin-dashboard" element={<PrivateRoute><AdminDashboard /></PrivateRoute>} />
                    <Route path="/admin/unread-messages" element={<PrivateRoute><UnreadMessages /></PrivateRoute>} />
                </Routes>
            </div>
            <Footer />
            
            <ToastContainer /> {/* Add ToastContainer here */}
        </div>
    );
};

const App = () => {
    return (
        <Router>
            <AuthProvider>
                <AppContent />
            </AuthProvider>
        </Router>
    );
};

export default App;