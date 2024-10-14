import React, { useState } from 'react';
import './Transacciones.css'; // Importar el archivo CSS
import { useNavigate } from 'react-router-dom';


const Transacciones = () => {
  const [numeroCuentaDestino, setNumeroCuentaDestino] = useState('');
  const [tipoCuenta, setTipoCuenta] = useState('ahorros'); 
  const [valor, setValor] = useState('');
  const [error, setError] = useState(null); // Manejo de errores

  // const handleCancel = () => {
  //   setNumeroCuentaDestino('');
  //   setTipoCuenta('ahorros');
  //   setValor('');
  // };

  const handleSubmit = (e) => {
    e.preventDefault();
    setError(null); // Limpiar errores

  
    if (numeroCuentaDestino.length !== 10) {
      setError('El número de cuenta destino debe tener 10 dígitos.');
      return;
    }

    // Validación del valor
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
        <form className="transacciones-form">
          <h2>Realizar Transacción</h2>
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
            <label htmlFor="valor">Valor de la Transacción:</label>
            <input
              type="number"
              id="valor"
              value={valor}
              onChange={(e) => setValor(e.target.value)}
              required
            />
          </div>
          {/* Botón Cancelar */}
           {/* <BotonCancelar onCancel={handleCancel} /> */}
        </form>
      </div>
    );
  };
  


export default Transacciones;

