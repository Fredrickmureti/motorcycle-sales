import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { fetchMotorcyclesById } from '../services/api';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faWhatsapp, faFacebook, faTwitter } from '@fortawesome/free-brands-svg-icons';
import Spinner from './spiner';

const MotorcycleDetail = () => {
    const { id } = useParams();
    const [motorcycle, setMotorcycle] = useState(null);
    const [selectedImage, setSelectedImage] = useState(null);
    const [currentIndex, setCurrentIndex] = useState(0);
    
    // Fetch motorcycle from the database
    useEffect(() => {
        const getMotorcycle = async () => {
            try {
                const data = await fetchMotorcyclesById(id);
                setMotorcycle(data.motorcycle); // Update the motorcycle
                if (data.motorcycle.images && data.motorcycle.images.length > 0) {
                    setSelectedImage(data.motorcycle.images[0]);
                }
            } catch (err) {
                console.error('Error fetching motorcycle:', err);
            }
        };
        getMotorcycle();
    }, [id]);

    // Auto slide functionality
    useEffect(() => {
        const interval = setInterval(() => {
            if (motorcycle && motorcycle.images && motorcycle.images.length > 1) {
                setCurrentIndex((prevIndex) => (prevIndex + 1) % motorcycle.images.length);
                setSelectedImage(motorcycle.images[(currentIndex + 1) % motorcycle.images.length]);
            }
        }, 3000); // Change image every 3 seconds

        return () => clearInterval(interval);
    }, [motorcycle, currentIndex]);

    if (!motorcycle) return <div><Spinner /></div>;

    const shareUrl = `https://backend-api-pi-black.vercel.app/motorcycles/${id}`;

    return (
        <div className="bg-background text-primary-foreground min-h-screen flex flex-col items-center justify-center p-4">
            {/* Main image slider */}
            <div className="w-full max-w-screen-lg rounded-lg overflow-hidden shadow-lg mb-8 relative">
                {selectedImage && <img src={selectedImage} alt="Motorcycle" className="w-full h-auto" />}
            </div>

            {/* Thumbnail navigation */}
            <div className="flex justify-center mb-8">
                {motorcycle.images.map((url, index) => (
                    <img
                        key={index}
                        src={url}
                        alt={`Angle ${index}`}
                        className={`w-20 h-20 object-cover m-1 cursor-pointer border-2 ${index === currentIndex ? 'border-primary' : 'border-transparent'}`}
                        onClick={() => {
                            setSelectedImage(url);
                            setCurrentIndex(index);
                        }}
                    />
                ))}
            </div>

            <div className="w-full max-w-screen-lg bg-card text-card-foreground rounded-lg shadow-lg p-6">
                <h2 className="text-2xl font-bold mb-4">{motorcycle.brand} {motorcycle.model}</h2>
                <p><strong>Year:</strong> {motorcycle.year}</p>
                <p><strong>Condition:</strong> {motorcycle.condition}</p>
                <p><strong>Price:</strong> ${motorcycle.price}</p>
                <p><strong>Horsepower:</strong> {motorcycle.horsepower} HP</p>
                <p><strong>Mileage:</strong> {motorcycle.mileage} miles</p>
                <p><strong>Location:</strong> {motorcycle.location}</p>
                {motorcycle.description && <p>{motorcycle.description}</p>}
                {motorcycle.specifications && <p>{motorcycle.specifications}</p>}
                <p>
                    <strong>Contact:</strong>
                    <span className="block">Phone: {motorcycle.sellerContact}</span>
                    <span className="block">Email: example@example.com</span>
                </p>
                <button 
                    className="bg-primary text-primary-foreground hover:bg-primary/80 mt-4 px-4 py-2 rounded-md"
                    onClick={() => window.location.href = `tel:${motorcycle.sellerContact}`}
                >
                    Contact Seller
                </button>
                <button 
                    className="bg-primary text-primary-foreground hover:bg-primary/80 mt-4 px-4 py-2 rounded-md ml-4"
                    onClick={() => window.location.href = `https://wa.me/${motorcycle.sellerContact}`}
                >
                    Enquire Via WhatsApp
                </button>
                
                <div className="mt-4 flex space-x-4">
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
                
                <div className="mt-4">
                    <h3 className="text-xl font-bold">Condition Score</h3>
                    <div className="stars">
                        {Array.from({ length: Math.floor(motorcycle.conditionScore) }, (_, i) => (
                            <span key={i}>⭐</span>
                        ))}
                        {motorcycle.conditionScore % 1 !== 0 && <span key="half">⭐️</span>}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MotorcycleDetail;