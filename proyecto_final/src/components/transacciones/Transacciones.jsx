import React, { useEffect, useState } from 'react';
import './Transacciones.css';
import Navbar from '../../botones/navbar/Navbar';
import BotonCancelar from '../../botones/BotonCancelar/BotonCancelar';
import ConfirmarTransaccion from '../../botones/ConfirmarTransaccion/ConfirmarTransaccion';
import { useAuth } from '../../Utils/Context';

const Transacciones = () => {
  const { token, user, loading: authLoading } = useAuth();
  const [numeroCuentaOrigen, setNumeroCuentaOrigen] = useState('');
  const [tipoCuentaOrigen, setTipoCuentaOrigen] = useState('');
  const [numeroCuentaDestino, setNumeroCuentaDestino] = useState('');
  const [tipoCuentaDestino, setTipoCuentaDestino] = useState('ahorros');
  const [valor, setValor] = useState('');
  const [error, setError] = useState(null);

  useEffect(() => {
    // Si tenemos los datos del usuario, actualizar los campos
    if (user) {
      setNumeroCuentaOrigen(user.numero_cuenta || '');
      setTipoCuentaOrigen(user.tipo || '');
    }
  }, [user]);

  const handleCancel = () => {
    setNumeroCuentaDestino('');
    setTipoCuentaDestino('ahorros');
    setValor('');
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setError(null);

    if (numeroCuentaOrigen.length !== 10) {
      setError('El número de cuenta origen debe tener 10 dígitos.');
      return;
    }

    if (numeroCuentaDestino.length !== 10) {
      setError('El número de cuenta destino debe tener 10 dígitos.');
      return;
    }

    if (!valor || isNaN(valor) || Number(valor) <= 0) {
      setError('Por favor, introduce un valor válido.');
      return;
    }
  };

  // Solo mostrar carga cuando realmente estamos esperando datos de autenticación
  if (authLoading && !user) {
    return (
      <div className="transacciones-container">
        <Navbar />
        <div className="loading-message">
          <p>Cargando datos de la cuenta...</p>
        </div>
      </div>
    );
  }

  // Si no hay token o usuario, mostrar error
  if (!token || !user) {
    return (
      <div className="transacciones-container">
        <Navbar />
        <div className="error-message">
          <p>Error: No se pudo cargar la información de la cuenta. Por favor, inicie sesión nuevamente.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="transacciones-container">
      <Navbar />
      <form onSubmit={handleSubmit} className="transacciones-form">
        <h2>Realizar Transacción</h2>
        {error && <p className="error-message">{error}</p>}

        <div className="form-group">
          <label htmlFor="numeroCuentaOrigen">Número de Cuenta Origen:</label>
          <input
            type="text"
            id="numeroCuentaOrigen"
            value={numeroCuentaOrigen}
            disabled
          />
        </div>

        <div className="form-group">
          <label htmlFor="tipoCuentaOrigen">Tipo de Cuenta Origen:</label>
          <select
            id="tipoCuentaOrigen"
            value={tipoCuentaOrigen}
            disabled
          >
            <option value="ahorros">Ahorros</option>
            <option value="corriente">Corriente</option>
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="numeroCuentaDestino">Número de Cuenta Destino:</label>
          <input
            type="text"
            id="numeroCuentaDestino"
            value={numeroCuentaDestino}
            onChange={(e) => setNumeroCuentaDestino(e.target.value)}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="tipoCuentaDestino">Tipo de Cuenta Destino:</label>
          <select
            id="tipoCuentaDestino"
            value={tipoCuentaDestino}
            onChange={(e) => setTipoCuentaDestino(e.target.value)}
          >
            <option value="ahorros">Ahorros</option>
            <option value="corriente">Corriente</option>
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="valor">Valor de la Transacción:</label>
          <input
            type="number"
            id="valor"
            value={valor}
            onChange={(e) => setValor(e.target.value)}
            required
          />
        </div>

        <div className="button-section">
          <ConfirmarTransaccion
            cuentaDestino={numeroCuentaDestino}
            tipo={tipoCuentaDestino}
            monto={valor}
            cuentaOrigen={numeroCuentaOrigen}
            onSuccess={() => setError(null)}
            onError={setError}
          />
          <BotonCancelar onCancel={handleCancel} />
        </div>
      </form>
    </div>
  );
};

export default Transacciones;