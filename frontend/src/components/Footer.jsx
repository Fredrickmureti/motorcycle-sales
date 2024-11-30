import React from 'react';
import { motion } from 'framer-motion';
import { Typography, Row, Col, Space, Divider, Button } from 'antd';
import { 
    TwitterOutlined, 
    InstagramOutlined,
    FacebookOutlined,
    LinkedinOutlined,
    MailOutlined,
    PhoneOutlined,
    EnvironmentOutlined,
    ArrowUpOutlined
} from '@ant-design/icons';
import './Footer.css';

const { Title, Text, Link } = Typography;

const Footer = () => {
    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    return (
        <footer className="footer">
            <motion.div
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                viewport={{ once: true }}
                className="footer-content"
            >
                <Button 
                    className="scroll-to-top"
                    icon={<ArrowUpOutlined />}
                    onClick={scrollToTop}
                    shape="circle"
                    size="large"
                />

                <Row gutter={[32, 32]} justify="space-between">
                    <Col xs={24} sm={12} md={6}>
                        <div className="footer-section">
                            <Title level={4}>About Us</Title>
                            <Text>
                                Kenya's premier motorcycle marketplace, connecting buyers and sellers 
                                with the best deals on quality motorcycles.
                            </Text>
                        </div>
                    </Col>

                    <Col xs={24} sm={12} md={6}>
                        <div className="footer-section">
                            <Title level={4}>Quick Links</Title>
                            <ul className="footer-links">
                                <li><Link href="/">Home</Link></li>
                                <li><Link href="/motorcycles">Motorcycles</Link></li>
                                <li><Link href="/about">About Us</Link></li>
                                <li><Link href="/contact">Contact</Link></li>
                            </ul>
                        </div>
                    </Col>

                    <Col xs={24} sm={12} md={6}>
                        <div className="footer-section">
                            <Title level={4}>Contact Info</Title>
                            <Space direction="vertical">
                                <Text>
                                    <PhoneOutlined /> <Link href="tel:+254797504827">+254 797 504 827</Link>
                                </Text>
                                <Text>
                                    <MailOutlined /> <Link href="mailto:fredrickmureti@gmail.com">fredrickmureti@gmail.com</Link>
                                </Text>
                                <Text>
                                    <EnvironmentOutlined /> Nairobi, Kenya
                                </Text>
                            </Space>
                        </div>
                    </Col>

                    <Col xs={24} sm={12} md={6}>
                        <div className="footer-section">
                            <Title level={4}>Follow Us</Title>
                            <Space className="social-links" size="middle">
                                <motion.a 
                                    href="https://twitter.com/devFredrickmureti" 
                                    target="_blank"
                                    whileHover={{ scale: 1.2 }}
                                    whileTap={{ scale: 0.9 }}
                                >
                                    <TwitterOutlined />
                                </motion.a>
                                <motion.a 
                                    href="https://instagram.com/devFredrickmureti"
                                    target="_blank"
                                    whileHover={{ scale: 1.2 }}
                                    whileTap={{ scale: 0.9 }}
                                >
                                    <InstagramOutlined />
                                </motion.a>
                                <motion.a 
                                    href="#"
                                    target="_blank"
                                    whileHover={{ scale: 1.2 }}
                                    whileTap={{ scale: 0.9 }}
                                >
                                    <FacebookOutlined />
                                </motion.a>
                                <motion.a 
                                    href="#"
                                    target="_blank"
                                    whileHover={{ scale: 1.2 }}
                                    whileTap={{ scale: 0.9 }}
                                >
                                    <LinkedinOutlined />
                                </motion.a>
                            </Space>
                        </div>
                    </Col>
                </Row>

                <Divider className="footer-divider" />

                <div className="footer-bottom">
                    <Text>© 2024 Motorcycle Sales Platform. All rights reserved.</Text>
                    <Space split={<Divider type="vertical" />}>
                        <Link href="/privacy">Privacy Policy</Link>
                        <Link href="/terms">Terms of Service</Link>
                    </Space>
                </div>
            </motion.div>
        </footer>
    );
};

export default Footer;