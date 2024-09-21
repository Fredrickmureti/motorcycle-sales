import React, { useState, useEffect } from 'react';
import { fetchMotorcycles, deleteMotorcycle } from '../services/api';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import Component from './Card'; // Ensure this path is correct

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
                    <Component 
                        key={motorcycle._id} 
                        motorcycle={motorcycle} 
                        onDetailClick={() => navigate(`/motorcycles/${motorcycle._id}`)} 
                        onEditClick={() => navigate(`/edit-motorcycle/${motorcycle._id}`)} 
                        onDeleteClick={handleDelete} 
                        isAdmin={user?.role === 'admin'}
                    />
                ))}
            </div>
        </div>
    );
};

export default MotorcyclesList;