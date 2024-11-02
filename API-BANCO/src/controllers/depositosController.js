import { getConnection } from '../database/database.js';

export const realizarDeposito = async (req, res) => {
    console.log('Datos del depósito recibidos:', req.body);
    const { cuentaDestino, fecha, monto } = req.body;
    
    // Validar que todos los campos estén completos y el monto sea válido
    if (!fecha || !cuentaDestino || !monto || isNaN(monto) || monto <= 0) {
        return res.status(400).json({ message: 'Datos de depósito inválidos.' });
    }
    
    let connection;
    
    try {
        // Obtener la conexión a la base de datos
        connection = await getConnection();
        console.log('Conexión a la base de datos establecida.');
        
        // Iniciar una transacción
        await connection.beginTransaction();
        console.log('Transacción iniciada.');
        
        // Verificar si la cuenta destino existe
        const [destinoData] = await connection.query(
            'SELECT saldo FROM usuarios WHERE numero_cuenta = ?',
            [cuentaDestino]
        );
        
        if (destinoData.length === 0) {
            throw new Error('Cuenta de destino no encontrada.');
        }
        
        // 1. Agregar la transacción a la tabla de Transacciones
        await connection.query(
            'INSERT INTO Transacciones (cuenta_id, tipo, monto, fecha) VALUES (?, ?, ?, ?)',
            [cuentaDestino, 'deposito', monto, new Date()]
        );
        console.log('Depósito registrado en la tabla de Transacciones.');
        
        // 2. Actualizar saldo de la cuenta destino (sumar el monto)
        await connection.query(
            'UPDATE usuarios SET saldo = saldo + ? WHERE numero_cuenta = ?',
            [monto, cuentaDestino]
        );
        console.log('Saldo de la cuenta destino actualizado.');
        
        // Confirmar transacción
        await connection.commit();
        console.log('Transacción confirmada.');
        return res.status(200).json({ message: 'Depósito realizado con éxito.' });
        
    } catch (error) {
        if (connection) await connection.rollback(); // Revertir cambios en caso de error
        console.error('Error al realizar el depósito:', error.message);
        return res.status(500).json({ message: 'Error al procesar el depósito.', error: error.message });
    } finally {
        if (connection) connection.release(); // Liberar la conexión
        console.log('Conexión a la base de datos liberada.');
    }
};