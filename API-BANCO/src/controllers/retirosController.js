import { getConnection } from '../database/database.js';

export const realizarRetiro = async (req, res) => {
    console.log('Datos de la transacción recibidos:', req.body);
    const {cuentaOrigen, fecha, monto } = req.body;

    // Validar que todos los campos estén completos y el monto sea válido
    if (!fecha || !cuentaOrigen || !monto || isNaN(monto) || monto <= 0) {
        return res.status(400).json({ message: 'Datos de transacción inválidos.' });
    }

    let connection;

    try {
        // Obtener la conexión a la base de datos
        connection = await getConnection();
        console.log('Conexión a la base de datos establecida.');

        // Iniciar una transacción
        await connection.beginTransaction();
        console.log('Transacción iniciada.');

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
            [cuentaOrigen, 'retiro', monto, new Date()]
        );
        console.log('Transacción registrada en la tabla de Transacciones.');

        // Actualizar saldo de la cuenta origen (restar el monto)
        await connection.query(
            'UPDATE usuarios SET saldo = saldo - ? WHERE numero_cuenta = ?', 
            [monto, cuentaOrigen]
        );
        console.log('Saldo de la cuenta origen actualizado.');

        // Confirmar transacción
        await connection.commit();
        console.log('Transacción confirmada.');
        return res.status(200).json({ message: 'Transacción realizada con éxito.' });

    } catch (error) {
        if (connection) await connection.rollback(); // Revertir cambios en caso de error
        console.error('Error al realizar la transacción:', error.message);
        return res.status(500).json({ message: 'Error al procesar la transacción.', error: error.message });
    } finally {
        if (connection) connection.release(); // Liberar la conexión
        console.log('Conexión a la base de datos liberada.');
    }
};