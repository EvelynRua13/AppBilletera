import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useAuth } from '../../Utils/Context';
import './ConfirmarDeposito.css';

const ConfirmarDepositoButton = ({ numeroCuenta, tipoCuenta, monto, onSuccess, onError }) => {
  const { token, refreshUser } = useAuth();
  const [isLoading, setIsLoading] = useState(false);

  const handleConfirmarDeposito = async () => {
    if (!monto || isNaN(monto) || Number(monto) <= 0) {
      onError('Por favor, introduce un monto válido.');
      return;
    }

    setIsLoading(true);
    
    try {
      // 1. Registrar la transacción
      const transaccionResponse = await fetch('http://localhost:3000/api/transacciones', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({
          numero_cuenta: numeroCuenta,
          tipo_cuenta: tipoCuenta,
          tipo_transaccion: 'deposito',
          monto: Number(monto),
          fecha: new Date().toISOString()
        }),
      });

      if (!transaccionResponse.ok) {
        throw new Error('Error al registrar la transacción');
      }

      // 2. Registrar el ingreso
      const ingresoResponse = await fetch('http://localhost:3000/api/ingresos', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({
          numero_cuenta: numeroCuenta,
          monto: Number(monto),
          fecha: new Date().toISOString()
        }),
      });

      if (!ingresoResponse.ok) {
        throw new Error('Error al registrar el ingreso');
      }

      // 3. Actualizar el saldo del usuario
      await refreshUser();
      
      onSuccess('Depósito realizado con éxito');
      return true;

    } catch (error) {
      console.error('Error en el depósito:', error);
      onError(error.message || 'Error al procesar el depósito. Por favor, intente nuevamente.');
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
