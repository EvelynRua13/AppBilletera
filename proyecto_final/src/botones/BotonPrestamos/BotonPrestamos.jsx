import React from 'react';
import { useNavigate } from 'react-router-dom'; 
import './BotonPrestamos.css'; 

const PrestamosButton = () => {
  const navigate = useNavigate(); 

  const handleGoToPrestamos = () => {
    navigate('/prestamos'); 
  };

  return (
    <button className="prestamos-button" onClick={handleGoToPrestamos}>
      Ir a Préstamos
    </button>
  );
};

export default PrestamosButton;
