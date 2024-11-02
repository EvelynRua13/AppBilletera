import React from 'react';
import PropTypes from 'prop-types'; 
import './ConfirmarPrestamo.css'; 
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../Utils/Context';

const ConfirmarPrestamoButton = ({ numeroCuenta, monto, plazo, usuarioId, onSuccess, onError }) => {
  const navigate = useNavigate();
  const {token, refreshUser } = useAuth();
  
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
    try {
      const fechaSolicitud = new Date();

      // 1. Agregar el préstamo a la tabla de Préstamos
      let prestamosResponse = await fetch('http://localhost:3000/api/prestamos', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({
          cuentaId: numeroCuenta,  // ID del usuario que solicita el préstamo
          monto: monto,           // Monto del préstamo
          plazo: plazo,           // Plazo en meses
          estado: 'aprobado',    // Estado inicial del préstamo
          fecha_solicitud: fechaSolicitud, // Fecha de la solicitud
        }),
      });
      if (!prestamosResponse.ok) {
        const errorData = await prestamosResponse.json();
        throw new Error(errorData.message || 'Error al realizar el depósito');
      }

      // 2. Agregar a la tabla de Ingresos
      prestamosResponse = await fetch('http://localhost:3000/api/ingresos', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({
          cuentaDestino: numeroCuenta,  // ID del usuario que recibe el ingreso
          monto: monto,           // Monto del ingreso
          fecha: fechaSolicitud,  // Fecha de ingreso
        }),
      });
       

      if (!prestamosResponse.ok) {
        const errorData = await prestamosResponse.json();
        throw new Error(errorData.message || 'Error al agregar el ingreso');
      }

      // Actualizar la información del usuario
      await refreshUser();
      
      onSuccess('Prestamo realizado con éxito');
      window.alert("Prestamo Realizado con éxito");
      navigate('/principal');
      return true;



    } catch (error) {
      console.error('Error en la solicitud del préstamo:', error);
      onError('No se pudo procesar el prestamo.' + error.message);
      window.alert("No se puede procesar prestamo porque ya tiene uno pendiente");
      navigate('/principal')
    }
  };

  return (
    <button className="confirmar-button" onClick={handleConfirmarPrestamo}>
      Confirmar
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

