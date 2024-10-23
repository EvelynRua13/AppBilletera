// Importa Express y Axios
import express from 'express';
import cors from 'cors';

// Instancia de express
const app = express();

app.use(cors());

// Configura el puerto
app.set('port', process.env.PORT || 3000);

export default app;