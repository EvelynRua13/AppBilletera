import React from 'react';
import { useNavigate } from 'react-router-dom'; 
import './BotonDepositos.css'; 

const DepositosButton = () => {
  const navigate = useNavigate(); 

  const handleGoToDepositos = () => {
    navigate('/depositos'); 
  };

  return (
    <button className="depositos-button" onClick={handleGoToDepositos}>
      Ir a Depósitos
    </button>
  );
};

export default DepositosButton;
