import React, { createContext, useContext, useState, useEffect } from 'react';
import PropTypes from 'prop-types';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [token, setToken] = useState(() => localStorage.getItem('token'));
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const login = (newToken) => {
        setToken(newToken);
        localStorage.setItem('token', newToken);
        fetchUserData(newToken);
    };

    const logout = () => {
        setToken(null);
        localStorage.removeItem('token');
        setUser(null);
    };

    const fetchUserData = async (token) => {
        console.log("Fetching user data with token:", token); // Verifica que se llame a la función
        try {
            const response = await fetch('http://localhost:3000/api/user', {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${token}`,
                },
            });
    
            console.log("Response Status:", response.status); // Agregado para verificar el estado de la respuesta
    
            if (!response.ok) {
                throw new Error(`Error al cargar los datos del usuario. Status: ${response.status}`);
            }
    
            const data = await response.json();
            setUser(data);
        } catch (error) {
            console.error('Error al obtener datos del usuario:', error);
            setError(error.message);
            setUser(null);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (token) {
            fetchUserData(token);
        } else {
            setLoading(false);
        }
    }, [token]);

    if (loading) {
        return <p>Cargando...</p>; // Mensaje de carga
    }

    return (
        <AuthContext.Provider value={{ token, user, login, logout, error }}>
            {children}
        </AuthContext.Provider>
    );
};

AuthProvider.propTypes = {
    children: PropTypes.node.isRequired,
};

export const useAuth = () => useContext(AuthContext);
