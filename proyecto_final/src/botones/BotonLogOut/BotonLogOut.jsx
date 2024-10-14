import React from 'react';
import { useNavigate } from 'react-router-dom'; 
import './LogOut.css';

const LogoutButton = () => {
  const navigate = useNavigate(); 

  const handleLogout = () => {
    const confirmLogout = window.confirm('¿Estás seguro de que deseas cerrar sesión?');
    
    if (confirmLogout) {
      navigate('/login');
    }
  };

  return (
    <button className="logout-button" onClick={handleLogout}>
      Cerrar Sesión
    </button>
  );
};

export default LogoutButton;
