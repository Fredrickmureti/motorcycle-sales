import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';

const UnreadMessages = () => {
    const { user } = useAuth();
    const [unreadMessages, setUnreadMessages] = useState([]);
    const [selectedUser, setSelectedUser] = useState(null);
    const [reply, setReply] = useState('');

    useEffect(() => {
        if (user?.role === 'admin') {
            axios.get('http://localhost:3000/chat/messages/unread')
                .then(response => setUnreadMessages(response.data.unreadMessages))
                .catch(error => console.error('Error fetching unread messages:', error));
        }
    }, [user]);

    const handleReply = async (e) => {
        e.preventDefault();
        if (reply.trim() && selectedUser) {
            try {
                await axios.post('http://localhost:3000/chat/reply', {
                    messageId: selectedUser._id,
                    reply
                });
                alert('Reply sent successfully!');
                setReply('');
                setSelectedUser(null);
                const updatedMessages = unreadMessages.map(msg => 
                    msg._id === selectedUser._id ? { ...msg, reply, status: 'replied' } : msg
                );
                setUnreadMessages(updatedMessages);
            } catch (err) {
                console.error('Error sending reply:', err);
            }
        }
    };

    const getUserMessages = (userId) => {
        return unreadMessages.filter(message => message.userId && message.userId._id === userId);
    };

    return (
        <div className="unread-messages">
            <h2>Unread Messages</h2>
            <div className="messages-list">
                {unreadMessages.map(message => (
                    <div key={message._id} className="user-messages">
                        <h4>{message.name} ({message.email})</h4>
                        <div className={`message-item ${message.status}`}>
                            <p><strong>Name:</strong> {message.name}</p>
                            <p><strong>Email:</strong> {message.email}</p>
                            <p><strong>Message:</strong> {message.message}</p>
                            {message.reply && <p><strong>Reply:</strong> {message.reply}</p>}
                            <button onClick={() => setSelectedUser(message)}>Reply</button>
                        </div>
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
        </div>
    );
};

export default UnreadMessages;