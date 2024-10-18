import React from 'react';
import './Principal.css'; <<<<<<< Evelyn
import Navbar from '../../botones/navbar/Navbar';
import BotonDepositos from '../../botones/BotonDepositos/BotonDepositos';
import BotonTransacciones from '../../botones/BotonTransacciones/BotonTransacciones';
import BotonRetiros from '../../botones/BotonRetiros/BotonRetiros';
import BotonPrestamos from '../../botones/BotonPrestamos/BotonPrestamos';
import BotonInformes from '../../botones/BotonInformes/BotonInformes';
import BotonLogOut from '../../botones/BotonLogOut/BotonLogOut';

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
      <div className="button-section">
        <BotonDepositos />
        <BotonTransacciones />
        <BotonRetiros />
        <BotonPrestamos />
        <BotonInformes />
        <BotonLogOut />  
      </div>
      <footer className="account-info">
        <p>Número de Cuenta: {user.accountNumber}</p>
      </footer>
    </div>
  );
};

export default Dashboard;
