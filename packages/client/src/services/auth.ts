import axios from 'axios';
import {User} from '../types/user';
import Cookies from 'js-cookie';

const API_URL = process.env.REACT_APP_URL_API_GATEWAY;

// Cookie +1
const createCookie = (name: string, value: any, days: number) => {
    Cookies.set(name, value, {expires: days});
};

// Delete cookie
const deleteCookie = (name: string) => {
    Cookies.remove(name);
};

// Auth user via token
const authenticateUser = async (token: string): Promise<User> => {
    const response = await axios.post(`${API_URL}/auth/validate`, {token});
    console.log(response)
    return response.data;
};

// Login user + create cookie + return user
export const loginService = async (email: string, password: string): Promise<{ user: User, token: string }> => {
    try {
        const response = await axios.put(`${API_URL}/auth/login`, {email, password});
        createCookie('userToken', response.data.token, 1); // 1 Day Cookie
        console.log(`User with email ${email} logged in successfully`);
        return {user: response.data, token: response.data.token};
    } catch (error) {
        console.error(`Error logging in user: ${error}`);
        throw error;
    }
};

// Register user + create cookie + return user
export const registerService = async (email: string, password: string): Promise<{ user: User, token: string }> => {
    try {
        const role = "1" // Role client
        console.log(email, password, role)
        const response = await axios.post(`${API_URL}/auth/register`, {email, password, role});
        createCookie('userToken', response.data.token, 1); // 1 Day Cookie
        console.log(`User with email ${email} registered successfully`);
        return {user: response.data, token: response.data.token};
    } catch (error) {
        console.error(`Error registering user: ${error}`);
        throw error;
    }
};

// Logout user + delete cookie.
export const logoutService = async (email: string): Promise<void> => {
    try {
        const response = await axios.post(`${API_URL}/auth/logout`, {email});
        deleteCookie('userToken');
        console.log(`User with email ${email} logged out successfully`);
    } catch (error) {
        console.error(`Error logging out user: ${error}`);
        throw error;
    }
};

// Auth user if token in cookie
export const autoLogin = async (): Promise<User | null> => {
    try {
        const token = Cookies.get('userToken');
        if (token) {
            const user = await authenticateUser(token);
            console.log('User authenticated successfully');
            return user;
        } else {
            console.log('No token found');
            return null;
        }
    } catch (error) {
        console.error(`Error auto logging in user: ${error}`);
        return null;
    }
};
