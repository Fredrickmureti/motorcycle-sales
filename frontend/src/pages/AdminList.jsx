import React, { useState, useEffect } from 'react';
import { fetchAdmins, fetchTotalUsers, assignAdminRole, removeAdminRole } from '../services/api';
import { useAuth } from '../context/AuthContext';

const AdminList = () => {
    const { user } = useAuth();
    const [admins, setAdmins] = useState([]);
    const [users, setUsers] = useState([]); // Fetch all users
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true); // Add loading state

    useEffect(() => {
        const getAdmins = async () => {
            try {
                const data = await fetchAdmins();
                setAdmins(data.admins || []); // Ensure data is an array
            } catch (err) {
                setError('Error fetching admins: ' + err.message);
            }
        };

        const getUsers = async () => {
            try {
                const data = await fetchTotalUsers();
                setUsers(data.users || []); // Ensure data is an array
            } catch (err) {
                setError('Error fetching users: ' + err.message);
            }
        };

        Promise.all([getAdmins(), getUsers()]).finally(() => setLoading(false)); // Set loading to false after fetching data
    }, []);

    const handleAssignAdmin = async (id) => {
        try {
            const updatedAdmin = await assignAdminRole(id);
            setAdmins((prevAdmins) => [...prevAdmins, updatedAdmin]);
            setUsers((prevUsers) => prevUsers.map(user => user._id === id ? updatedAdmin : user));
        } catch (err) {
            console.error('Error assigning admin role:', err);
        }
    };

    const handleRemoveAdmin = async (id) => {
        try {
            const updatedAdmin = await removeAdminRole(id);
            setAdmins((prevAdmins) => prevAdmins.filter(admin => admin._id !== id));
            setUsers((prevUsers) => prevUsers.map(user => user._id === id ? updatedAdmin : user));
        } catch (err) {
            console.error('Error removing admin role:', err);
            alert('Failed to remove admin. Maybe you are trying to remove a protected admin.');
        }
    };

    if (loading) {
        return <div>Loading...</div>; // Show loading state
    }

    if (error) {
        return <div>{error}</div>; // Show error message
    }

    return (
        <div className="admin-list">
            <h2>Admins ({admins.length})</h2>
            <ul>
                {admins.map((admin) => (
                    <li key={admin._id}>
                        <img src={admin.profilePicture} alt="Admin" className="admin-picture" />
                        <span>{admin.name} ({admin.email})</span>
                        {user._id !== admin._id && admin.email !== 'doe@gmail.com' && admin.email !== 'fredrickmureti612@gmail.com' && (
                            <>
                                <button onClick={() => handleRemoveAdmin(admin._id)}>Remove Admin</button>
                            </>
                        )}
                    </li>
                ))}
            </ul>
            <h2>All Users ({users.length})</h2>
            <ul>
                {users.map((user) => (
                    <li key={user._id}>
                        <img src={user.profilePicture} alt="User" className="user-picture" />
                        <span>{user.name} ({user.email})</span>
                        {!admins.some(admin => admin._id === user._id) && (
                            <>
                                <button onClick={() => handleAssignAdmin(user._id)}>Assign Admin</button>
                            </>
                        )}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default AdminList;