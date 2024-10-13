import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Registro.css';

const Registro = () => {
  const [nombre, setNombre] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [numeroCuenta, setNumeroCuenta] = useState('');
  const [tipoCuenta, setTipoCuenta] = useState('ahorros');
  const [error, setError] = useState(null); // Manejar errores

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    setError(null); // Limpiar errores

    // Validaciones
    if (!nombre || !email || !password || !numeroCuenta) {
      setError('Todos los campos son obligatorios.');
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // Expresión regular para validar el correo
    if (!emailRegex.test(email)) {
      setError('Por favor, introduce un correo electrónico válido.');
      return;
    }

    if (numeroCuenta.length !== 10) {
      setError('El número de celular debe tener 10 dígitos.');
      return;
    }

    // Aquí iría la lógica para enviar los datos al backend más adelante

    // Si todo es válido, redirigir al login
    navigate('/'); // Redirigir a la página de login
  };

  const handleBackToLogin = () => {
    navigate('/'); // Redirigir a la página de login
  };

  return (
    <div className="registro-container">
      <form onSubmit={handleSubmit} className="registro-form">
        <h2>Registro</h2>
        {error && <p className="error-message">{error}</p>} {/* Mostrar mensaje de error */}
        <div className="form-group">
          <label htmlFor="nombre">Nombre:</label>
          <input
            type="text"
            id="nombre"
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="email">Correo:</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Contraseña:</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
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
        <button type="submit" className="registro-button">Registrar</button>
        
        {/* Botón para volver a la página de login */}
        <button type="button" className="back-button" onClick={handleBackToLogin}>
          Volver al Login
        </button>
      </form>
    </div>
  );
};

export default Registro;



