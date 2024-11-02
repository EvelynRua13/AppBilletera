import { getConnection } from '../database/database.js';

// Constantes para los estados de préstamo
const ESTADO_PRESTAMO = {
    PENDIENTE: 'pendiente',
    ACEPTADO: 'aceptado',
    RECHAZADO: 'rechazado'
};

// Función para actualizar el estado del préstamo
export const actualizarEstadoPrestamo = async (req, res) => {
    console.log('Datos de actualización de préstamo recibidos:', req.body);
    
    const {prestamoId, nuevoEstado, usuarioId, monto } = req.body;

    // Validar que todos los campos necesarios estén presentes
    if (!prestamoId || !nuevoEstado || !usuarioId) {
        return res.status(400).json({
            message: 'Datos incompletos para actualizar el préstamo.'
        });
    }

    // Validar que el estado sea válido
    if (!Object.values(ESTADO_PRESTAMO).includes(nuevoEstado)) {
        return res.status(400).json({
            message: 'Estado de préstamo inválido.'
        });
    }

    let connection;
    try {
        connection = await getConnection();
        await connection.beginTransaction();

        // Obtener el estado actual del préstamo
        const [prestamoActual] = await connection.query(
            'SELECT estado, monto FROM deudas WHERE id = ? AND usuario_id = ?',
            [prestamoId, usuarioId]
        );

        if (prestamoActual.length === 0) {
            throw new Error('Préstamo no encontrado.');
        }

        const estadoActual = prestamoActual[0].estado;

        // Validar transiciones de estado permitidas
        if (estadoActual === ESTADO_PRESTAMO.ACEPTADO || estadoActual === ESTADO_PRESTAMO.RECHAZADO) {
            throw new Error('No se puede modificar un préstamo que ya ha sido procesado.');
        }

        // Actualizar el estado del préstamo
        await connection.query(
            'UPDATE deudas SET estado = ?, fecha_actualizacion = NOW() WHERE id = ?',
            [nuevoEstado, prestamoId]
        );

            // Registrar prestamo
            await connection.query(
                'INSERT INTO deudas (cuenta_id,monto, fecha, estado,plazo) VALUES (?, ?, ?, NOW(), ?)',
                [usuarioId, monto, `PRESTAMO-${prestamoId}`,'pendiente', plazo]
            );

        }catch(exception){
            console.log(exception);
        }

        await connection.commit();
        return res.status(200).json({
            message: `Préstamo ${nuevoEstado} exitosamente.`,
            estado: nuevoEstado
        });

    }


// Función para crear una solicitud de préstamo
export const crearSolicitudPrestamo = async (req, res) => {
    console.log('Datos de solicitud de préstamo recibidos:', req.body);
    
    const { cuentaId, monto, plazo } = req.body;

    // Validar datos de entrada
    if (!cuentaId || !monto || !plazo || isNaN(monto) || monto <= 0) {
        return res.status(400).json({
            message: 'Datos de solicitud inválidos.'
        });
    }

    let connection;
    try {
        connection = await getConnection();
        
        // Verificar si el usuario tiene préstamos pendientes
        const [prestamosActivos] = await connection.query(
            'SELECT COUNT(*) as count FROM deudas WHERE cuenta_id = ? AND estado IN (?, ?)',
            [cuentaId, ESTADO_PRESTAMO.PENDIENTE, ESTADO_PRESTAMO.ACEPTADO]
        );

        if (prestamosActivos[0].count > 0) {
            throw new Error('El usuario ya tiene un préstamo activo o pendiente.');
        }

        // Crear la solicitud de préstamo
        const [resultado] = await connection.query(
            'INSERT INTO deudas (cuenta_id, monto, estado,plazo) VALUES (?, ?, ?, ?)',
            [cuentaId, monto,'aprobado',plazo]
        );

          // Actualizar el saldo del usuario
          await connection.query(
            'UPDATE usuarios SET saldo = saldo + ? WHERE numero_cuenta = ?',
            [monto, cuentaId]
        );


        return res.status(201).json({
            message: 'Solicitud de préstamo creada exitosamente.',
            prestamoId: resultado.insertId
        });

    } catch (error) {
        if (connection) await connection.rollback(); 
        console.error('Error al crear la solicitud de préstamo:', error.message);
        return res.status(500).json({
            message: 'Error al procesar la solicitud de préstamo.',
            error: error.message
        });
    } finally {
        if (connection) connection.release();
    }
};