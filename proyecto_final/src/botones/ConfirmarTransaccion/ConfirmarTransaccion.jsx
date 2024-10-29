import React from 'react';
import PropTypes from 'prop-types';
import './ConfirmarTransaccion.css';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../Utils/Context';

const ConfirmarTransaccionButton = ({ cuentaDestino, monto, cuentaOrigen, onSuccess, onError }) => {
  const navigate = useNavigate();
  const { token, refreshUser } = useAuth();

  const handleConfirmarTransaccion = async () => {
    const montoNum = Number(monto);
    if (!montoNum || isNaN(montoNum) || montoNum <= 0) {
      onError('Por favor, introduce un monto válido.');
      return;
    }

    try {
      // 1. Agregar la transacción
      let response = await fetch('http://localhost:3000/api/transacciones', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({
          cuentaOrigen: cuentaOrigen,
          cuentaDestino: cuentaDestino,
          tipo: 'transferencia',
          monto: montoNum,
          fecha: new Date().toISOString(),
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Error al agregar la transacción');
      }

      // 2. Agregar el ingreso
      response = await fetch('http://localhost:3000/api/ingresos', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({
          cuentaDestino: cuentaDestino,
          monto: montoNum,
          fecha: new Date().toISOString(),
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Error al agregar el ingreso');
      }

      // 3. Agregar el egreso
      response = await fetch('http://localhost:3000/api/egresos', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({
          cuentaOrigen: cuentaOrigen,
          monto: montoNum,
          fecha: new Date().toISOString(),
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Error al agregar el egreso');
      }

      // 4. Actualizar los datos del usuario
      await refreshUser();
      
      onSuccess('Transacción realizada con éxito.');
      navigate('/principal');
    } catch (error) {
      console.error('Error en la transacción:', error);
      onError('Error al conectar con el servidor: ' + error.message);
    }
  };

  return (
    <button className="confirmar-button" onClick={handleConfirmarTransaccion}>
      Confirmar
    </button>
  );
};

ConfirmarTransaccionButton.propTypes = {
  cuentaDestino: PropTypes.string.isRequired,
  monto: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  cuentaOrigen: PropTypes.string.isRequired,
  onSuccess: PropTypes.func.isRequired,
  onError: PropTypes.func.isRequired,
};

export default ConfirmarTransaccionButton;