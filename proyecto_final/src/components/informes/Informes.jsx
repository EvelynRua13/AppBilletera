import React, { useState } from 'react';
import './Informes.css';

const Informes = () => {
  const [usuarioId, setUsuarioId] = useState("12345"); // Ejemplo de ID de usuario
  const [historicoIngresos, setHistoricoIngresos] = useState([]);
  const [historicoEgresos, setHistoricoEgresos] = useState([]);
  const [deudas, setDeudas] = useState(null); // Aquí se almacenarán las deudas (más adelante se traerán del backend)

  const handleVerIngresos = () => {
    // Lógica para traer los ingresos del backend (espacio reservado)
    // Ejemplo: setHistoricoIngresos(response.data.ingresos);
  };

  const handleVerEgresos = () => {
    // Lógica para traer los egresos del backend (espacio reservado)
    // Ejemplo: setHistoricoEgresos(response.data.egresos);
  };

  return (
    <div className="informes-container">
      <h2>Informes del Usuario</h2>
      
      <div className="info-section">
        <p><strong>ID del Usuario:</strong> {usuarioId}</p>
      </div>

      <div className="historico-section">
        <p><strong>Histórico de Ingresos:</strong></p>
        <div className="historico-ingresos">
          {/* Aquí irán los ingresos traídos del backend */}
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
          {/* Aquí irán los egresos traídos del backend */}
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
          {/* Espacio en blanco para la tabla de deudas */}
          {/* Aquí se mostrará la tabla traída del backend */}
          {deudas ? (
            <table>
              <thead>
                <tr>
                  <th>Descripción</th>
                  <th>Monto</th>
                </tr>
              </thead>
              <tbody>
                {/* Muestra los datos de las deudas */}
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
        {/* Botón para ver ingresos */}
        <button onClick={handleVerIngresos} className="button-ingresos">Ver Ingresos</button>

        {/* Botón para ver egresos */}
        <button onClick={handleVerEgresos} className="button-egresos">Ver Egresos</button>
      </div>
    </div>
  );
};

export default Informes;

