import React, { useState } from 'react';
import './Informes.css';
import { useNavigate } from 'react-router-dom';
import Navbar from '../../botones/navbar/Navbar';
import { useAuth } from '../../Utils/Context';

const Informes = () => {
  const { user } = useAuth(); 
  const [historicoIngresos, setHistoricoIngresos] = useState([]);
  const [historicoEgresos, setHistoricoEgresos] = useState([]);
  const [deudas, setDeudas] = useState(null);

  const handleVerIngresos = () => {
    // Lógica para traer los ingresos del backend (espacio reservado)
  };

  const handleVerEgresos = () => {
    // Lógica para traer los egresos del backend (espacio reservado)
  };

  return (
    <div className="informes-container">
      <Navbar />
      <h2>Informes del Usuario</h2>
      
      <div className="info-section">
        <p><strong>Cuenta del Usuario:</strong> {user ? user.numero_cuenta : 'Cargando...'}</p>
      </div>

      <div className="historico-section">
        <p><strong>Histórico de Ingresos:</strong></p>
        <div className="historico-ingresos">
          {historicoIngresos.length === 0 ? (
            <p>No hay datos de ingresos disponibles</p>
          ) : (
            <ul>
              {historicoIngresos.map((ingreso, index) => (
                <li key={index}>{ingreso}</li>
              ))}
            </ul>
          )}
        </div>
        
        <p><strong>Histórico de Egresos:</strong></p>
        <div className="historico-egresos">
          {historicoEgresos.length === 0 ? (
            <p>No hay datos de egresos disponibles</p>
          ) : (
            <ul>
              {historicoEgresos.map((egreso, index) => (
                <li key={index}>{egreso}</li>
              ))}
            </ul>
          )}
        </div>
      </div>

      <div className="deudas-section">
        <p><strong>Deudas:</strong></p>
        <div className="deudas-table">
          {deudas ? (
            <table>
              <thead>
                <tr>
                  <th>Descripción</th>
                  <th>Monto</th>
                </tr>
              </thead>
              <tbody>
                {deudas.map((deuda, index) => (
                  <tr key={index}>
                    <td>{deuda.descripcion}</td>
                    <td>{deuda.monto}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <p>No hay datos de deudas disponibles</p>
          )}
        </div>
      </div>

      <div className="button-section">
        <button onClick={handleVerIngresos} className="button-ingresos">Ver Ingresos</button>
        <button onClick={handleVerEgresos} className="button-egresos">Ver Egresos</button>
      </div>
    </div>
  );
};

export default Informes;
