import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';
import { fetchAdmins, fetchTotalUsers } from '../services/api';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBell } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';

const AdminDashboard = () => {
    const { user } = useAuth();
    const [messages, setMessages] = useState([]);
    const [unreadMessages, setUnreadMessages] = useState([]);
    const [selectedUser, setSelectedUser] = useState(null);
    const [reply, setReply] = useState('');
    const [admins, setAdmins] = useState([]);
    const [totalUsers, setTotalUsers] = useState(0);
    const [onlineUsers, setOnlineUsers] = useState([]);

    useEffect(() => {
        if (user?.role === 'admin') {
            axios.get('https://backend-api-pi-black.vercel.app/chat/messages')
                .then(response => setMessages(response.data.messages))
                .catch(error => console.error('Error fetching messages:', error));

            axios.get('https://backend-api-pi-black.vercel.app/chat/messages/unread')
                .then(response => setUnreadMessages(response.data.unreadMessages))
                .catch(error => console.error('Error fetching unread messages:', error));

            axios.get('https://backend-api-pi-black.vercel.app/chat/online-status')
                .then(response => setOnlineUsers(response.data.users))
                .catch(error => console.error('Error fetching online users:', error));

            fetchAdmins()
                .then(data => setAdmins(data))
                .catch(error => console.error('Error fetching admins:', error));

            fetchTotalUsers()
                .then(data => setTotalUsers(data.totalUsers))
                .catch(error => console.error('Error fetching total users:', error));
        }
    }, [user]);

    const handleReply = async (e) => {
        e.preventDefault();
        if (reply.trim() && selectedUser) {
            try {
                await axios.post('https://backend-api-pi-black.vercel.app/chat/reply', {
                    messageId: selectedUser._id,
                    reply
                });
                alert('Reply sent successfully!');
                setReply('');
                setSelectedUser(null);
                const updatedMessages = messages.map(msg => 
                    msg._id === selectedUser._id ? { ...msg, reply, status: 'replied' } : msg
                );
                setMessages(updatedMessages);
            } catch (err) {
                console.error('Error sending reply:', err);
            }
        }
    };

    const getUserMessages = (userId) => {
        return messages.filter(message => message.userId && message.userId._id === userId);
    };

    return (
        <div className="admin-dashboard">
            <h2>Admin Dashboard</h2>
            <div className="notification-icon">
                <Link to="/admin/unread-messages">
                    <FontAwesomeIcon icon={faBell} />
                    {unreadMessages.length > 0 && <span className="notification-count">{unreadMessages.length}</span>}
                </Link>
            </div>
            <div className="messages-list">
                <h3>User Messages</h3>
                {onlineUsers.map(user => (
                    <div key={user._id} className="user-messages">
                        <h4>{user.name} ({user.email})</h4>
                        {getUserMessages(user._id).map(message => (
                            <div key={message._id} className={`message-item ${message.status}`}>
                                <p><strong>Name:</strong> {message.name}</p>
                                <p><strong>Email:</strong> {message.email}</p>
                                <p><strong>Message:</strong> {message.message}</p>
                                {message.reply && <p><strong>Reply:</strong> {message.reply}</p>}
                                <button onClick={() => setSelectedUser(message)}>Reply</button>
                            </div>
                        ))}
                    </div>
                ))}
            </div>
            {selectedUser && (
                <div className="reply-form">
                    <h3>Reply to Message</h3>
                    <form onSubmit={handleReply}>
                        <textarea
                            value={reply}
                            onChange={(e) => setReply(e.target.value)}
                            placeholder="Type your reply..."
                            required
                        />
                        <button type="submit">Send Reply</button>
                    </form>
                </div>
            )}
            <div className="admin-stats">
                <h3>Total Users: {totalUsers}</h3>
                <h3>Admins</h3>
                <ul>
                    {admins.map(admin => (
                        <li key={admin._id}>{admin.name} ({admin.email})</li>
                    ))}
                </ul>
                <h3>Unread Messages</h3>
                <ul>
                    {unreadMessages.map(message => (
                        <li key={message._id}>{message.name}: {message.message}</li>
                    ))}
                </ul>
                <h3>Online Users</h3>
                <ul>
                    {onlineUsers.map(user => (
                        <li key={user._id}>{user.name} ({user.email})</li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default AdminDashboard;