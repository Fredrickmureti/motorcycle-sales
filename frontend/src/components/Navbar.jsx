import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { motion } from 'framer-motion';
import { 
    Drawer, Button, Menu, Dropdown, Avatar, Badge, Space 
} from 'antd';
import { 
    MenuOutlined,
    HomeOutlined,
    CarOutlined,
    UserOutlined,
    LoginOutlined,
    UserAddOutlined,
    LogoutOutlined,
    SafetyCertificateOutlined,
    TeamOutlined,
    DashboardOutlined,
    SunOutlined,
    MoonOutlined
} from '@ant-design/icons';
import './navbar.css';

const Navbar = () => {
    const { user, darkMode, toggleDarkMode } = useAuth();
    const [visible, setVisible] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const location = useLocation();

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 50);
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const userMenu = (
        <Menu>
            <Menu.Item key="profile" icon={<UserOutlined />}>
                <Link to="/profile">Profile</Link>
            </Menu.Item>
            <Menu.Divider />
            <Menu.Item 
                key="logout" 
                icon={<LogoutOutlined />}
                onClick={() => {
                    localStorage.removeItem('token');
                    window.location.reload();
                }}
            >
                Logout
            </Menu.Item>
        </Menu>
    );

    const navItems = [
        { key: '/', icon: <HomeOutlined />, label: 'Home' },
        { key: '/motorcycles', icon: <CarOutlined />, label: 'Motorcycles' },
        ...(user?.role === 'admin' ? [
            { key: '/add-motorcycle', icon: <CarOutlined />, label: 'Add Motorcycle' },
            { key: '/admins', icon: <SafetyCertificateOutlined />, label: 'Admins' },
            { key: '/total-users', icon: <TeamOutlined />, label: 'Users' },
            { key: '/admin-dashboard', icon: <DashboardOutlined />, label: 'Dashboard' }
        ] : [])
    ];

    return (
        <motion.nav 
            className={`navbar ${scrolled ? 'scrolled' : ''} ${darkMode ? 'dark' : ''}`}
            initial={{ y: -100 }}
            animate={{ y: 0 }}
            transition={{ duration: 0.5 }}
        >
            <div className="navbar-container">
                <Link to="/" className="logo">
                    <motion.img 
                        src="/images/logo.png" 
                        alt="Logo"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                    />
                </Link>

                <div className="nav-links desktop-nav">
                    {navItems.map(item => (
                        <Link 
                            key={item.key} 
                            to={item.key}
                            className={location.pathname === item.key ? 'active' : ''}
                        >
                            <Space>
                                {item.icon}
                                {item.label}
                            </Space>
                        </Link>
                    ))}
                </div>

                <div className="nav-actions">
                    <Button
                        type="text"
                        icon={darkMode ? <SunOutlined /> : <MoonOutlined />}
                        onClick={toggleDarkMode}
                        className="theme-toggle"
                        style={{
                            backgroundColor: darkMode ? '#f0f0f0' : '#333',
                            color: darkMode ? '#333' : '#f0f0f0',
                            borderRadius: '50%',
                            width: '40px',
                            height: '40px',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center'
                        }}
                    />

                    {user ? (
                        <Dropdown overlay={userMenu} trigger={['click']}>
                            <Space className="user-menu">
                                <Badge dot={true}>
                                    <Avatar icon={<UserOutlined />} />
                                </Badge>
                            </Space>
                        </Dropdown>
                    ) : (
                        <Space className="auth-buttons">
                            <Link to="/login">
                                <Button type="text" icon={<LoginOutlined />}>
                                    Login
                                </Button>
                            </Link>
                            <Link to="/register">
                                <Button type="primary" icon={<UserAddOutlined />}>
                                    Register
                                </Button>
                            </Link>
                        </Space>
                    )}

                    <Button
                        className="mobile-menu-button"
                        type="text"
                        icon={<MenuOutlined />}
                        onClick={() => setVisible(true)}
                    />
                </div>

                <Drawer
                    title="Menu"
                    placement="right"
                    onClose={() => setVisible(false)}
                    visible={visible}
                    className={darkMode ? 'dark' : ''}
                >
                    <Menu mode="vertical" selectedKeys={[location.pathname]}>
                        {navItems.map(item => (
                            <Menu.Item key={item.key} icon={item.icon}>
                                <Link to={item.key}>{item.label}</Link>
                            </Menu.Item>
                        ))}
                    </Menu>
                </Drawer>
            </div>
        </motion.nav>
    );
};

export default Navbar;
