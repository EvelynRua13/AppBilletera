import React from 'react';
import PropTypes from 'prop-types'; 
import './ConfirmarDeposito.css'; 

const ConfirmarDepositoButton = ({ cuentaDestino, monto, onSuccess, onError}) => {
  const handleConfirmarDeposito = async () => {
    if (!monto || isNaN(monto) || Number(monto) <= 0) {
      onError('Por favor, introduce un monto válido.');
      return;
    }

    // Lógica comentada para registrar el depósito en la base de datos
    
    try {
      // 1. Agregar la transacción a la tabla de Transacciones
      await fetch('/api/transacciones', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          cuenta_id: cuentaDestino, // ID de la cuenta destino
          tipo: 'depósito',         // Tipo de transacción
          monto: monto,             // Monto de la transacción
          fecha: new Date(),        // Fecha actual
        }),
      });

      // 2. Agregar el ingreso a la tabla de Ingresos
      await fetch('/api/ingresos', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          usuario_id: cuentaDestino, // ID de la cuenta destino
          monto: monto,              // Monto de ingreso
          fecha: new Date(),         // Fecha actual
        }),
      });

      onSuccess('Depósito realizado con éxito.');
    } catch (error) {
      console.error('Error en el depósito:', error);
      onError('Error al conectar con el servidor.');
    }
    
  };

  return (
    <button className="confirmar-button" onClick={handleConfirmarDeposito}>
      Confirmar
    </button>
  );
};

// Validación de PropTypes
ConfirmarDepositoButton.propTypes = {
  cuentaDestino: PropTypes.string.isRequired, // ID de la cuenta destino
  tipoCuenta: PropTypes.string.isRequired,     // Tipo de cuenta
  monto: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired, // Monto de la transacción
  onSuccess: PropTypes.func.isRequired,
  onError: PropTypes.func.isRequired,
};

export default ConfirmarDepositoButton;
