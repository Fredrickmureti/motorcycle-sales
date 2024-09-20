import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome, faMotorcycle, faUser, faSignInAlt, faUserPlus, faSignOutAlt, faUserShield, faUsers, faSun, faMoon, faTachometerAlt } from '@fortawesome/free-solid-svg-icons';
import './navbar.css';

// Navbar component
const Navbar = () => {
    // Destructure user, darkMode, and toggleDarkMode from useAuth context
    const { user, darkMode, toggleDarkMode } = useAuth();

    return (
        // Conditional class application based on darkMode value
        <nav className={`navbar ${darkMode ? 'dark-mode' : ''}`}>
            <div className="container">
                {/* Logo linking to the home page */}
                <Link to="/" className="logo"><img className='logo-image' src='/images/BIKE_LOGO.png' /></Link>
                
                {/* Navigation links */}
                <ul className="nav-links">
                    {/* Home link */}
                    <li><Link to="/"><FontAwesomeIcon icon={faHome} /> Home</Link></li>
                    
                    {/* Motorcycles List link */}
                    <li><Link to="/motorcycles"><FontAwesomeIcon icon={faMotorcycle} /> Motorcycles List</Link></li>
                    
                    {/* Conditional rendering for admin links */}
                    {user?.role === 'admin' && (
                        <>
                            {/* Link to add a new motorcycle */}
                            <li><Link to="/add-motorcycle"><FontAwesomeIcon icon={faMotorcycle} /> Add Motorcycle</Link></li>
                            
                            {/* Link to admin management page */}
                            <li><Link to="/admins"><FontAwesomeIcon icon={faUserShield} /> Admins</Link></li>
                            
                            {/* Link to total users page */}
                            <li><Link to="/total-users"><FontAwesomeIcon icon={faUsers} /> Total Users</Link></li>
                            
                            {/* Link to admin dashboard */}
                            <li><Link to="/admin-dashboard"><FontAwesomeIcon icon={faTachometerAlt} /> Admin Dashboard</Link></li>
                        </>
                    )}

                    {/* Conditional rendering for authentication links */}
                    {!user ? (
                        <>
                            {/* Login link */}
                            <li><Link to="/login"><FontAwesomeIcon icon={faSignInAlt} /> Login</Link></li>
                            
                            {/* Register link */}
                            <li><Link to="/register"><FontAwesomeIcon icon={faUserPlus} /> Register</Link></li>
                        </>
                    ) : (
                        <>
                            {/* Profile link */}
                            <li><Link to="/profile"><FontAwesomeIcon icon={faUser} /> Profile</Link></li>
                            
                            {/* Logout button */}
                            <li>
                                <button onClick={() => {
                                    // Remove token from localStorage and reload the page to log out
                                    localStorage.removeItem('token');
                                    window.location.reload();
                                }}>
                                    <FontAwesomeIcon icon={faSignOutAlt} /> Logout
                                </button>
                            </li>
                        </>
                    )}
                </ul>
                
                {/* Dark mode toggle button */}
                <button onClick={toggleDarkMode} className="dark-mode-toggle">
                    {/* Icon changes based on darkMode value */}
                    <FontAwesomeIcon icon={darkMode ? faSun : faMoon} />
                </button>
            </div>
        </nav>
    );
};

export default Navbar;
