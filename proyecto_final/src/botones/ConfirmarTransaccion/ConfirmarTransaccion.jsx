import React from 'react';
import PropTypes from 'prop-types'; // Importar PropTypes
import './ConfirmarTransaccion.css'; // Importar CSS
import { useNavigate } from 'react-router-dom';

const ConfirmarTransaccionButton = ({ cuentaDestino, tipo, monto, cuentaOrigen, usuarioIdDestino, usuarioIdOrigen, onSuccess, onError }) => {
  
  const navigate = useNavigate();

  const handleConfirmarTransaccion = async () => {
    if (!monto || isNaN(monto) || Number(monto) <= 0) {
      onError('Por favor, introduce un monto válido.');
      return;
    }

    // Lógica comentada para registrar la transacción en la base de datos
    /*
    try {
      // 1. Agregar la transacción a la tabla de Transacciones
      await fetch('/api/transacciones', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          cuenta_id: cuentaDestino, // ID de la cuenta destino
          tipo: 'Transferencia',               // Tipo de transacción (transferencia, depósito, retiro)
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
          usuario_id: usuarioIdDestino, // ID de la cuenta destino
          monto: monto,                  // Monto de ingreso
          fecha: new Date(),             // Fecha actual
        }),
      });

      // 3. Agregar el egreso a la tabla de Egresos
      await fetch('/api/egresos', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          usuario_id: usuarioIdOrigen, // ID de la cuenta origen
          monto: monto,                 // Monto de egreso
          fecha: new Date(),            // Fecha actual
        }),
      });

      onSuccess('Transacción realizada con éxito.');
      navigate('/dashboard'); // Redirigir al dashboard
    } catch (error) {
      console.error('Error en la transacción:', error);
      onError('Error al conectar con el servidor.');
    }
    */
  };

  return (
    <button className="confirmar-button" onClick={handleConfirmarTransaccion}>
      Confirmar Transacción
    </button>
  );
};

// Validación de PropTypes
ConfirmarTransaccionButton.propTypes = {
  cuentaDestino: PropTypes.string.isRequired, // ID de la cuenta destino
  tipo: PropTypes.string.isRequired,           // Tipo de transacción
  monto: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired, // Monto de la transacción
  cuentaOrigen: PropTypes.string.isRequired,   // ID de la cuenta origen
  usuarioIdDestino: PropTypes.string.isRequired, // ID del usuario destino
  usuarioIdOrigen: PropTypes.string.isRequired, // ID del usuario origen
  onSuccess: PropTypes.func.isRequired,
  onError: PropTypes.func.isRequired,
};

export default ConfirmarTransaccionButton;
