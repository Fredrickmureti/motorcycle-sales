import React, { useState, useEffect } from 'react';
import { fetchTotalUsers } from '../services/api';

const TotalUsers = () => {
    const [users, setUsers] = useState([]);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true); // Add loading state

    useEffect(() => {
        const getTotalUsers = async () => {
            try {
                const data = await fetchTotalUsers();
                setUsers(data.users || []); // Ensure data is an array
            } catch (err) {
                setError('Error fetching total users: ' + err.message);
            } finally {
                setLoading(false); // Set loading to false after fetching data
            }
        };

        getTotalUsers();
    }, []);

    if (loading) {
        return <div>Loading...</div>; // Show loading state
    }

    if (error) {
        return <div>{error}</div>; // Show error message
    }

    return (
        <div className="total-users">
            <h2>Total Users</h2>
            <p>{users.length} users have signed up.</p>
            <ul>
                {users.map((user) => (
                    <li key={user._id}>
                        <strong>{user.name}</strong> - {user.email}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default TotalUsers;