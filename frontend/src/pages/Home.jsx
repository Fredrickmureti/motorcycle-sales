import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import HERO from '../assets/HERO.jpg';
import { fetchMotorcycles } from '../services/api';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch, faMotorcycle, faPhone, faCreditCard } from '@fortawesome/free-solid-svg-icons';

const Home = () => {
    const navigate = useNavigate();
    const [searchTerm, setSearchTerm] = useState('');
    const [filteredMotorcycles, setFilteredMotorcycles] = useState([]);
    const [minYOM, setMinYOM] = useState('');
    const [maxYOM, setMaxYOM] = useState('');
    const [minPrice, setMinPrice] = useState('');
    const [maxPrice, setMaxPrice] = useState('');

    const handleSearch = async () => {
        try {
            const motorcycles = await fetchMotorcycles();
            const filtered = motorcycles.filter(motorcycle => motorcycle.model.toLowerCase().includes(searchTerm.toLowerCase()));
            setFilteredMotorcycles(filtered);
            navigate('/motorcycles', { state: { filteredMotorcycles: filtered } });
        } catch (err) {
            console.error('Error fetching motorcycles:', err);
        }
    };

    const handleScroll = () => {
        document.getElementById('main-content').scrollIntoView({ behavior: 'smooth' });
    };

    return (
        <div>
            <div className="hero-section">
                <h1 className="graffiti-text">The Safest Way to Buy Motorcycle in Kenya</h1>
                <button className="scroll-down" onClick={handleScroll}>Scroll Down</button>
                <img src={HERO} alt="Hero Image" className="hero-image" />
            </div>
            <div id="main-content">
                <div className="search-section">
                    <h2>Search Vehicle</h2>
                    <p>Simply write the vehicle name and press the search button (e.g., Kawasaki Ninja).</p>
                    <div className="search-box">
                        <input
                            type="text"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            placeholder="Search for motorcycles..."
                        />
                        <button onClick={handleSearch}><FontAwesomeIcon icon={faSearch} /> Search</button>
                    </div>
                    <div className="budget-filters">
                        <button onClick={() => setFilteredMotorcycles(filteredMotorcycles.filter(motorcycle => motorcycle.price <= 70000))}>
                            0 to 70k
                        </button>
                        <button onClick={() => setFilteredMotorcycles(filteredMotorcycles.filter(motorcycle => motorcycle.price > 70000 && motorcycle.price <= 150000))}>
                            70k to 150k
                        </button>
                    </div>
                </div>
                <div className="advanced-search">
                    <h3>Click here for advanced search</h3>
                    <div className="advanced-filters">
                        <label>Brand & Model:</label>
                        <select name="brand" onChange={(e) => { /* handle brand change */ }}>
                            <option value="">Select Brand</option>
                            <option value="Kawasaki">Kawasaki</option>
                            <option value="BMW">BMW</option>
                            <option value="Honda">Honda</option>
                            {/* Add more options */}
                        </select>
                        <select name="model" onChange={(e) => { /* handle model change */ }}>
                            <option value="">Select Model</option>
                            {/* Populate based on selected brand */}
                        </select>
                        <div className="year-of-manufacture">
                            <label>Year of Manufacture:</label>
                            <input
                                type="number"
                                placeholder="Min YOM"
                                value={minYOM}
                                onChange={(e) => setMinYOM(e.target.value)}
                            />
                            <input
                                type="number"
                                placeholder="Max YOM"
                                value={maxYOM}
                                onChange={(e) => setMaxYOM(e.target.value)}
                            />
                        </div>
                        <div className="price-currency">
                            <label>Price & Currency:</label>
                            <input
                                type="number"
                                placeholder="Min Price"
                                value={minPrice}
                                onChange={(e) => setMinPrice(e.target.value)}
                            />
                            <input
                                type="number"
                                placeholder="Max Price"
                                value={maxPrice}
                                onChange={(e) => setMaxPrice(e.target.value)}
                            />
                        </div>
                        <button onClick={handleSearch}><FontAwesomeIcon icon={faSearch} /> Search</button>
                    </div>
                </div>
                <div className="owning-motorcycle">
                    <h2>Owning a Motorcycle is as simple as One, Two, Three</h2>
                    <div className="steps">
                        <div className="step">
                            <FontAwesomeIcon icon={faMotorcycle} size="3x" />
                            <h3>One</h3>
                            <p>Select Motorcycle</p>
                        </div>
                        <div className="step">
                            <FontAwesomeIcon icon={faPhone} size="3x" />
                            <h3>Two</h3>
                            <p>Enquire</p>
                        </div>
                        <div className="step">
                            <FontAwesomeIcon icon={faCreditCard} size="3x" />
                            <h3>Three</h3>
                            <p>Pay</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Home;