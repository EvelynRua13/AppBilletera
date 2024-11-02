import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import PropTypes from 'prop-types';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [token, setToken] = useState(() => localStorage.getItem('token'));
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [lastUpdate, setLastUpdate] = useState(null);

    const login = async (newToken) => {
        setToken(newToken);
        localStorage.setItem('token', newToken);
        try {
            await fetchUserData(newToken);
            return true;
        } catch (error) {
            console.error('Error during login:', error);
            logout();
            throw error;
        }
    };

    const logout = useCallback(() => {
        setToken(null);
        localStorage.removeItem('token');
        setUser(null);
        setLoading(false);
        setError(null);
        setLastUpdate(null);
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
                    'Cache-Control': 'no-cache',
                    'Pragma': 'no-cache'
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
            setLastUpdate(new Date().getTime());
            return data;
        } catch (error) {
            console.error('Error al obtener datos del usuario:', error);
            setError(error.message);
            setUser(null);
            if (error.name === 'AbortError') {
                setError('Tiempo de espera agotado al cargar los datos del usuario');
            }
            throw error;
        } finally {
            setLoading(false);
        }
    }, [logout]);

    useEffect(() => {
        if (token) {
            fetchUserData(token).catch(error => {
                console.error('Error in initial user data fetch:', error);
            });
        } else {
            setUser(null);
            setLoading(false);
        }
    }, [token, fetchUserData]);

    const refreshUser = useCallback(async () => {
        if (!token) return null;
        
        try {
            const updatedUser = await fetchUserData(token);
            // Esperar un momento para asegurar que los estados se actualicen
            await new Promise(resolve => setTimeout(resolve, 100));
            return updatedUser;
        } catch (error) {
            console.error('Error refreshing user data:', error);
            if (error.message.includes('Sesión expirada')) {
                logout();
            }
            throw error;
        }
    }, [token, fetchUserData, logout]);

    const value = {
        token,
        user,
        loading,
        error,
        login,
        logout,
        refreshUser,
        fetchUserData: () => fetchUserData(token),
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

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error('useAuth debe ser usado dentro de un AuthProvider');
    }
    return context;
};

