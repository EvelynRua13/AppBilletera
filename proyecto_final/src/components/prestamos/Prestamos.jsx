import React, { useState, useEffect } from 'react';
import './Prestamos.css';


import Navbar from '../../botones/navbar/Navbar';

import BotonPrincipal from '../../botones/BotonPrincipal/BotonPrincipal';
import BotonCancelar from '../../botones/BotonCancelar/BotonCancelar';

const Prestamos = () => {
  const [numeroCuenta, setNumeroCuenta] = useState('');
  const [tipoCuenta, setTipoCuenta] = useState('ahorros'); // Valor por defecto
  const [valor, setValor] = useState('');
  const [plazo, setPlazo] = useState('');
  const [cuota, setCuota] = useState('');
  const [error, setError] = useState(null); // Manejo de errores

  // Función para calcular la cuota
  const calcularCuota = (valorPrestamo, plazoMeses) => {
    if (valorPrestamo && plazoMeses && !isNaN(valorPrestamo) && !isNaN(plazoMeses)) {
      return ((Number(valorPrestamo) / Number(plazoMeses))).toFixed(2); // Formato con 2 decimales
    }
    return '';
  };

  //Limpiar campos
  const handleCancel = () => {
    setNumeroCuenta('');
    setTipoCuenta('ahorros');
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
    setError(null); // Limpiar errores

    // Validación del número de cuenta (debe tener 10 dígitos)
    if (numeroCuenta.length !== 10) {
      setError('El número de cuenta debe tener 10 dígitos.');
      return;
    }

    // Validación del valor del préstamo
    if (!valor || isNaN(valor) || Number(valor) <= 0) {
      setError('Por favor, introduce un valor válido.');
      return;
    }

    // Validación del plazo en meses
    if (!plazo || isNaN(plazo) || Number(plazo) <= 0) {
      setError('Por favor, introduce un plazo en meses válido.');
      return;
    }

    // Aquí iría la lógica para procesar el préstamo más adelante
  };

  return (
    <div className="prestamos-container">
      <Navbar/>
      <form onSubmit={handleSubmit} className="prestamos-form">
        <h2>Solicitar Préstamo</h2>
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
            readOnly // Campo no editable
          />
        </div>
        
        {/* Espacio para botones */}
        <div className="button-section">
          <BotonCancelar onClick={handleCancel}/>   
        </div>

    
      </form>
    </div>
  );
};

export default Prestamos;
