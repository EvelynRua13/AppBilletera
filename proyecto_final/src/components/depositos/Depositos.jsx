import React, { useState } from 'react';
import './Depositos.css';

const Depositos = () => {
  const [numeroCuenta, setNumeroCuenta] = useState('');
  const [tipoCuenta, setTipoCuenta] = useState('ahorros'); // Valor por defecto
  const [valor, setValor] = useState('');
  const [error, setError] = useState(null); // Manejo de errores

  const handleSubmit = (e) => {
    e.preventDefault();
    setError(null); // Limpiar errores

    // Validación del número de cuenta (debe tener 10 dígitos)
    if (numeroCuenta.length !== 10) {
      setError('El número de cuenta debe tener 10 dígitos.');
      return;
    }

    // Validación del valor del depósito
    if (!valor || isNaN(valor) || Number(valor) <= 0) {
      setError('Por favor, introduce un valor válido.');
      return;
    }

    // Aquí iría la lógica para procesar el depósito más adelante

    // Espacio para botones
    // <button type="submit" className="confirm-button">Confirmar</button>
    // <button type="button" className="cancel-button" onClick={handleCancel}>Cancelar</button>
  };

  return (
    <div className="depositos-container">
      <form onSubmit={handleSubmit} className="depositos-form">
        <h2>Realizar Depósito</h2>
        {error && <p className="error-message">{error}</p>} {/* Mostrar mensaje de error */}
        <div className="form-group">
          <label htmlFor="numeroCuenta">Número de Cuenta:</label>
          <input
            type="text"
            id="numeroCuenta"
            value={numeroCuenta}
            onChange={(e) => setNumeroCuenta(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="tipoCuenta">Tipo de Cuenta:</label>
          <select
            id="tipoCuenta"
            value={tipoCuenta}
            onChange={(e) => setTipoCuenta(e.target.value)}
          >
            <option value="ahorros">Ahorros</option>
            <option value="corriente">Corriente</option>
          </select>
        </div>
        <div className="form-group">
          <label htmlFor="valor">Valor del Depósito:</label>
          <input
            type="number"
            id="valor"
            value={valor}
            onChange={(e) => setValor(e.target.value)}
            required
          />
        </div>
        {/* Espacio para botones */}
        {/* <button type="submit" className="confirm-button">Confirmar</button> */}
        {/* <button type="button" className="cancel-button" onClick={handleCancel}>Cancelar</button> */}
      </form>
    </div>
  );
};

export default Depositos;
