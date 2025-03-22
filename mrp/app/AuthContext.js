'use client';

import { createContext, useState } from 'react';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null); // Состояние пользователя

    const login = (userData) => {
        setUser(userData); // Устанавливаем данные пользователя при входе
    };

    const logout = () => {
        setUser(null); // Очищаем данные при выходе
    };

    return (
        <AuthContext.Provider value={{ user, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};