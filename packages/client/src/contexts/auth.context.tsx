import React, {createContext, useState, useEffect, useContext} from 'react';
import {useNavigate} from 'react-router-dom';
import {loginService, logoutService, registerService, autoLogin} from '../services/auth';
import {User} from '../types/user';

interface AuthContextType {
    user: User | null;
    setUser: React.Dispatch<React.SetStateAction<User | null>>;
    login: (email: string, password: string) => Promise<void>;
    register: (email: string, password: string) => Promise<void>;
    initAuth: () => Promise<User | null>;
    logout: (email: string) => Promise<void>;
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<React.PropsWithChildren<{}>> = ({children}) => {
    const [user, setUser] = useState<User | null>(null);
    const navigate = useNavigate();

    const login = async (email: string, password: string) => {
        const response = await loginService(email, password);
        setUser(response.user);
    };

    const register = async (email: string, password: string) => {
        const response = await registerService(email, password);
        setUser(response.user);
    };

    const initAuth = async () => {
        const loggedUser = await autoLogin();
        console.log(loggedUser)
        setUser(loggedUser);
        return loggedUser;
    };

    const logout = async (email: string) => {
        await logoutService(email);
        setUser(null);
    };

    useEffect(() => {
        initAuth();
    }, []);

    return (
        <AuthContext.Provider value={{user, setUser, login, register, initAuth, logout}}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};
