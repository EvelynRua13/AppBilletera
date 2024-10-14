import React from 'react';
import { useNavigate } from 'react-router-dom'; 
import './BotonRetiros.css'; 

const RetirosButton = () => {
  const navigate = useNavigate(); 

  const handleGoToRetiros = () => {
    navigate('/retiros'); 
  };

  return (
    <button className="retiros-button" onClick={handleGoToRetiros}>
      Ir a Retiros
    </button>
  );
};

export default RetirosButton;
