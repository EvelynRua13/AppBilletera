import React from 'react';
import { useNavigate } from 'react-router-dom'; 
import './BotonPrincipal.css';

const IrPaginaPrincipalButton = () => {
  const navigate = useNavigate(); 

  const handleGoToMainPage = () => {
    const confirmGoToMain = window.confirm('¿Estás seguro de que deseas ir a la página principal?');
    
    if (confirmGoToMain) {
      navigate('/principal'); 
    }
  };

  return (
    <button className="go-to-main-button" onClick={handleGoToMainPage}>
      Home
    </button>
  );
};

export default IrPaginaPrincipalButton;
