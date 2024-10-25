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
  const [mensajeExito, setMensajeExito] = useState(''); // Mensaje de éxito
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null); // Limpiar errores
    setMensajeExito(''); // Limpiar mensajes anteriores
  
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
      setError('El número de cuenta debe tener 10 dígitos.');
      return;
    }
  
    // Lógica para enviar los datos al backend
    try {
      const response = await fetch('http://localhost:3000/api/usuarios', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          nombre,
          email,
          password,
          numero_cuenta: numeroCuenta,
          tipo: tipoCuenta,
        }),
      });
  
      const data = await response.json();
  
      if (response.ok) {
        setMensajeExito('Registro exitoso, redirigiendo...');
        setTimeout(() => {
          navigate('/'); // Redirigir a la página de login después de un registro exitoso
        }, 2000);
      } else {
        setError(data.message || 'Error al registrar el usuario.');
      }
    } catch (error) {
      console.error('Error en la solicitud:', error);
      setError('Error en el servidor. Inténtalo nuevamente más tarde.');
    }
  };
  
  const handleBackToLogin = () => {
    navigate('/'); // Redirigir a la página de login
  };
  
  return (
    <div className="registro-container">
      <form onSubmit={handleSubmit} className="registro-form">
        <h2>Registro</h2>
        {error && <p className="error-message">{error}</p>} {/* Mostrar mensaje de error */}
        {mensajeExito && <p className="success-message">{mensajeExito}</p>} {/* Mostrar mensaje de éxito */}
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
        <button type="submit" className="registro-button">Registrarse</button>
        <button type="button" className="back-button" onClick={handleBackToLogin}>
          Iniciar Sesión
        </button>
      </form>
    </div>
  );
};

export default Registro;
