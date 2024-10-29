import React, { useState, useEffect } from 'react';
import './Retiros.css';
import Navbar from '../../botones/navbar/Navbar';
import BotonCancelar from '../../botones/BotonCancelar/BotonCancelar';
import ConfirmarRetiro from '../../botones/ConfirmarRetiro/ConfirmarRetiro';
import { useAuth } from '../../Utils/Context';

const Retiros = () => {
  const { user, loading: authLoading } = useAuth();
  const [numeroCuenta, setNumeroCuenta] = useState('');
  const [tipoCuenta, setTipoCuenta] = useState('');
  const [valor, setValor] = useState('');
  const [error, setError] = useState(null);

  // Actualizar los datos cuando el usuario está disponible
  useEffect(() => {
    if (user) {
      setNumeroCuenta(user.numero_cuenta || '');
      setTipoCuenta(user.tipo || 'ahorros');
    }
  }, [user]);

  const handleCancel = () => {
    setValor('');
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setError(null);

    if (numeroCuenta.length !== 10) {
      setError('El número de cuenta debe tener 10 dígitos.');
      return;
    }

    if (!valor || isNaN(valor) || Number(valor) <= 0) {
      setError('Por favor, introduce un valor válido para el retiro.');
      return;
    }

    // La lógica de retiro se maneja en el componente ConfirmarRetiro
  };

  // Mostrar mensaje de carga mientras se obtienen los datos del usuario
  if (authLoading && !user) {
    return (
      <div className="retiros-container">
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
      <div className="retiros-container">
        <Navbar />
        <div className="error-message">
          <p>Error: No se pudo cargar la información de la cuenta. Por favor, inicie sesión nuevamente.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="retiros-container">
      <Navbar />
      <form onSubmit={handleSubmit} className="retiros-form">
        <h2>Realizar Retiro</h2>
        {error && <p className="error-message">{error}</p>}
        
        <div className="form-group">
          <label htmlFor="numeroCuenta">Cuenta:</label>
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
          <label htmlFor="valor">Valor a Retirar:</label>
          <input
            type="number"
            id="valor"
            value={valor}
            onChange={(e) => setValor(e.target.value)}
            required
          />
        </div>

        <div className="button-section">
          <ConfirmarRetiro
            numeroCuenta={numeroCuenta}
            tipoCuenta={tipoCuenta}
            monto={valor}
            onSuccess={() => setError(null)}
            onError={setError}
          />
          <BotonCancelar onCancel={handleCancel} />   
        </div>
      </form>
    </div>
  );
};

export default Retiros;