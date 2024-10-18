import React from 'react';
import './Navbar.css';
import BotonPrincipal from '../BotonPrincipal/BotonPrincipal';
import BotonDepositos from '../BotonDepositos/BotonDepositos';
import BotonTransacciones from '../BotonTransacciones/BotonTransacciones';
import BotonRetiros from '../BotonRetiros/BotonRetiros';
import BotonPrestamos from '../BotonPrestamos/BotonPrestamos';
import BotonInformes from '../BotonInformes/BotonInformes';
import BotonLogOut from '../BotonLogOut/BotonLogOut';

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="navbar-container">
        <BotonPrincipal />
        <BotonDepositos />
        <BotonTransacciones />
        <BotonRetiros />
        <BotonPrestamos />
        <BotonInformes />
        <BotonLogOut />
      </div>
    </nav>
  );
};

export default Navbar;