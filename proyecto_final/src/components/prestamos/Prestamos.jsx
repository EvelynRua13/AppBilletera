import React, { useState, useEffect } from 'react';
import './Prestamos.css';
import Navbar from '../../botones/navbar/Navbar';
import BotonCancelar from '../../botones/BotonCancelar/BotonCancelar';
import ConfirmarPrestamo from '../../botones/ConfirmarPrestamo/ConfirmarPrestamo';
import { useAuth } from '../../Utils/Context';

const Prestamos = () => {
  const { user, loading: authLoading } = useAuth();
  const [numeroCuenta, setNumeroCuenta] = useState('');
  const [tipoCuenta, setTipoCuenta] = useState('ahorros');
  const [valor, setValor] = useState('');
  const [plazo, setPlazo] = useState('');
  const [cuota, setCuota] = useState('');
  const [error, setError] = useState(null);

  // Actualizar los datos cuando el usuario está disponible
  useEffect(() => {
    if (user) {
      setNumeroCuenta(user.numero_cuenta || '');
      setTipoCuenta(user.tipo || 'ahorros');
    }
  }, [user]);

  // Función para calcular la cuota
  const calcularCuota = (valorPrestamo, plazoMeses) => {
    if (valorPrestamo && plazoMeses && !isNaN(valorPrestamo) && !isNaN(plazoMeses)) {
      return ((Number(valorPrestamo) / Number(plazoMeses))).toFixed(2);
    }
    return '';
  };

  // Limpiar campos - solo los editables
  const handleCancel = () => {
    setValor('');
    setPlazo('');
    setCuota('');
  };

  // Efecto para actualizar la cuota cuando el valor o el plazo cambian
  useEffect(() => {
    const nuevaCuota = calcularCuota(valor, plazo);
    setCuota(nuevaCuota);
  }, [valor, plazo]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setError(null);

    if (!valor || isNaN(valor) || Number(valor) <= 0) {
      setError('Por favor, introduce un valor válido para el préstamo.');
      return;
    }

    if (!plazo || isNaN(plazo) || Number(plazo) <= 0) {
      setError('Por favor, introduce un plazo en meses válido.');
      return;
    }
  };

  // Mostrar mensaje de carga mientras se obtienen los datos del usuario
  if (authLoading && !user) {
    return (
      <div className="prestamos-container">
        <Navbar />
        <div className="loading-message">
          <p>Cargando datos de la cuenta...</p>
        </div>
      </div>
    );
  }

  // Mostrar mensaje de error si no hay usuario
  if (!user) {
    return (
      <div className="prestamos-container">
        <Navbar />
        <div className="error-message">
          <p>Error: No se pudo cargar la información de la cuenta. Por favor, inicie sesión nuevamente.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="prestamos-container">
      <Navbar />
      <form onSubmit={handleSubmit} className="prestamos-form">
        <h2>Solicitar Préstamo</h2>
        {error && <p className="error-message">{error}</p>}
        
        <div className="form-group">
          <label htmlFor="numeroCuenta">Número de Cuenta:</label>
          <input
            type="text"
            id="numeroCuenta"
            value={numeroCuenta}
            disabled
          />
        </div>
        
        <div className="form-group">
          <label htmlFor="tipoCuenta">Tipo de Cuenta:</label>
          <select
            id="tipoCuenta"
            value={tipoCuenta}
            disabled
          >
            <option value="ahorros">Ahorros</option>
            <option value="corriente">Corriente</option>
          </select>
        </div>
        
        <div className="form-group">
          <label htmlFor="valor">Valor del Préstamo:</label>
          <input
            type="number"
            id="valor"
            value={valor}
            onChange={(e) => setValor(e.target.value)}
            required
          />
        </div>
        
        <div className="form-group">
          <label htmlFor="plazo">Plazo en Meses:</label>
          <input
            type="number"
            id="plazo"
            value={plazo}
            onChange={(e) => setPlazo(e.target.value)}
            required
          />
        </div>
        
        <div className="form-group">
          <label htmlFor="cuota">Valor de la Cuota:</label>
          <input
            type="text"
            id="cuota"
            value={cuota}
            readOnly
            className="read-only-input"
          />
        </div>
        
        <div className="button-section">
          <ConfirmarPrestamo
            numeroCuenta={numeroCuenta}
            tipoCuenta={tipoCuenta}
            monto={valor}
            plazo={plazo}
            cuota={cuota}
            onSuccess={() => setError(null)}
            onError={setError}
          />
          <BotonCancelar onCancel={handleCancel} />   
        </div>
      </form>
    </div>
  );
};

export default Prestamos;
