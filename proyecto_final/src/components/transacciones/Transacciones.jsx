import React, { useState } from 'react';
import './Transacciones'; // Importar el archivo CSS
import { useNavigate } from 'react-router-dom';

import BotonPrincipal from '../../botones/BotonPrincipal/BotonPrincipal';
import BotonLogOut from '../../botones/BotonLogOut/BotonLogOut';
import BotonCancelar from '../../botones/BotonCancelar/BotonCancelar';

const Transacciones = () => {
  const [numeroCuentaOrigen, setNumeroCuentaOrigen] = useState('');  // Cuenta de origen
  const [tipoCuentaOrigen, setTipoCuentaOrigen] = useState('ahorros');  // Tipo de cuenta de origen
  const [numeroCuentaDestino, setNumeroCuentaDestino] = useState('');  // Cuenta destino
  const [tipoCuentaDestino, setTipoCuentaDestino] = useState('ahorros');  // Tipo de cuenta destino
  const [valor, setValor] = useState('');  // Valor de la transacción
  const [error, setError] = useState(null); // Manejo de errores

   const handleCancel = () => {
     setNumeroCuentaDestino('');
     setTipoCuenta('ahorros');
     setValor('');
    };

  const handleSubmit = (e) => {
    e.preventDefault();
    setError(null); // Limpiar errores

    // Validación de la cuenta de origen
    if (numeroCuentaOrigen.length !== 10) {
      setError('El número de cuenta origen debe tener 10 dígitos.');
      return;
    }

    // Validación de la cuenta destino
    if (numeroCuentaDestino.length !== 10) {
      setError('El número de cuenta destino debe tener 10 dígitos.');
      return;
    }

    // Validación del valor de la transacción
    if (!valor || isNaN(valor) || Number(valor) <= 0) {
      setError('Por favor, introduce un valor válido.');
      return;
    }

    // Aquí iría la lógica para procesar la transacción más adelante

   
    // <button type="submit" className="confirm-button">Confirmar</button>
    // <button type="button" className="cancel-button" onClick={handleCancel}>Cancelar</button>
  };

  return (
    <div className="transacciones-container">
      <form onSubmit={handleSubmit} className="transacciones-form">
        <h2>Realizar Transacción</h2>
        {error && <p className="error-message">{error}</p>} {/* Mostrar mensaje de error */}
        
        {/* Número de Cuenta Origen */}
        <div className="form-group">
          <label htmlFor="numeroCuentaOrigen">Número de Cuenta Origen:</label>
          <input
            type="text"
            id="numeroCuentaOrigen"
            value={numeroCuentaOrigen}
            onChange={(e) => setNumeroCuentaOrigen(e.target.value)}
            required
          />
        </div>
        
        {/* Tipo de Cuenta Origen */}
        <div className="form-group">
          <label htmlFor="tipoCuentaOrigen">Tipo de Cuenta Origen:</label>
          <select
            id="tipoCuentaOrigen"
            value={tipoCuentaOrigen}
            onChange={(e) => setTipoCuentaOrigen(e.target.value)}
          >
            <option value="ahorros">Ahorros</option>
            <option value="corriente">Corriente</option>
          </select>
        </div>

        {/* Número de Cuenta Destino */}
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

        {/* Tipo de Cuenta Destino */}
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

        {/* Valor de la Transacción */}
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

        {/* Botones (Confirmar y Cancelar) */}
        <div className="button-section">
          <BotonPrincipal/>
          <BotonLogOut />  
          <BotonCancelar onClick={handleCancel}/>   
        </div>
      
      </form>
    </div>
  );
};

export default Transacciones;

