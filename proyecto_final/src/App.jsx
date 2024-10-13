import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Login from './components/login/Login'
import Registro from './components/registro/Registro'
import Principal from './components/principal/Principal'
import Informes from './components/informes/Informes'
import Transacciones from './components/transacciones/Transacciones'
import Prestamos from './components/prestamos/Prestamos'
import Depositos from './components/depositos/Depositos'
import Retiros from './components/retiros/Retiros'

function App() {


  return (
   <Router>
      <Routes>
        <Route path="/" element={<Login />} /> 
        <Route path="/registro" element={<Registro />} />
        <Route path="/principal" element={<Principal />} />
        <Route path="/informes" element={<Informes />} />
        <Route path="/transacciones" element={<Transacciones />} />
        <Route path="/prestamos" element={<Prestamos />} />
        <Route path="/depositos" element={<Depositos />} />
        <Route path="/retiros" element={<Retiros />} />
      </Routes>
    </Router>
    
  )
}

export default App
