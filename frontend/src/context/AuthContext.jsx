import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const API_URL = 'https://backend-api-pi-black.vercel.app';
const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true); // Add loading state
    const [darkMode, setDarkMode] = useState(localStorage.getItem('darkMode') === 'true');
    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
            axios.get(`${API_URL}/auth/me`)
                .then((response) => {
                    setUser(response.data);
                    setLoading(false); // Set loading to false after fetching user data
                })
                .catch(() => {
                    localStorage.removeItem('token');
                    delete axios.defaults.headers.common['Authorization'];
                    setLoading(false); // Set loading to false even if there's an error
                    navigate('/login');
                });
        } else {
            setLoading(false); // Set loading to false if there's no token
        }
    }, [navigate]);

    const toggleDarkMode = () => {
        setDarkMode((prevMode) => {
            localStorage.setItem('darkMode', !prevMode);
            return !prevMode;
        });
    };

    const login = async (email, password) => {
        try {
            const response = await axios.post(`${API_URL}/auth/login`, { email, password });
            localStorage.setItem('token', response.data.token);
            axios.defaults.headers.common['Authorization'] = `Bearer ${response.data.token}`;
            setUser(response.data.user);
            navigate('/');
        } catch (err) {
            console.error('Login failed:', err.message);
            alert('Invalid email or password');
        }
    };

    const register = async (formData) => {
        try {
            const response = await axios.post(`${API_URL}/auth/register`, formData);
            localStorage.setItem('token', response.data.token);
            axios.defaults.headers.common['Authorization'] = `Bearer ${response.data.token}`;
            setUser(response.data.user);
            navigate('/');
        } catch (err) {
            console.error('Registration failed:', err.message);
            alert('Registration failed');
        }
    };

    const updateUserProfile = async (id, formData) => {
        try {
            const response = await axios.put(`${API_URL}/auth/update/${id}`, formData, {
                headers: { 'Content-Type': 'multipart/form-data' },
            });
            setUser(response.data.user);
            return response.data.user;
        } catch (err) {
            console.error('Update profile failed:', err.message);
            alert('Failed to update profile');
            throw err;
        }
    };

    if (loading) {
        return <div>Loading...</div>; // Show loading state while fetching user data
    }

    return (
        <AuthContext.Provider value={{ user, setUser, login, register, updateUserProfile, darkMode, toggleDarkMode }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);