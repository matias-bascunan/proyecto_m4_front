"use client";

import {UserSessionInterface} from "../interfaces/users.interfaces";
import { useState, createContext, useEffect, useContext } from "react";

interface AuthContextProps {
    dataUser: UserSessionInterface | null;
    setDataUser: (dataUser: UserSessionInterface | null) => void;
    logout: () => void;
}

// inicializar como undefined fuerza el consumo seguro con useAuth()
const AuthContext = createContext<AuthContextProps | undefined>(undefined);

interface AuthProviderProps {
    children: React.ReactNode;
}
export const AuthProvider: React.FC<AuthProviderProps> = ({children}) => {
    const [dataUser, setDataUser] = useState<UserSessionInterface | null>(null);

    useEffect(() => {
        if (dataUser) {
            localStorage.setItem('dataUser', JSON.stringify(dataUser));
        }
    }, [dataUser]);

    useEffect(() => {
        if (typeof window !== 'undefined' && window.localStorage) {
            // usar la misma clave 'dataUser' para leer y escribir
            const storedDataUser = localStorage.getItem('dataUser');
            if (storedDataUser) {
                setDataUser(JSON.parse(storedDataUser));
            }
        }
    }, []);

    const logout = () => {
        setDataUser(null);
        localStorage.removeItem('dataUser');
    };

    return (
        <AuthContext.Provider value={{dataUser, setDataUser, logout}}>
            {children}
        </AuthContext.Provider>
    );
}

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) throw new Error('useAuth must be used within an AuthProvider');
    return context;
}
