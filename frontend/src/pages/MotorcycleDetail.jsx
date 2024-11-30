import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Carousel, Button, Rate, Divider, message } from 'antd';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faWhatsapp, 
  faFacebook, 
  faTwitter 
} from '@fortawesome/free-brands-svg-icons';
import { 
  faChevronLeft, 
  faChevronRight, 
  faPhone, 
  faEnvelope, 
  faShare 
} from '@fortawesome/free-solid-svg-icons';
import Spinner from './spiner';
import { useAuth } from '../context/AuthContext';
import { fetchMotorcyclesById } from '../services/api';

const MotorcycleDetail = () => {
    const { id } = useParams();
    const [motorcycle, setMotorcycle] = useState(null);
    const [selectedImage, setSelectedImage] = useState(0);
    const { darkMode } = useAuth();
    const carouselRef = React.useRef();

    useEffect(() => {
        const getMotorcycle = async () => {
            try {
                const data = await fetchMotorcyclesById(id);
                setMotorcycle(data.motorcycle);
            } catch (err) {
                message.error('Error fetching motorcycle details');
                console.error('Error:', err);
            }
        };
        getMotorcycle();
    }, [id]);

    if (!motorcycle) return <Spinner />;

    const shareUrl = `https://backend-api-pi-black.vercel.app/motorcycles/${id}`;

    const handleShare = async (platform) => {
        try {
            if (navigator.share) {
                await navigator.share({
                    title: `${motorcycle.brand} ${motorcycle.model}`,
                    text: `Check out this ${motorcycle.year} ${motorcycle.brand} ${motorcycle.model}`,
                    url: shareUrl
                });
            } else {
                window.open(getSocialShareUrl(platform), '_blank');
            }
        } catch (err) {
            console.error('Error sharing:', err);
        }
    };

    const getSocialShareUrl = (platform) => {
        switch (platform) {
            case 'whatsapp':
                return `https://api.whatsapp.com/send?text=${shareUrl}`;
            case 'facebook':
                return `https://www.facebook.com/sharer/sharer.php?u=${shareUrl}`;
            case 'twitter':
                return `https://twitter.com/intent/tweet?url=${shareUrl}`;
            default:
                return shareUrl;
        }
    };

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="motorcycle-detail-container"
        >
            <div className="gallery-section">
                <Carousel
                    ref={carouselRef}
                    autoplay
                    dots={false}
                    effect="fade"
                    beforeChange={(_, next) => setSelectedImage(next)}
                >
                    {motorcycle.images.map((image, index) => (
                        <motion.div
                            key={index}
                            className="main-image-container"
                            layoutId={`image-${index}`}
                        >
                            <img src={image} alt={`${motorcycle.brand} ${motorcycle.model}`} />
                        </motion.div>
                    ))}
                </Carousel>

                <div className="gallery-navigation">
                    <Button
                        className="nav-button prev"
                        icon={<FontAwesomeIcon icon={faChevronLeft} />}
                        onClick={() => carouselRef.current.prev()}
                    />
                    <Button
                        className="nav-button next"
                        icon={<FontAwesomeIcon icon={faChevronRight} />}
                        onClick={() => carouselRef.current.next()}
                    />
                </div>

                <div className="thumbnail-strip">
                    {motorcycle.images.map((image, index) => (
                        <motion.img
                            key={index}
                            src={image}
                            alt={`Thumbnail ${index + 1}`}
                            className={`thumbnail ${selectedImage === index ? 'active' : ''}`}
                            onClick={() => carouselRef.current.goTo(index)}
                            whileHover={{ scale: 1.1 }}
                        />
                    ))}
                </div>
            </div>

            <div className="details-section">
                <div className="main-details">
                    <motion.h1 
                        className="motorcycle-title"
                        initial={{ y: -20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                    >
                        {motorcycle.brand} {motorcycle.model}
                    </motion.h1>
                    
                    <motion.div 
                        className="price-tag"
                        initial={{ x: -20, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        transition={{ delay: 0.2 }}
                    >
                        ${motorcycle.price.toLocaleString()}
                    </motion.div>

                    <Divider />

                    <div className="specs-grid">
                        {[
                            { label: 'Year', value: motorcycle.year || 'N/A' },
                            { label: 'Condition', value: motorcycle.condition || 'N/A' },
                            { label: 'Horsepower', value: motorcycle.horsepower ? `${motorcycle.horsepower} HP` : 'N/A' },
                            { label: 'Mileage', value: motorcycle.mileage ? `${motorcycle.mileage.toLocaleString()} miles` : 'N/A' },
                            { label: 'Location', value: motorcycle.location || 'N/A' }
                        ].map((spec, index) => (
                            <motion.div
                                key={spec.label}
                                className="spec-item"
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: index * 0.1 }}
                            >
                                <div className="spec-label">{spec.label}</div>
                                <div className="spec-value">{spec.value}</div>
                            </motion.div>
                        ))}
                    </div>
                </div>

                <motion.div 
                    className="contact-section"
                    initial={{ x: 20, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: 0.4 }}
                >
                    <Button
                        type="primary"
                        icon={<FontAwesomeIcon icon={faPhone} />}
                        className="contact-button primary-button"
                        onClick={() => window.location.href = `tel:${motorcycle.sellerContact}`}
                    >
                        Call Seller
                    </Button>

                    <Button
                        icon={<FontAwesomeIcon icon={faWhatsapp} />}
                        className="contact-button secondary-button"
                        onClick={() => window.location.href = `https://wa.me/${motorcycle.sellerContact}`}
                    >
                        WhatsApp
                    </Button>

                    <Button
                        icon={<FontAwesomeIcon icon={faEnvelope} />}
                        className="contact-button secondary-button"
                        onClick={() => window.location.href = `mailto:example@example.com`}
                    >
                        Email
                    </Button>

                    <Divider />

                    <div className="condition-score">
                        <h3>Condition Score</h3>
                        <Rate 
                            disabled 
                            value={motorcycle.conditionScore} 
                            allowHalf 
                        />
                    </div>

                    <Divider />

                    <div className="social-share">
                        {['whatsapp', 'facebook', 'twitter'].map((platform) => (
                            <motion.button
                                key={platform}
                                className={`social-button ${platform}`}
                                whileHover={{ scale: 1.1 }}
                                whileTap={{ scale: 0.95 }}
                                onClick={() => handleShare(platform)}
                            >
                                <FontAwesomeIcon 
                                    icon={
                                        platform === 'whatsapp' ? faWhatsapp :
                                        platform === 'facebook' ? faFacebook :
                                        faTwitter
                                    }
                                />
                            </motion.button>
                        ))}
                    </div>
                </motion.div>
            </div>
        </motion.div>
    );
};

export default MotorcycleDetail;
