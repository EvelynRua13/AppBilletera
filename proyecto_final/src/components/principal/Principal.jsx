import React from 'react';
import './Principal.css'; 
import Navbar from '../../botones/navbar/Navbar';


const Dashboard = () => {
  const user = {
    name: "Jose",
    accountNumber: "1234567890",
    balance: 400.63
  };

  return (
    <div className="dashboard-container">
      <Navbar/>
      
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

      <footer className="account-info">
        <p>Número de Cuenta: {user.accountNumber}</p>
      </footer>

    </div>
  );
};

export default Dashboard;
