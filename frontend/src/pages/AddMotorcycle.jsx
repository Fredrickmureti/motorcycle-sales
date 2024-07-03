import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { addMotorcycle } from '../services/api';

const AddMotorcycle = () => {
    const [formData, setFormData] = useState({
        brand: '',
        model: '',
        year: '',
        price: '',
        description: '',
        images: [],
        condition: '',
        category: '',
        location: '',
        availability: '',
        sellerContact: '',
        conditionScore: 0
    });
    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleImageChange = (e) => {
        const imageFiles = Array.from(e.target.files);
        setFormData({ ...formData, images: imageFiles });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const data = new FormData();
        for (const key in formData) {
            if (key === 'images') {
                formData.images.forEach(image => data.append('images', image));
            } else {
                data.append(key, formData[key]);
            }
        }

        try {
            await addMotorcycle(data);
            alert('Motorcycle added successfully!');
            navigate('/motorcycles');
        } catch (err) {
            console.error('Error adding motorcycle:', err);
        }
    };

    return (
        <div className="add-motorcycle">
            <h2>Add New Motorcycle</h2>
            <form onSubmit={handleSubmit}>
                {/* Form fields */}
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
                        <option value="">Select condition</option>
                        <option value="new">New</option>
                        <option value="used">Used</option>
                    </select>
                </div>
                <div className="form-group">
                    <label>Category:</label>
                    <select name="category" value={formData.category} onChange={handleChange} required>
                        <option value="">Select category</option>
                        <option value="Sport">Sport</option>
                        <option value="Tour">Tour</option>
                        <option value="Roadster">Roadster</option>
                        <option value="Heritage">Heritage</option>
                        <option value="Adventure">Adventure</option>
                        <option value="Urban Mobility">Urban Mobility</option>
                    </select>
                </div>
                <div className="form-group">
                    <label>Location:</label>
                    <input type="text" name="location" value={formData.location} onChange={handleChange} required />
                </div>
                <div className="form-group">
                    <label>Availability:</label>
                    <select name="availability" value={formData.availability} onChange={handleChange} required>
                        <option value="">Select availability</option>
                        <option value="available">Available</option>
                        <option value="sold">Sold</option>
                    </select>
                </div>
                <div className="form-group">
                    <label>Seller Contact:</label>
                    <input type="text" name="sellerContact" value={formData.sellerContact} onChange={handleChange} required />
                </div>
                <div className="form-group">
                    <label>Condition Score:</label>
                    <input type="number" name="conditionScore" value={formData.conditionScore} onChange={handleChange} min="0" max="5" step="0.5" required />
                </div>
                <div className="form-group">
                    <label>Description:</label>
                    <textarea name="description" value={formData.description} onChange={handleChange} required />
                </div>
                <div className="form-group">
                    <label>Images:</label>
                    <input type="file" multiple onChange={handleImageChange} accept="image/*" />
                    {formData.images.length > 0 && (
                        <div>
                            {formData.images.map((image, index) => (
                                <img key={index} src={URL.createObjectURL(image)} alt={`Motorcycle ${index}`} style={{ maxWidth: '200px', maxHeight: '200px', margin: '10px' }} />
                            ))}
                        </div>
                    )}
                </div>
                <button type="submit">Add Motorcycle</button>
            </form>
        </div>
    );
};

export default AddMotorcycle;