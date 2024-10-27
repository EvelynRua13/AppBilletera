import React, { useState } from 'react';
import './Login.css';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../Utils/Context.jsx';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false); // Estado para manejar la carga
  const navigate = useNavigate();
  const { login } = useAuth(); // Obtener la función login del contexto

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null); // Limpiar errores previos
    setLoading(true); // Iniciar estado de carga

    try {
      const response = await fetch('http://localhost:3000/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      if (!response.ok) {
        const data = await response.json(); // Mover la obtención de datos fuera de la verificación
        console.error('Error de respuesta:', data); // Imprimir el error de respuesta
        setError(data.message || 'Error al iniciar sesión.'); // Mostrar mensaje de error
        return; // Salir si hay un error
      }

      const data = await response.json();
      login(data.token); // Llamar a la función login con el token recibido
      navigate('/principal'); // Redirigir al usuario
    } catch (error) {
      console.error('Error en la solicitud:', error);
      setError('Error en el servidor. Inténtalo nuevamente más tarde.'); // Mensaje genérico para el usuario
    } finally {
      setLoading(false); // Finalizar estado de carga
    }
  };

  const handleRegister = () => {
    navigate('/registro'); // Redirigir a la página de registro
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

        {error && <p className="error-message">{error}</p>} {/* Mostrar mensajes de error */}
        
        <button type="submit" className="login-button" disabled={loading}>
          {loading ? 'Cargando...' : 'Iniciar sesión'}
        </button>
        <button type="button" className="register-button" onClick={handleRegister}>
          Registrarse
        </button>
      </form>
    </div>
  );
};

export default Login;
