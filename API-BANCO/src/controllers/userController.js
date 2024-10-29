import { getConnection } from '../database/database.js';

export const getUserData = async (req, res) => {
    try {
        const connection = await getConnection();
        const userEmail = req.user.email; // Extrae el email del usuario del token

        const [rows] = await connection.query('SELECT nombre, numero_cuenta, saldo, tipo FROM Usuarios WHERE email = ?', [userEmail]);

        if (rows.length === 0) {
            return res.status(404).json({ message: 'Usuario no encontrado' });
        }

        const user = rows[0];
        res.json(user);
    } catch (error) {
        console.log(req.body)
        console.error("Error al obtener los datos del usuario:", error);
        res.status(500).json({ message: 'Error en el servidor' });
    }
};
