import React from 'react';
import { useNavigate } from 'react-router-dom'; 
import './BotonInformes.css'; 

const BotonIrAInformes = () => {
  const navigate = useNavigate();

  const handleIrAInformes = async () => {
    // Aquí iría la lógica para solicitar los datos al backend
    // Ejemplo de la estructura 
    
    /*
    try {
      // Lógica para traer los datos de ingresos, egresos y deudas
      const ingresosResponse = await fetch('/api/ingresos');
      const egresosResponse = await fetch('/api/egresos');
      const deudasResponse = await fetch('/api/deudas');

      const ingresos = await ingresosResponse.json();
      const egresos = await egresosResponse.json();
      const deudas = await deudasResponse.json();

      // Almacena los datos en el estado de la interfaz de informes
      setHistoricoIngresos(ingresos);
      setHistoricoEgresos(egresos);
      setDeudas(deudas);
    } catch (error) {
      console.error("Error al cargar los datos", error);
      // Lógica para manejar errores de la solicitud
    }
    */

   
    navigate('/informes'); 
  };

  return (
    <button className="informes-button" onClick={handleIrAInformes}>
      Informes
    </button>
  );
};

export default BotonIrAInformes;
