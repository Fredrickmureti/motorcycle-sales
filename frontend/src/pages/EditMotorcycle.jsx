import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { fetchMotorcyclesById, editMotorcycle } from '../services/api';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './EditMotorcycle.css'; // Import the CSS file for styling

const EditMotorcycle = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [motorcycle, setMotorcycle] = useState(null);
    const [formData, setFormData] = useState({
        brand: '',
        model: '',
        year: '',
        price: '',
        description: '',
        images: [],
        condition: '',
        location: '',
        availability: '',
        conditionScore: 0
    });
    const [selectedImages, setSelectedImages] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        const getMotorcycle = async () => {
            try {
                const data = await fetchMotorcyclesById(id);
                setMotorcycle(data.motorcycle);
                setFormData({
                    brand: data.motorcycle.brand,
                    model: data.motorcycle.model,
                    year: data.motorcycle.year,
                    price: data.motorcycle.price,
                    description: data.motorcycle.description,
                    condition: data.motorcycle.condition,
                    location: data.motorcycle.location,
                    availability: data.motorcycle.availability,
                    conditionScore: data.motorcycle.conditionScore,
                    images: data.motorcycle.images
                });
            } catch (err) {
                setError('Error fetching motorcycle: ' + err.message);
            }
        };
        getMotorcycle();
    }, [id]);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleImageChange = (e) => {
        const imageFiles = Array.from(e.target.files);
        setSelectedImages(imageFiles);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const data = new FormData();
        data.append('brand', formData.brand);
        data.append('model', formData.model);
        data.append('year', formData.year);
        data.append('price', formData.price);
        data.append('description', formData.description);
        data.append('condition', formData.condition);
        data.append('location', formData.location);
        data.append('availability', formData.availability);
        data.append('conditionScore', formData.conditionScore);

        // Append new images if selected, otherwise append existing images
        if (selectedImages.length > 0) {
            selectedImages.forEach((image) => data.append('images', image));
        } else {
            formData.images.forEach((image) => data.append('existingImages', image));
        }

        try {
            await editMotorcycle(id, data);
            toast.success('Motorcycle updated successfully!', {
                position: 'top-right', // Use string value directly
                autoClose: 3000,
                hideProgressBar: true,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
            setTimeout(() => {
                navigate('/motorcycles');
            }, 3000);
        } catch (err) {
            console.error('Error updating motorcycle:', err);
            setError('Failed to update motorcycle. Please try again.');
        }
    };

    if (!motorcycle) return <div>Loading...</div>;

    return (
        <div className="edit-motorcycle">
            <h2>Edit Motorcycle</h2>
            {error && <div className="error">{error}</div>}
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label>Brand:</label>
                    <input type="text" name="brand" value={formData.brand} onChange={handleChange} required />
                </div>
                <div className="form-group">
                    <label>Model:</label>
                    <input type="text" name="model" value={formData.model} onChange={handleChange} required />
                </div>
                <div className="form-group">
                    <label>Year:</label>
                    <input type="number" name="year" value={formData.year} onChange={handleChange} required />
                </div>
                <div className="form-group">
                    <label>Price:</label>
                    <input type="number" name="price" value={formData.price} onChange={handleChange} required />
                </div>
                <div className="form-group">
                    <label>Condition:</label>
                    <select name="condition" value={formData.condition} onChange={handleChange} required>
                        <option value="" disabled>Select condition</option>
                        <option value="new">New</option>
                        <option value="used">Used</option>
                    </select>
                </div>
                <div className="form-group">
                    <label>Location:</label>
                    <input type="text" name="location" value={formData.location} onChange={handleChange} required />
                </div>
                <div className="form-group">
                    <label>Availability:</label>
                    <select name="availability" value={formData.availability} onChange={handleChange} required>
                        <option value="" disabled>Select availability</option>
                        <option value="available">Available</option>
                        <option value="sold">Sold</option>
                    </select>
                </div>
                <div className="form-group">
                    <label>Condition Score:</label>
                    <input 
                        type="number" 
                        name="conditionScore" 
                        value={formData.conditionScore} 
                        onChange={handleChange} 
                        min="0" 
                        max="5" 
                        step="0.5" 
                        required
                    />
                </div>
                <div className="form-group">
                    <label>Description:</label>
                    <textarea name="description" value={formData.description} onChange={handleChange} required />
                </div>
                <div className="form-group">
                    <label>Images:</label>
                    <input type="file" multiple onChange={handleImageChange} accept="image/*" />
                    {formData.images && (
                        <div className="image-preview">
                            {formData.images.map((url, index) => (
                                <img key={index} src={url} alt={`Motorcycle ${index}`} />
                            ))}
                        </div>
                    )}
                </div>
                <button type="submit">Update Motorcycle</button>
            </form>
            <ToastContainer />
        </div>
    );
};

export default EditMotorcycle;