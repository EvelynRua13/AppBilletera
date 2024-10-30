import React from 'react';
import PropTypes from 'prop-types'; 
import './ConfirmarRetiro.css'; 
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../Utils/Context';


const ConfirmarRetiroButton = ({ cuentaOrigen, monto, onSuccess, onError }) => {
  const navigate = useNavigate();
  const {refreshUser } = useAuth();

  const handleConfirmarRetiro = async () => {
    const montoNum = Number(monto);
    if (!monto || isNaN(montoNum) || Number(montoNum) <= 0) {
      onError('Por favor, introduce un monto válido.');
      return;
    }

    // Lógica comentada para registrar el retiro en la base de datos

    try {
      // 1. Agregar el retiro a la tabla de Transacciones
      let response = await fetch('http://localhost:3000/api/retiros', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          cuentaOrigen: cuentaOrigen, // ID de la cuenta de origen
          tipo: 'retiro',          // Tipo de transacción
          monto: montoNum,            // Monto del retiro
          fecha: new Date().toISOString(),       // Fecha actual
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        console.error('Error en la respuesta de retiros:', errorData);
        throw new Error(errorData.message || 'Error al agregar el retiro');
      }

      console.log('Retiro agregado con éxito');

      // 2. Agregar el egreso a la tabla de Egresos
      response = await fetch('http://localhost:3000/api/egresos', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          cuentaOrigen: cuentaOrigen, // ID de la cuenta de origen
          monto: montoNum,              // Monto de egreso
          fecha: new Date().toISOString(),         // Fecha actual
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Error al agregar el egreso');
      }

      // 4. Actualizar los datos del usuario
      await refreshUser();

      console.log('Egreso agregado con éxito');
      onSuccess('Retiro realizado con éxito.');
      window.alert("Retiro Realizado con éxito");
      navigate('/principal');
    } catch (error) {
      console.error('Error en el retiro:', error);
      onError('Error al conectar con el servidor.');
    }
  };

  return (
    <button className="confirmar-button" onClick={handleConfirmarRetiro}>
      Confirmar
    </button>
  );
};

ConfirmarRetiroButton.propTypes = {
  cuentaOrigen: PropTypes.string.isRequired, // Número de cuenta
  monto: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired, // Monto del retiro
  onSuccess: PropTypes.func.isRequired,
  onError: PropTypes.func.isRequired,
};

export default ConfirmarRetiroButton;
