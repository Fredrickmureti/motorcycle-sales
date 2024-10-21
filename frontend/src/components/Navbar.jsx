import React, {useState} from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome, faMotorcycle, faUser, faSignInAlt, faUserPlus, faSignOutAlt, faUserShield, faUsers, faSun, faMoon, faTachometerAlt } from '@fortawesome/free-solid-svg-icons';
import './navbar.css';
import { Drawer, Button } from 'antd';
import {MenuOutlined} from '@ant-design/icons'

// Navbar component
const Navbar = () => {
    // Destructure user, darkMode, and toggleDarkMode from useAuth context
    const { user, darkMode, toggleDarkMode } = useAuth();
    const [visible, setVisible] = useState(false);

    const showDrawer = () => setVisible(true);
    const onClose = () => setVisible(false);

    return (
        // Conditional class application based on darkMode value
        <nav className={`navbar ${darkMode ? 'dark-mode' : ''}`}>
            <div className="container">
                {/* Logo linking to the home page */}
                <Link to="/" className="logo"><img className='logo-image' src='../../public/images/logo.png'/></Link>
                
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
                <button onClick={toggleDarkMode} className="dark-mode-toggle moon-sun">
                    {/* Icon changes based on darkMode value */}
                    <FontAwesomeIcon icon={darkMode ? faSun : faMoon} />
                </button>




                 {/* Drawer for Mobile Menu */}
                 <Button className="menu-button" type="primary" onClick={showDrawer}>
                    <MenuOutlined />
                </Button>
                <Drawer title="Menu" placement="right" onClose={onClose} visible={visible}>
                    <ul className="drawer-nav-links">
                        <li onClick={onClose}><Link to="/"><FontAwesomeIcon icon={faHome} /> Home</Link></li>
                        <li onClick={onClose}><Link to="/motorcycles"><FontAwesomeIcon icon={faMotorcycle} /> Motorcycles List</Link></li>
                        {user?.role === 'admin' && (
                            <>
                                <li onClick={onClose}><Link to="/add-motorcycle"><FontAwesomeIcon icon={faMotorcycle} /> Add Motorcycle</Link></li>
                                <li onClick={onClose}><Link to="/admins"><FontAwesomeIcon icon={faUserShield} /> Admins</Link></li>
                                <li onClick={onClose}><Link to="/total-users"><FontAwesomeIcon icon={faUsers} /> Total Users</Link></li>
                                <li onClick={onClose}><Link to="/admin-dashboard"><FontAwesomeIcon icon={faTachometerAlt} /> Admin Dashboard</Link></li>
                            </>
                        )}
                        {!user ? (
                            <>
                                <li onClick={onClose}><Link to="/login"><FontAwesomeIcon icon={faSignInAlt} /> Login</Link></li>
                                <li onClick={onClose}><Link to="/register"><FontAwesomeIcon icon={faUserPlus} /> Register</Link></li>
                            </>
                        ) : (
                            <>
                                <li onClick={onClose}><Link to="/profile"><FontAwesomeIcon icon={faUser} /> Profile</Link></li>
                                <li onClick={onClose}>
                                    <button onClick={() => {
                                        localStorage.removeItem('token');
                                        window.location.reload();
                                    }}>
                                        <FontAwesomeIcon icon={faSignOutAlt} /> Logout
                                    </button>
                                </li>
                            </>
                        )}
                    </ul>
                </Drawer>
            </div>
        </nav>
    );
};

export default Navbar;
