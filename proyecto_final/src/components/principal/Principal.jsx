import React, { useEffect, useState } from 'react';
import './Principal.css';
import Navbar from '../../botones/navbar/Navbar';
import { useAuth } from '../../Utils/Context';

const Dashboard = () => {
  const {user, token } = useAuth(); // Obtener solo user y token
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUserData = async () => {
      if (!token) return; // Si no hay token, no hacemos nada

      try {
        const response = await fetch('http://localhost:3000/api/user', {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${token}`, // Usa el token del contexto
          },
        });

        if (!response.ok) {
          throw new Error('Error al cargar los datos del usuario.');
        }

        const data = await response.json();
        setUserData(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, [token]); // Cambia a token en lugar de user

  if (loading) {
    return <p>Cargando datos del usuario...</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  return (
    <div className="dashboard-container">
      <Navbar />

      <header className="dashboard-header">
        <div className="user-info">
          <p>Hola, {user?.nombre}</p> {/* Usa optional chaining para evitar errores */}
        </div>
      </header>

      <div className="balance-section">
        <p className="balance-title">Depósito Bajo Monto</p>
        <h1 className="balance-amount">${userData?.saldo?.toLocaleString() || 0}</h1> {/* Maneja el caso donde userData o saldo no están definidos */}
        <p className="balance-total">Total ${userData?.saldo?.toLocaleString() || 0}</p>
      </div>

      <footer className="account-info">
        <p>Número de Cuenta: {userData?.numero_cuenta}</p> {/* Usa optional chaining */}
      </footer>
    </div>
  );
};

export default Dashboard;

