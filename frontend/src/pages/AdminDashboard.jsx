import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';
import { fetchAdmins, fetchTotalUsers } from '../services/api';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBell, faUsers, faChartLine, faUserPlus } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './adminsDashboard.css';

const AdminDashboard = () => {
    const { user } = useAuth();
    const [messages, setMessages] = useState([]);
    const [unreadMessages, setUnreadMessages] = useState([]);
    const [selectedUser, setSelectedUser] = useState(null);
    const [reply, setReply] = useState('');
    const [admins, setAdmins] = useState([]);
    const [totalUsers, setTotalUsers] = useState(0);
    const [onlineUsers, setOnlineUsers] = useState([]);
    const [pageVisits, setPageVisits] = useState(0);
    const [signUps, setSignUps] = useState(0);

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

            setPageVisits(1234);
            setSignUps(56);
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
                const audio = new Audio('/audio/success.mp3');
                audio.play();
                toast.success('Reply sent successfully!', {
                    position: 'top-right'
                });
                setReply('');
                setSelectedUser(null);
                const updatedMessages = messages.map(msg => 
                    msg._id === selectedUser._id ? { ...msg, reply, status: 'replied' } : msg
                );
                setMessages(updatedMessages);
            } catch (err) {
                console.error('Error sending reply:', err);
                const audio = new Audio('/audio/error.mp3');
                audio.play();
                toast.error('Failed to send reply.', {
                    position: 'top-right'
                });
            }
        }
    };

    const getUserMessages = (userId) => {
        return messages.filter(message => message.userId && message.userId._id === userId);
    };

    return (
        <div className="admin-dashboard">
            <h2>Admin Dashboard</h2>
            <div className="metrics">
                <div className="metric-card">
                    <FontAwesomeIcon icon={faUsers} />
                    <h3>Total Users</h3>
                    <p>{totalUsers}</p>
                </div>
                <div className="metric-card">
                    <FontAwesomeIcon icon={faUserPlus} />
                    <h3>New Sign-Ups</h3>
                    <p>{signUps}</p>
                </div>
                <div className="metric-card">
                    <FontAwesomeIcon icon={faChartLine} />
                    <h3>Page Visits</h3>
                    <p>{pageVisits}</p>
                </div>
            </div>
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
            <ToastContainer />
        </div>
    );
};

export default AdminDashboard;