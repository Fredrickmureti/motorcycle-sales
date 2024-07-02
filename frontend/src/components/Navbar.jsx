import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome, faMotorcycle, faUser, faSignInAlt, faUserPlus, faSignOutAlt, faUserShield, faUsers, faSun, faMoon, faTachometerAlt } from '@fortawesome/free-solid-svg-icons';

const Navbar = () => {
    const { user, darkMode, toggleDarkMode } = useAuth();

    return (
        <nav className={`navbar ${darkMode ? 'dark-mode' : ''}`}>
            <div className="container">
                <Link to="/" className="logo">Motorcycle Sales</Link>
                <ul className="nav-links">
                    <li><Link to="/"><FontAwesomeIcon icon={faHome} /> Home</Link></li>
                    <li><Link to="/motorcycles"><FontAwesomeIcon icon={faMotorcycle} /> Motorcycles List</Link></li>
                    {user?.role === 'admin' && (
                        <>
                            <li><Link to="/add-motorcycle"><FontAwesomeIcon icon={faMotorcycle} /> Add Motorcycle</Link></li>
                            <li><Link to="/admins"><FontAwesomeIcon icon={faUserShield} /> Admins</Link></li>
                            <li><Link to="/total-users"><FontAwesomeIcon icon={faUsers} /> Total Users</Link></li>
                            <li><Link to="/admin-dashboard"><FontAwesomeIcon icon={faTachometerAlt} /> Admin Dashboard</Link></li>
                        </>
                    )}
                    {!user ? (
                        <>
                            <li><Link to="/login"><FontAwesomeIcon icon={faSignInAlt} /> Login</Link></li>
                            <li><Link to="/register"><FontAwesomeIcon icon={faUserPlus} /> Register</Link></li>
                        </>
                    ) : (
                        <>
                            <li><Link to="/profile"><FontAwesomeIcon icon={faUser} /> Profile</Link></li>
                            <li><button onClick={() => {
                                localStorage.removeItem('token');
                                window.location.reload();
                            }}><FontAwesomeIcon icon={faSignOutAlt} /> Logout</button></li>
                        </>
                    )}
                </ul>
                <button onClick={toggleDarkMode} className="dark-mode-toggle">
                    <FontAwesomeIcon icon={darkMode ? faSun : faMoon} />
                </button>
            </div>
        </nav>
    );
};

export default Navbar;