import React from 'react';
import './MotorcycleCard.css';

const MotorcycleCard = ({motorcycle}) => {
  return (
    <div className='card'>
      <img src={motorcycle.image} alt='motorcycle picture'/>
      <section className='details'>
        <h2>Motorcycle Details</h2>
        <ul>
          <li>Model: {motorcycle.model}</li>
          <li>Year: {motorcycle.year}</li>
          <li>Price: {motorcycle.price}</li>
        </ul>
      </section>
      <button className='see-details'>See Details</button>
    </div>  
  )
}