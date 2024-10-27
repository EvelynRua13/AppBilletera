import React from 'react';
import { useNavigate } from 'react-router-dom'; 
import { useAuth } from '../../Utils/Context'; // Asegúrate de importar el contexto
import './LogOut.css';

const LogoutButton = () => {
  const navigate = useNavigate(); 
  const { logout } = useAuth(); // Obtener la función logout del contexto

  const handleLogout = () => {
    const confirmLogout = window.confirm('¿Estás seguro de que deseas cerrar sesión?');
    
    if (confirmLogout) {
      logout(); // Llamar a la función de logout para limpiar el estado
      navigate('/'); // Redirigir a la página de inicio
    }
  };

  return (
    <button className="logout-button" onClick={handleLogout}>
      Cerrar Sesión
    </button>
  );
};

export default LogoutButton;

