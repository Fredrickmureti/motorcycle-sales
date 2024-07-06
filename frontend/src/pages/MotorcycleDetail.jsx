import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { fetchMotorcyclesById } from '../services/api';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faWhatsapp, faFacebook, faTwitter } from '@fortawesome/free-brands-svg-icons';

const MotorcycleDetail = () => {
    const { id } = useParams();
    const [motorcycle, setMotorcycle] = useState(null);
    const [selectedImage, setSelectedImage] = useState(null);

    useEffect(() => {
        const getMotorcycle = async () => {
            try {
                const data = await fetchMotorcyclesById(id);
                setMotorcycle(data.motorcycle);
                if (data.motorcycle.images && data.motorcycle.images.length > 0) {
                    setSelectedImage(data.motorcycle.images[0]);
                }
            } catch (err) {
                console.error('Error fetching motorcycle:', err);
            }
        };
        getMotorcycle();
    }, [id]);

    if (!motorcycle) return <div>Loading...</div>;

    const shareUrl = `https://backend-api-pi-black.vercel.app/motorcycles/${id}`;

    const renderStars = (score) => {
        const stars = [];
        for (let i = 0; i < Math.floor(score); i++) {
            stars.push(<span key={i}>⭐</span>);
        }
        if (score % 1 !== 0) {
            stars.push(<span key="half">⭐️</span>);
        }
        return stars;
    };

    return (
        <div className="motorcycle-detail">
            <h1>{motorcycle.brand} {motorcycle.model}</h1>
            {motorcycle.description && <p>{motorcycle.description}</p>}
            {motorcycle.specifications && <p>{motorcycle.specifications}</p>}
            <p>Price: ${motorcycle.price}</p>
            {selectedImage && <img src={selectedImage} alt="Selected" className="selected-image" />}
            <div className="thumbnail-images">
                {motorcycle.images.map((url, index) => (
                    <img
                        key={index}
                        src={url}
                        alt={`Angle ${index}`}
                        className="thumbnail"
                        onClick={() => setSelectedImage(url)}
                    />
                ))}
            </div>
            <div className="contact-buttons">
                <button onClick={() => window.location.href = `tel:${motorcycle.sellerContact}`}>
                    Call Now
                </button>
                <button onClick={() => window.location.href = `https://wa.me/${motorcycle.sellerContact}`}>
                    Enquire Via WhatsApp
                </button>
                <div className="share-buttons">
                    <a href={`https://api.whatsapp.com/send?text=${shareUrl}`} target="_blank" rel="noopener noreferrer">
                        <FontAwesomeIcon icon={faWhatsapp} size="2x" />
                    </a>
                    <a href={`https://www.facebook.com/sharer/sharer.php?u=${shareUrl}`} target="_blank" rel="noopener noreferrer">
                        <FontAwesomeIcon icon={faFacebook} size="2x" />
                    </a>
                    <a href={`https://twitter.com/intent/tweet?url=${shareUrl}`} target="_blank" rel="noopener noreferrer">
                        <FontAwesomeIcon icon={faTwitter} size="2x" />
                    </a>
                </div>
            </div>
            <div className="additional-details">
                <h3>Condition Score</h3>
                <div className="stars">
                    {renderStars(motorcycle.conditionScore)}
                </div>
                <h4>More Details</h4>
                <p><strong>Year of Manufacture:</strong> {motorcycle.year}</p>
                <p><strong>Current Location:</strong> {motorcycle.location}</p>
                <p><strong>Availability:</strong> {motorcycle.availability}</p>
            </div>
        </div>
    );
};

export default MotorcycleDetail;