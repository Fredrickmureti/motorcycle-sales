import React, { useState, useEffect } from 'react';
import { fetchMotorcycles, deleteMotorcycle } from '../services/api';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { motion } from 'framer-motion';
import { Select, Button, Row, Col, Space, message } from 'antd';
import { TagsOutlined } from '@ant-design/icons';
import MotorcycleCard from './Card';

const MotorcyclesList = () => {
    const { user } = useAuth();
    const navigate = useNavigate();
    const [motorcycles, setMotorcyclesState] = useState([]);
    const [filteredMotorcycles, setFilteredMotorcycles] = useState([]);
    const [priceRange, setPriceRange] = useState('');
    const [category, setCategory] = useState('');

    useEffect(() => {
        const getMotorcycles = async () => {
            try {
                const data = await fetchMotorcycles();
                setMotorcyclesState(data);
                setFilteredMotorcycles(data);
            } catch (err) {
                console.error('Error fetching motorcycles:', err);
            }
        };
        getMotorcycles();
    }, []);

    useEffect(() => {
        filterMotorcycles();
    }, [priceRange, category, motorcycles]);

    const filterMotorcycles = () => {
        let filtered = motorcycles;
        if (priceRange) {
            const [minPrice, maxPrice] = priceRange.split('-').map(Number);
            filtered = filtered.filter(motorcycle => motorcycle.price >= minPrice && motorcycle.price <= maxPrice);
        }
        if (category) {
            filtered = filtered.filter(motorcycle => motorcycle.category === category);
        }
        setFilteredMotorcycles(filtered);
    };

    const handleDelete = async (id) => {
        try {
            await deleteMotorcycle(id);
            setMotorcyclesState((prevMotorcycles) => prevMotorcycles.filter(m => m._id !== id));
        } catch (err) {
            alert('Error deleting motorcycle: ' + err.message);
        }
    };

    const categories = [
        { key: 'Sport', icon: '🏍' },
        { key: 'Tour', icon: '🛣' },
        { key: 'Roadster', icon: '🏁' },
        { key: 'Heritage', icon: '🌟' },
        { key: 'Adventure', icon: '🗺' },
        { key: 'Urban Mobility', icon: '🌆' }
    ];

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1
            }
        }
    };

    const itemVariants = {
        hidden: { y: 20, opacity: 0 },
        visible: {
            y: 0,
            opacity: 1
        }
    };

    return (
        <motion.div
            initial="hidden"
            animate="visible"
            variants={containerVariants}
            className="motorcycles-container"
        >
            <Row gutter={[16, 16]} justify="center" className="filters-section">
                <Col xs={24} sm={24} md={8} lg={6}>
                    <Select
                        style={{ width: '100%' }}
                        placeholder="Filter by Price"
                        onChange={(value) => setPriceRange(value)}
                        allowClear
                    >
                        <Select.Option value="">All Prices</Select.Option>
                        <Select.Option value="0-70000">Under 70,000</Select.Option>
                        <Select.Option value="70000-150000">70,000 - 150,000</Select.Option>
                        <Select.Option value="150000-300000">150,000 - 300,000</Select.Option>
                    </Select>
                </Col>
            </Row>

            <Row gutter={[8, 8]} justify="center" className="categories-section">
                <Col xs={24}>
                    <Space wrap>
                        {categories.map(({ key, icon }) => (
                            <Button
                                key={key}
                                type={category === key ? 'primary' : 'default'}
                                icon={<TagsOutlined />}
                                onClick={() => setCategory(key)}
                                className="category-button"
                            >
                                {icon} {key}
                            </Button>
                        ))}
                    </Space>
                </Col>
            </Row>

            <Row gutter={[16, 16]} className="motorcycles-grid">
                {filteredMotorcycles.map((motorcycle) => (
                    <Col 
                        key={motorcycle._id}
                        xs={24}
                        sm={12}
                        md={8}
                        lg={6}
                        xl={6}
                    >
                        <motion.div variants={itemVariants}>
                            <MotorcycleCard
                                motorcycle={motorcycle}
                                onDetailClick={() => navigate(`/motorcycles/${motorcycle._id}`)}
                                onEditClick={() => navigate(`/edit-motorcycle/${motorcycle._id}`)}
                                onDeleteClick={() => {
                                    handleDelete(motorcycle._id);
                                    message.success('Motorcycle deleted successfully');
                                }}
                                isAdmin={user?.role === 'admin'}
                            />
                        </motion.div>
                    </Col>
                ))}
            </Row>
        </motion.div>
    );
};

export default MotorcyclesList;