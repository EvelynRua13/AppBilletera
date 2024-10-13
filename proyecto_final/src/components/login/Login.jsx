import React, { useState } from 'react';
import './Login.css';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Lógica de validación de credenciales
    if (email === 'user@example.com' && password === 'password123') {
      // Redirige al dashboard si las credenciales son correctas
      navigate('/principal');
    } else {
      // Muestra error si las credenciales son incorrectas
      setError('Credenciales incorrectas');
    }
  };

  const handleRegister = () => {
    // Redirige a la página de registro
    navigate('/registro');
  };

  return (
    <div className="login-container">
      <form onSubmit={handleSubmit} className="login-form">
        <h2>Bienvenido</h2>
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

        {/* Mostrar el error de autenticación si existe */}
        {error && <p className="error-message">{error}</p>}

        {/* Botón para iniciar sesión */}
        <button type="submit" className="login-button">Iniciar sesión</button>

        {/* Botón para registrarse */}
        <button type="button" className="register-button" onClick={handleRegister}>
          Registrarse
        </button>
      </form>
    </div>
  );
};

export default Login;

