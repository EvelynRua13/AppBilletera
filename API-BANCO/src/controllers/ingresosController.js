import { getConnection } from '../database/database.js';

export const agregarIngreso = async (req, res) => {
    console.log('Datos de ingreso recibidos:', req.body);
    const { cuentaDestino, monto } = req.body;

    // Validar que todos los campos estén completos y el monto sea válido
    if (!cuentaDestino || !monto || monto <= 0) {
        return res.status(400).json({ message: 'Datos de ingreso inválidos.' });
    }

    let connection;

    try {
        // Obtener la conexión a la base de datos
        connection = await getConnection();
        
        // 1. Agregar ingreso a la tabla de Ingresos
        await connection.query(
            'INSERT INTO ingresos (usuario_id, monto, fecha) VALUES (?, ?, ?)',
            [cuentaDestino, monto, new Date()] // Asegúrate de que usuario_id sea correcto
        );

        return res.status(200).json({ message: 'Ingreso registrado con éxito.' });

    } catch (error) {
        console.error('Error al agregar el ingreso:', error.message);
        return res.status(500).json({ message: 'Error al procesar el ingreso.', error: error.message });
    } finally {
        if (connection) connection.release(); // Liberar la conexión
    }
};
