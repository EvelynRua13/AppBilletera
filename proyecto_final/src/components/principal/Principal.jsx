import React from 'react';
import './Principal.css';
import Navbar from '../../botones/navbar/Navbar';
import { useAuth } from '../../Utils/Context';

const Dashboard = () => {
  const { user, loading: authLoading, error: authError } = useAuth();

  // Componente de carga
  if (authLoading) {
    return (
      <div className="dashboard-container">
        <Navbar />
        <div className="loading-state">
          <p>Cargando datos del usuario...</p>
        </div>
      </div>
    );
  }

  // Manejo de error
  if (authError) {
    return (
      <div className="dashboard-container">
        <Navbar />
        <div className="error-state">
          <p>Error: {authError}</p>
          <button 
            className="retry-button"
            onClick={() => window.location.reload()}
          >
            Reintentar
          </button>
        </div>
      </div>
    );
  }

  // Si no hay usuario autenticado
  if (!user) {
    return (
      <div className="dashboard-container">
        <Navbar />
        <div className="error-state">
          <p>Por favor, inicie sesión para ver sus datos.</p>
        </div>
      </div>
    );
  }

  // Formatear números para mostrar
  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('es-CO', {
      style: 'currency',
      currency: 'COP',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(amount || 0);
  };

  return (
    <div className="dashboard-container">
      <Navbar />

      <header className="dashboard-header">
        <div className="user-info">
          <p className="user-name">Bienvenido(a) {user.nombre || 'Usuario'}</p>
        </div>
      </header>

      <div className="balance-section">
        <div className="balance-card">
          <p className="balance-title">Depósito Bajo Monto</p>
          <h2 className="balance-amount">
            {formatCurrency(user.saldo)}
          </h2>
          <p className="balance-total">
            Total {formatCurrency(user.saldo)}
          </p>
        </div>

        <div className="account-details">
          <div className="detail-item">
            <span className="detail-label">Número de Cuenta:</span>
            <span className="detail-value">{user.numero_cuenta || 'No disponible'}</span>
          </div>
          <div className="detail-item">
            <span className="detail-label">Tipo de Cuenta:</span>
            <span className="detail-value">{user.tipo || 'No especificado'}</span>
          </div>
        </div>
      </div>

      <footer className="dashboard-footer">
        <p>Última actualización: {new Date().toLocaleString()}</p>
      </footer>
    </div>
  );
};

export default Dashboard;