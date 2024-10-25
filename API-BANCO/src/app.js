import express from 'express';
import cors from 'cors';
import RegistrarRuta from'./Rutas/RegistrarRuta.js'
import dotenv from 'dotenv';
dotenv.config();

const app = express();
app.use(express.json()); 
app.use(cors())

app.get('/', (req, res) => {
  res.send('Bienvenido al API del Banco'); 
});

app.use('/api', RegistrarRuta); 
app.set('port', process.env.PORT || 3000);

export default app;