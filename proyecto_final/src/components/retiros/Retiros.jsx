import React, { useState } from 'react';
import './Retiros.css';
import { useNavigate } from 'react-router-dom';


const Retiros = () => {
  const [valor, setValor] = useState('');
  const [error, setError] = useState(null); // Manejo de errores

  const handleSubmit = (e) => {
    e.preventDefault();
    setError(null); // Limpiar errores

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
        {/* <button type="submit" className="confirm-button">Confirmar</button> */}
        {/* <button type="button" className="cancel-button" onClick={handleCancel}>Cancelar</button> */}
      </form>
    </div>
  );
};

export default Retiros;
