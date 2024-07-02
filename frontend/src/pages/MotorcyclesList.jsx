import React, { useState, useEffect } from 'react';
import { fetchMotorcycles, deleteMotorcycle } from '../services/api';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

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

    return (
        <div className="motorcycles-list-container">
            <div className="filters">
                <label>Filter by Price:</label>
                <select onChange={(e) => setPriceRange(e.target.value)}>
                    <option value="">All</option>
                    <option value="0-70000">0 - 70k</option>
                    <option value="70000-150000">70k - 150k</option>
                    <option value="150000-300000">150k - 300k</option>
                </select>
            </div>
            <div className="categories">
                <button className="category" onClick={() => setCategory('Sport')}>Sport</button>
                <button className="category" onClick={() => setCategory('Tour')}>Tour</button>
                <button className="category" onClick={() => setCategory('Roadster')}>Roadster</button>
                <button className="category" onClick={() => setCategory('Heritage')}>Heritage</button>
                <button className="category" onClick={() => setCategory('Adventure')}>Adventure</button>
                <button className="category" onClick={() => setCategory('Urban Mobility')}>Urban Mobility</button>
            </div>
            <div className="motorcycles-list">
                {filteredMotorcycles.map((motorcycle) => (
                    <div key={motorcycle._id} className="motorcycle-box" onClick={() => navigate(`/motorcycles/${motorcycle._id}`)}>
                        {motorcycle.images && motorcycle.images.length > 0 && (
                            <img src={motorcycle.images[0]} alt={motorcycle.model} className="main-image" />
                        )}
                        <h2>{motorcycle.brand} {motorcycle.model}</h2>
                        <p>Price: ${motorcycle.price}</p>
                        <p>Category: {motorcycle.category}</p>
                        {user?.role === 'admin' && (
                            <div className="admin-buttons">
                                <Link to={`/edit-motorcycle/${motorcycle._id}`} onClick={(e) => e.stopPropagation()}>
                                    <button className="edit-button">Edit</button>
                                </Link>
                                <button className="delete-button" onClick={(e) => { e.stopPropagation(); handleDelete(motorcycle._id); }}>Delete</button>
                            </div>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default MotorcyclesList;