import React from 'react';
import PropTypes from 'prop-types'; 
import './ConfirmarRetiro.css'; 

const ConfirmarRetiroButton = ({ numeroCuenta, monto, onSuccess, onError }) => {
  const handleConfirmarRetiro = async () => {
    if (!monto || isNaN(monto) || Number(monto) <= 0) {
      onError('Por favor, introduce un monto válido.');
      return;
    }

    // Lógica comentada para registrar el retiro en la base de datos
    /*
    try {
      // 1. Agregar el retiro a la tabla de Transacciones
      await fetch('/api/transacciones', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          cuenta_id: numeroCuenta, // ID de la cuenta de origen
          tipo: 'retiro',          // Tipo de transacción
          monto: monto,            // Monto del retiro
          fecha: new Date(),       // Fecha actual
        }),
      });

      // 2. Agregar el egreso a la tabla de Egresos
      await fetch('/api/egresos', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          usuario_id: numeroCuenta, // ID de la cuenta de origen
          monto: monto,              // Monto de egreso
          fecha: new Date(),         // Fecha actual
        }),
      });

      onSuccess('Retiro realizado con éxito.');
    } catch (error) {
      console.error('Error en el retiro:', error);
      onError('Error al conectar con el servidor.');
    }
    */
  };

  return (
    <button className="confirmar-button" onClick={handleConfirmarRetiro}>
      Confirmar Retiro
    </button>
  );
};


ConfirmarRetiroButton.propTypes = {
  numeroCuenta: PropTypes.string.isRequired, // Número de cuenta
  monto: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired, // Monto del retiro
  onSuccess: PropTypes.func.isRequired,
  onError: PropTypes.func.isRequired,
};

export default ConfirmarRetiroButton;
