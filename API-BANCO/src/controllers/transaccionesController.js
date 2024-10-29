import { getConnection } from '../database/database.js';

export const realizarTransaccion = async (req, res) => {
    console.log('Datos de la transacción recibidos:', req.body);
    const {cuentaOrigen, fecha, cuentaDestino, monto } = req.body;

    // Validar que todos los campos estén completos y el monto sea válido
    if (!fecha || !cuentaDestino || !monto || isNaN(monto) || monto <= 0) {
        return res.status(400).json({ message: 'Datos de transacción inválidos.' });
    }

    let connection;

    try {
        // Obtener la conexión a la base de datos
        connection = await getConnection();
        
        // Iniciar una transacción
        await connection.beginTransaction();

        // Verificar si la cuenta origen tiene fondos suficientes
        const [origenData] = await connection.query(
            'SELECT saldo FROM usuarios WHERE numero_cuenta = ?', 
            [cuentaOrigen]
        );

        if (origenData.length === 0) {
            throw new Error('Cuenta de origen no encontrada.');
        }

        const saldoOrigen = origenData[0].saldo;
        if (saldoOrigen < monto) {
            throw new Error('Fondos insuficientes en la cuenta origen.');
        }

        // 1. Agregar la transacción a la tabla de Transacciones
        await connection.query(
            'INSERT INTO Transacciones (cuenta_id, tipo, monto, fecha) VALUES (?, ?, ?, ?)',
            [cuentaDestino, 'transferencia', monto, new Date()] // Asegúrate de que cuentaDestino y el tipo sean correctos
        );

        // Actualizar saldo de la cuenta origen (restar el monto)
        await connection.query(
            'UPDATE usuarios SET saldo = saldo - ? WHERE numero_cuenta = ?', 
            [monto, cuentaOrigen]
        );

        // Actualizar saldo de la cuenta destino (sumar el monto)
        await connection.query(
            'UPDATE usuarios SET saldo = saldo + ? WHERE numero_cuenta = ?', 
            [monto, cuentaDestino]
        );

        // Confirmar transacción
        await connection.commit();
        return res.status(200).json({ message: 'Transacción realizada con éxito.' });

    } catch (error) {
        if (connection) await connection.rollback(); // Revertir cambios en caso de error
        console.error('Error al realizar la transacción:', error.message);
        return res.status(500).json({ message: 'Error al procesar la transacción.', error: error.message });
    } finally {
        if (connection) connection.release(); // Liberar la conexión
    }
};
