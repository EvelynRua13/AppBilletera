import React from 'react';
import PropTypes from 'prop-types'; 
import './ConfirmarPrestamo.css'; 

const ConfirmarPrestamoButton = ({ numeroCuenta, monto, plazo, usuarioId, onSuccess, onError }) => {
  const handleConfirmarPrestamo = async () => {
    if (!monto || isNaN(monto) || Number(monto) <= 0) {
      onError('Por favor, introduce un monto válido.');
      return;
    }

    if (!plazo || isNaN(plazo) || Number(plazo) <= 0) {
      onError('Por favor, introduce un plazo en meses válido.');
      return;
    }

    // Lógica comentada para registrar el préstamo en la base de datos
    /*
    try {
      const fechaSolicitud = new Date();

      // 1. Agregar el préstamo a la tabla de Préstamos
      await fetch('/api/prestamos', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          usuario_id: usuarioId,  // ID del usuario que solicita el préstamo
          monto: monto,           // Monto del préstamo
          plazo: plazo,           // Plazo en meses
          estado: 'aprobado',    // Estado inicial del préstamo
          fecha_solicitud: fechaSolicitud, // Fecha de la solicitud
        }),
      });

      // 2. Agregar el ingreso a la tabla de Ingresos
      await fetch('/api/ingresos', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          usuario_id: usuarioId,  // ID del usuario que recibe el ingreso
          monto: monto,           // Monto del ingreso
          fecha: fechaSolicitud,  // Fecha de ingreso
        }),
      });

      // 3. Agregar la deuda a la tabla de Deudas
      await fetch('/api/deudas', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          usuario_id: usuarioId,  // ID del usuario que tiene la deuda
          descripcion: 'Préstamo solicitado', // Descripción de la deuda
          monto: monto,           // Monto total de la deuda
          fecha: fechaSolicitud,  // Fecha de la deuda
        }),
      });

      onSuccess('Préstamo solicitado con éxito.');
    } catch (error) {
      console.error('Error en la solicitud del préstamo:', error);
      onError('Error al conectar con el servidor.');
    }
    */
  };

  return (
    <button className="confirmar-button" onClick={handleConfirmarPrestamo}>
      Confirmar Préstamo
    </button>
  );
};

ConfirmarPrestamoButton.propTypes = {
  numeroCuenta: PropTypes.string.isRequired, // Número de cuenta
  monto: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired, // Monto del préstamo
  plazo: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired, // Plazo en meses
  usuarioId: PropTypes.string.isRequired,    // ID del usuario que solicita el préstamo
  onSuccess: PropTypes.func.isRequired,
  onError: PropTypes.func.isRequired,
};

export default ConfirmarPrestamoButton;

