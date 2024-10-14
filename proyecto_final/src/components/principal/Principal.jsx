import React from 'react';
import './Principal.css'; 
import { useNavigate } from 'react-router-dom';


const Dashboard = () => {
  const user = {
    name: "Jose",
    accountNumber: "1234567890",
    balance: 400.63
  };

  return (
    <div className="dashboard-container">
      <header className="dashboard-header">
        <div className="user-info">
          <p>Hola, {user.name}</p>
        </div>
        <div className="actions">
          {/* Espacio para el botón de cerrar sesión */}
          {/* <button className="logout-btn">Cerrar Sesión</button> */}
        </div>
      </header>
      
      <div className="balance-section">
        <p className="balance-title">Depósito Bajo Monto</p>
        <h1 className="balance-amount">${user.balance.toLocaleString()}</h1>
        <p className="balance-total">Total ${user.balance.toLocaleString()}</p>
      </div>

      <div className="button-section">
        {/* Espacio para botón de Transacciones */}
        {/* <button className="transacciones-button">Transacciones</button> */}

        {/* Espacio para botón de Préstamos */}
        {/* <button className="prestamos-button">Préstamos</button> */}

        {/* Espacio para botón de Retiros */}
        {/* <button className="retiros-button">Retirar</button> */}

        {/* Espacio para botón de Depósitos */}
        {/* <button className="depositos-button">Depositar</button> */}

        {/* Espacio para botón de Informes */}
        {/* <button className="informes-button">Ir a Informes</button> */}
      </div>

      <footer className="account-info">
        <p>Número de Cuenta: {user.accountNumber}</p>
      </footer>
    </div>
  );
};

export default Dashboard;
