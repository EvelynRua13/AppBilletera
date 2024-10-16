import React, { useState } from 'react';
import './Retiros.css';


import BotonPrincipal from '../../botones/BotonPrincipal/BotonPrincipal';
import BotonLogOut from '../../botones/BotonLogOut/BotonLogOut';
import BotonCancelar from '../../botones/BotonCancelar/BotonCancelar';

const Retiros = () => {
  const [numeroCuenta, setNumeroCuenta] = useState(''); // Campo para el número de cuenta
  const [valor, setValor] = useState(''); // Valor del retiro
  const [error, setError] = useState(null); // Manejo de errores

  const handleCancel = () => {
    setNumeroCuenta('');
    setValor('');
   };

  const handleSubmit = (e) => {
    e.preventDefault();
    setError(null); // Limpiar errores

    // Validación del número de cuenta
    if (numeroCuenta.length !== 10) {
      setError('El número de cuenta debe tener 10 dígitos.');
      return;
    }

    // Validación del valor a retirar
    if (!valor || isNaN(valor) || Number(valor) <= 0) {
      setError('Por favor, introduce un valor válido para el retiro.');
      return;
    }

    // Aquí iría la lógica para procesar el retiro más adelante

    // Espacio para botones
    // <button type="submit" className="confirm-button">Confirmar</button>
    // <button type="button" className="cancel-button" onClick={handleCancel}>Cancelar</button>
  };

  return (
    <div className="retiros-container">
      <form onSubmit={handleSubmit} className="retiros-form">
        <h2>Realizar Retiro</h2>
        {error && <p className="error-message">{error}</p>} {/* Mostrar mensaje de error */}
        
        {/* Campo para el número de cuenta */}
        <div className="form-group">
          <label htmlFor="numeroCuenta">Cuenta:</label>
          <input
            type="text"
            id="numeroCuenta"
            value={numeroCuenta}
            placeholder="Escribe el número de tu cuenta para procesar el retiro"
            onChange={(e) => setNumeroCuenta(e.target.value)}
            required
          />
        </div>

        {/* Valor a Retirar */}
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

        {/* Espacio para botones */}
        <div className="button-section">
          <BotonPrincipal/>
          <BotonLogOut />  
          <BotonCancelar onClick={handleCancel}/>   
        </div>
        
      </form>
    </div>
  );
};

export default Retiros;

