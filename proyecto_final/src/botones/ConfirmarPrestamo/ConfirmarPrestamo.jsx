import React, { useState } from 'react';
import PropTypes from 'prop-types'; 
import './ConfirmarPrestamo.css'; 
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../Utils/Context';

const ConfirmarPrestamoButton = ({ numeroCuenta, monto, plazo, usuarioId, onSuccess, onError }) => {
  const navigate = useNavigate();
  const { token, refreshUser } = useAuth();
  const [isProcessing, setIsProcessing] = useState(false);
  
  const handleConfirmarPrestamo = async () => {
    if (isProcessing) return; // Prevenir múltiples clicks

    if (!monto || isNaN(monto) || Number(monto) <= 0) {
      onError('Por favor, introduce un monto válido.');
      return;
    }

    if (!plazo || isNaN(plazo) || Number(plazo) <= 0) {
      onError('Por favor, introduce un plazo en meses válido.');
      return; 
    }

    setIsProcessing(true);

    try {
      const fechaSolicitud = new Date();

      // 1. Agregar el préstamo
      const prestamosResponse = await fetch('http://localhost:3000/api/prestamos', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({
          cuentaId: numeroCuenta,
          monto: monto,
          plazo: plazo,
          estado: 'aprobado',
          fecha_solicitud: fechaSolicitud,
        }),
      });

      if (!prestamosResponse.ok) {
        const errorData = await prestamosResponse.json();
        throw new Error(errorData.message || 'Error al realizar el préstamo');
      }

      // 2. Registrar el ingreso
      const ingresosResponse = await fetch('http://localhost:3000/api/ingresos', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({
          cuentaDestino: numeroCuenta,
          monto: monto,
          fecha: fechaSolicitud,
        }),
      });
       
      if (!ingresosResponse.ok) {
        const errorData = await ingresosResponse.json();
        throw new Error(errorData.message || 'Error al registrar el ingreso');
      }

      // 3. Actualizar la información del usuario
      await refreshUser();
      
      // 4. Esperar un momento para asegurar que los estados se actualicen
      await new Promise(resolve => setTimeout(resolve, 500));
      
      onSuccess('Préstamo realizado con éxito');
      window.alert("Préstamo realizado con éxito");
      
      // 5. Navegar a la página principal
      navigate('/principal', { replace: true });

    } catch (error) {
      console.error('Error en la solicitud del préstamo:', error);
      
      let errorMessage = 'No se puede procesar el préstamo ya tienes uno sin pagar. ';
      
      onError(errorMessage);
      window.alert(errorMessage);
      navigate('/principal', { replace: true });
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <button 
      className={`confirmar-button ${isProcessing ? 'processing' : ''}`} 
      onClick={handleConfirmarPrestamo}
      disabled={isProcessing}
    >
      {isProcessing ? 'Procesando...' : 'Confirmar'}
    </button>
  );
};

ConfirmarPrestamoButton.propTypes = {
  numeroCuenta: PropTypes.string.isRequired,
  monto: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  plazo: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  usuarioId: PropTypes.string.isRequired,
  onSuccess: PropTypes.func.isRequired,
  onError: PropTypes.func.isRequired,
};

export default ConfirmarPrestamoButton;