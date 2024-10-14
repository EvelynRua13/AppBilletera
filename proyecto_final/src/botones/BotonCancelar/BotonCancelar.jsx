import React from 'react';
import PropTypes from 'prop-types';
import './BotonCancelar.css';



const CancelarButton = ({ onCancel }) => {
    const handleCancel = () => {
      // Mostrar ventana de confirmación
      const confirmCancel = window.confirm('¿Estás seguro de que deseas cancelar la operación?');
      
      if (confirmCancel) {
        // Si el usuario confirma, llamar a la función para limpiar los campos
        onCancel();
      }
    };
  
    return (
      <button className="cancelar-button" onClick={handleCancel}>
        Cancelar
      </button>
    );
  };
  
  // Definimos las PropTypes para validar la prop onCancel
  CancelarButton.propTypes = {
    onCancel: PropTypes.func.isRequired, // onCancel debe ser una función y es requerida
  };
  
  export default CancelarButton;