// ConfirmarDepositoButton.jsx
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../Utils/Context';
import './ConfirmarDeposito.css';

const ConfirmarDepositoButton = ({ numeroCuenta, monto, onSuccess, onError }) => {
  const navigate = useNavigate();
  const { token, refreshUser } = useAuth();
  const [isLoading, setIsLoading] = useState(false);

  const handleConfirmarDeposito = async () => {
    if (!monto || isNaN(monto) || Number(monto) <= 0) {
      onError('Por favor, introduce un monto válido.');
      return;
    }

    setIsLoading(true);

    try {
      // Realizar el depósito usando el nuevo endpoint
      let depositoResponse = await fetch('http://localhost:3000/api/depositos', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({
          cuentaDestino: numeroCuenta,
          fecha: new Date().toISOString(),
          monto: Number(monto)
        }),
      });

      if (!depositoResponse.ok) {
        const errorData = await depositoResponse.json();
        throw new Error(errorData.message || 'Error al realizar el depósito');
      }

      //Agregar el egreso a la tabla de Ingresos
      depositoResponse = await fetch('http://localhost:3000/api/ingresos', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          cuentaDestino: numeroCuenta, // ID de la cuenta de Destino
          monto: monto,              // Monto de ingreso
          fecha: new Date().toISOString(),         // Fecha actual
        }),
      });

      if (!depositoResponse.ok) {
        const errorData = await depositoResponse.json();
        throw new Error(errorData.message || 'Error al agregar el egreso');
      }

      // Actualizar la información del usuario
      await refreshUser();
      
      onSuccess('Depósito realizado con éxito');
      window.alert("Depósito Realizado con éxito");
      navigate('/principal');
      return true;

    } catch (error) {
      onError(error.message || 'Error al procesar el depósito. Por favor, intente nuevamente.');
      console.error('Error en el retiro:', error);
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <button
      className={`confirmar-button ${isLoading ? 'loading' : ''}`}
      onClick={handleConfirmarDeposito}
      disabled={isLoading}
    >
      {isLoading ? 'Procesando...' : 'Confirmar'}
    </button>
  );
};

ConfirmarDepositoButton.propTypes = {
  numeroCuenta: PropTypes.string.isRequired,
  tipoCuenta: PropTypes.string.isRequired,
  monto: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  onSuccess: PropTypes.func.isRequired,
  onError: PropTypes.func.isRequired,
};

export default ConfirmarDepositoButton;