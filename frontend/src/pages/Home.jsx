import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
    Input, Button, Typography, Card, Row, Col, Space 
} from 'antd';
import { 
    SearchOutlined, 
    CarOutlined, 
    SafetyCertificateOutlined,
    DollarOutlined,
    CheckCircleOutlined
} from '@ant-design/icons';
import { fetchMotorcycles } from '../services/api';
import HERO from '../assets/HERO.jpg';
import './Home.css';

const { Title, Paragraph } = Typography;

const Home = () => {
    const navigate = useNavigate();
    const [searchTerm, setSearchTerm] = useState('');

    const handleSearch = async () => {
        try {
            const motorcycles = await fetchMotorcycles();
            const filtered = motorcycles.filter(motorcycle =>
                motorcycle.model.toLowerCase().includes(searchTerm.toLowerCase())
            );
            navigate('/motorcycles', { state: { filteredMotorcycles: filtered } });
        } catch (err) {
            console.error('Error fetching motorcycles:', err);
        }
    };

    return (
        <div className="home-container">
            {/* Hero Section */}
            <motion.section 
                className="hero-section"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1 }}
            >
                <div className="hero-content">
                    <motion.div 
                        className="hero-text"
                        initial={{ opacity: 0, y: 50 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                    >
                        <Title level={1} className="hero-title">
                            Discover Your Perfect Ride
                        </Title>
                        <Paragraph className="hero-subtitle">
                            Kenya's Most Trusted Motorcycle Marketplace
                        </Paragraph>
                        <Space size="large" className="hero-stats">
                            <motion.div 
                                className="stat-item"
                                whileHover={{ scale: 1.1 }}
                            >
                                <CarOutlined />
                                <span>500+ Bikes</span>
                            </motion.div>
                            <motion.div 
                                className="stat-item"
                                whileHover={{ scale: 1.1 }}
                            >
                                <CheckCircleOutlined />
                                <span>Verified Sellers</span>
                            </motion.div>
                            <motion.div 
                                className="stat-item"
                                whileHover={{ scale: 1.1 }}
                            >
                                <SafetyCertificateOutlined />
                                <span>Secure Deals</span>
                            </motion.div>
                        </Space>
                    </motion.div>
                    <motion.div 
                        className="hero-image-container"
                        initial={{ scale: 0.8, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{ duration: 0.8 }}
                    >
                        <img src={HERO} alt="Hero" className="hero-image" />
                    </motion.div>
                </div>
            </motion.section>

            {/* Search Section */}
            <motion.section 
                className="search-section"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.6 }}
            >
                <Card className="search-card">
                    <Title level={2}>Search for Your Motorcycle</Title>
                    <Input
                        size="large"
                        placeholder="Search for motorcycles..."
                        prefix={<SearchOutlined />}
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        onPressEnter={handleSearch}
                    />
                    <Button 
                        type="primary" 
                        size="large" 
                        icon={<SearchOutlined />} 
                        onClick={handleSearch}
                        style={{ marginTop: '20px' }}
                    >
                        Search
                    </Button>
                </Card>
            </motion.section>
        </div>
    );
};

export default Home;
