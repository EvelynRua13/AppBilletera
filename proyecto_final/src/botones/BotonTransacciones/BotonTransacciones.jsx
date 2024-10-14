import React from 'react';
import { useNavigate } from 'react-router-dom'; 
import './BotonTransacciones.css'; 

const TransaccionesButton = () => {
  const navigate = useNavigate(); 

  const handleGoToTransacciones = () => {
    navigate('/transacciones'); 
  };

  return (
    <button className="transacciones-button" onClick={handleGoToTransacciones}>
      Ir a Transacciones
    </button>
  );
};

export default TransaccionesButton;
