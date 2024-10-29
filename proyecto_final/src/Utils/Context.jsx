import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import PropTypes from 'prop-types';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [token, setToken] = useState(() => localStorage.getItem('token'));
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(false);  // Changed initial state to false
    const [error, setError] = useState(null);

    const login = (newToken) => {
        setToken(newToken);
        localStorage.setItem('token', newToken);
        return fetchUserData(newToken);  // Return the promise
    };

    const logout = useCallback(() => {
        setToken(null);
        localStorage.removeItem('token');
        setUser(null);
        setLoading(false);
        setError(null);
    }, []);

    const fetchUserData = useCallback(async (currentToken) => {
        if (!currentToken) {
            setUser(null);
            setLoading(false);
            return;
        }

        setLoading(true);
        setError(null);

        try {
            const controller = new AbortController();
            const timeoutId = setTimeout(() => controller.abort(), 5000);

            const response = await fetch('http://localhost:3000/api/user', {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${currentToken}`,
                },
                signal: controller.signal
            });

            clearTimeout(timeoutId);

            if (!response.ok) {
                if (response.status === 401 || response.status === 403) {
                    logout();
                    throw new Error('Sesión expirada o inválida');
                }
                throw new Error(`Error al cargar los datos del usuario. Status: ${response.status}`);
            }

            const data = await response.json();
            setUser(data);
            setError(null);
        } catch (error) {
            console.error('Error al obtener datos del usuario:', error);
            setError(error.message);
            setUser(null);
            if (error.name === 'AbortError') {
                setError('Tiempo de espera agotado al cargar los datos del usuario');
            }
        } finally {
            setLoading(false);
        }
    }, [logout]);

    useEffect(() => {
        if (token) {
            fetchUserData(token);
        } else {
            setUser(null);
            setLoading(false);
        }
    }, [token, fetchUserData]);

    const value = {
        token,
        user,
        loading,
        error,
        login,
        logout,
        fetchUserData: () => fetchUserData(token),
        refreshUser: () => {
            if (token) {
                return fetchUserData(token);
            }
            return Promise.resolve();
        }
    };

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    );
};

AuthProvider.propTypes = {
    children: PropTypes.node.isRequired,
};

export const useAuth = () => useContext(AuthContext);

