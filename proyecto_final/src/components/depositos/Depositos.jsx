import React, { useState } from 'react';
import './Depositos.css';
import Navbar from '../../botones/navbar/Navbar';
import BotonCancelar from '../../botones/BotonCancelar/BotonCancelar';
import ConfirmarDeposito from '../../botones/ConfirmarDeposito/ConfirmarDeposito';

const Depositos = () => {
  const [cuentaUsuario, setCuentaUsuario] = useState(''); 
  const [numeroCuenta, setNumeroCuenta] = useState('');
  const [tipoCuenta, setTipoCuenta] = useState('ahorros'); 
  const [valor, setValor] = useState('');
  const [error, setError] = useState(null); 

  //Limpiar campos
  const onCancel = () => {
    setCuentaUsuario('');
    setNumeroCuenta('');
    setTipoCuenta('ahorros');
    setValor('');
   };

  const handleSubmit = (e) => {
    e.preventDefault();
    setError(null); 

    if (cuentaUsuario.length !== 10) {
      setError('Tu número de cuenta debe tener 10 dígitos.');
      return;
    }

    if (numeroCuenta.length !== 10) {
      setError('El número de cuenta destino debe tener 10 dígitos.');
      return;
    }

    if (!valor || isNaN(valor) || Number(valor) <= 0) {
      setError('Por favor, introduce un valor válido.');
      return;
    }

    // Aquí iría la lógica para procesar el depósito más adelante
  };

  return (
    
    <div className="depositos-container">
      <Navbar />
      <form onSubmit={handleSubmit} className="depositos-form">
        <h2>Realizar Depósito</h2>
        {error && <p className="error-message">{error}</p>} {/* Mostrar mensaje de error */}
        <div className="form-group">
          <label htmlFor="cuentaUsuario">Cuenta:</label>
          <input
            type="text"
            id="cuentaUsuario"
            value={cuentaUsuario}
            placeholder="Ingresa el número de tu cuenta para realizar el depósito"
            onChange={(e) => setCuentaUsuario(e.target.value)}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="numeroCuenta">Número de Cuenta Destino:</label>
          <input
            type="text"
            id="numeroCuenta"
            value={numeroCuenta}
            onChange={(e) => setNumeroCuenta(e.target.value)}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="tipoCuenta">Tipo de Cuenta Destino:</label>
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
        <div className="button-section">
          <ConfirmarDeposito/>
          <BotonCancelar onCancel={onCancel}/>   
        </div>
      </form>
    </div>
  );
};

export default Depositos;

