import { getConnection } from '../database/database.js';

export const agregarEgreso = async (req, res) => {
    console.log('Datos de egreso recibidos:', req.body);
    const { cuentaOrigen, monto } = req.body;

    // Validar que todos los campos estén completos y el monto sea válido
    if (!cuentaOrigen || !monto || monto <= 0) {
        return res.status(400).json({ message: 'Datos de egreso inválidos.' });
    }

    let connection;

    try {
        // Obtener la conexión a la base de datos
        connection = await getConnection();
        
        // 1. Agregar egreso a la tabla de Egresos
        await connection.query(
            'INSERT INTO Egresos (usuario_id, monto, fecha) VALUES (?, ?, ?)',
            [cuentaOrigen, monto, new Date()] // Asegúrate de que usuario_id sea correcto
        );

        return res.status(200).json({ message: 'Egreso registrado con éxito.' });

    } catch (error) {
        console.error('Error al agregar el egreso:', error.message);
        return res.status(500).json({ message: 'Error al procesar el egreso.', error: error.message });
    } finally {
        if (connection) connection.release(); // Liberar la conexión
    }
};
