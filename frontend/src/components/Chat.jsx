import React, { useEffect, useState } from 'react';
import { io } from 'socket.io-client';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCommentDots, faPaperPlane, faTimes, faArrowRight, faUser, faEnvelope, faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';

const socket = io('http://localhost:3000'); // Replace with your server URL

const Chat = () => {
    const { user } = useAuth();
    const [isOpen, setIsOpen] = useState(false);
    const [message, setMessage] = useState('');
    const [messages, setMessages] = useState([]);
    const [step, setStep] = useState('welcome');
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [agentsAvailable, setAgentsAvailable] = useState(true);

    useEffect(() => {
        socket.on('chat message', (msg) => {
            if (msg.userId === user?.id || user?.role === 'admin') {
                setMessages((prevMessages) => [...prevMessages, msg]);
            }
        });

        socket.on('chat reply', (msg) => {
            if (msg.userId === user?.id) {
                setMessages((prevMessages) => [...prevMessages, msg]);
            }
        });

        axios.get('http://localhost:3000/chat/availability')
            .then(response => setAgentsAvailable(response.data.available))
            .catch(error => console.error('Error fetching agent availability:', error));

        return () => {
            socket.off('chat message');
            socket.off('chat reply');
        };
    }, [user]);

    const sendMessage = (e) => {
        e.preventDefault();
        if (message.trim()) {
            const msg = { name: user?.name || name, message, userId: user?.id || null };
            socket.emit('chat message', msg);
            setMessages((prevMessages) => [...prevMessages, msg]);
            setMessage('');
        }
    };

    const startChat = (e) => {
        e.preventDefault();
        if (name.trim() && email.trim()) {
            if (!agentsAvailable) {
                axios.post('http://localhost:3000/chat/message', { name, email, message: 'User initiated chat' })
                    .then(() => {
                        alert('Message sent! Our agents will get back to you via email.');
                    })
                    .catch(error => console.error('Error saving message:', error));
            }
            setStep('chat');
        }
    };

    const proceedWithoutDetails = () => {
        setStep('chat');
    };

    const goBack = () => {
        setStep('welcome');
    };

    return (
        <div>
            <div className={`chat-icon ${isOpen ? 'open' : ''}`} onClick={() => setIsOpen(!isOpen)}>
                <FontAwesomeIcon icon={faCommentDots} />
                {isOpen && (
                    <div className="chat-dots">
                        <span>.</span>
                        <span>.</span>
                        <span>.</span>
                    </div>
                )}
            </div>
            {isOpen && (
                <div className="chat-container">
                    <div className="chat-header">
                        {step === 'chat' && <FontAwesomeIcon icon={faArrowLeft} onClick={goBack} />}
                        <h3>Welcome to Live Chat</h3>
                        <FontAwesomeIcon icon={faTimes} onClick={() => setIsOpen(false)} />
                    </div>
                    {step === 'welcome' && (
                        <div className="chat-welcome">
                            {agentsAvailable ? (
                                <>
                                    <p>Welcome! Please fill in the form below before starting the chat.</p>
                                    <form onSubmit={startChat}>
                                        <div className="form-group">
                                            <FontAwesomeIcon icon={faUser} />
                                            <input
                                                type="text"
                                                placeholder="Name"
                                                value={name}
                                                onChange={(e) => setName(e.target.value)}
                                                required
                                            />
                                        </div>
                                        <div className="form-group">
                                            <FontAwesomeIcon icon={faEnvelope} />
                                            <input
                                                type="email"
                                                placeholder="E-mail"
                                                value={email}
                                                onChange={(e) => setEmail(e.target.value)}
                                                required
                                            />
                                        </div>
                                        <button type="submit" className="chat-start-button">Start the chat</button>
                                    </form>
                                    <button onClick={proceedWithoutDetails} className="chat-now-button">
                                        Proceed without details <FontAwesomeIcon icon={faArrowRight} />
                                    </button>
                                </>
                            ) : (
                                <div className="chat-unavailable">
                                    <FontAwesomeIcon icon={faCommentDots} />
                                    <p>Our agents are not available right now, but you can still send a message.</p>
                                    <button onClick={() => setStep('form')} className="chat-now-button">
                                        Chat now <FontAwesomeIcon icon={faArrowRight} />
                                    </button>
                                </div>
                            )}
                        </div>
                    )}
                    {step === 'form' && (
                        <div className="chat-form">
                            <FontAwesomeIcon icon={faUser} />
                            <p>Welcome to our Live Chat! Please fill in the form below before starting the chat.</p>
                            <form onSubmit={startChat}>
                                <div className="form-group">
                                    <FontAwesomeIcon icon={faUser} />
                                    <input
                                        type="text"
                                        placeholder="Name"
                                        value={name}
                                        onChange={(e) => setName(e.target.value)}
                                        required
                                    />
                                </div>
                                <div className="form-group">
                                    <FontAwesomeIcon icon={faEnvelope} />
                                    <input
                                        type="email"
                                        placeholder="E-mail"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        required
                                    />
                                </div>
                                <button type="submit" className="chat-start-button">Start the chat</button>
                            </form>
                        </div>
                    )}
                    {step === 'chat' && (
                        <div className="chat-content">
                            <div className="chat-messages">
                                {messages.map((msg, index) => (
                                    <div key={index} className="chat-message">
                                        <strong>{msg.name}:</strong> {msg.message}
                                    </div>
                                ))}
                            </div>
                            <form onSubmit={sendMessage} className="chat-form">
                                <input
                                    type="text"
                                    value={message}
                                    onChange={(e) => setMessage(e.target.value)}
                                    placeholder="Type your message..."
                                    className="chat-input"
                                />
                                <button type="submit" className="chat-send-button"><FontAwesomeIcon icon={faPaperPlane} /></button>
                            </form>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
};

export default Chat;