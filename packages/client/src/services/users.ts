import axios from 'axios';
import { User } from '../types/user';

const API_URL = process.env.REACT_APP_URL_API_MS_USERS;

export const getUsers = async (): Promise<User[]> => {
    try {
        const response = await axios.get(`${API_URL}/users`);
        return response.data;
    } catch (error) {
        console.error(`Error getting users: ${error}`);
        throw error;
    }
};

export const getUser = async (id: string): Promise<User> => {
    try {
        const response = await axios.get(`${API_URL}/users/${id}`);
        return response.data;
    } catch (error) {
        console.error(`Error getting user: ${error}`);
        throw error;
    }
};

export const createUser = async (user: User): Promise<User> => {
    try {
        const response = await axios.post(`${API_URL}/users`, user);
        return response.data;
    } catch (error) {
        console.error(`Error creating user: ${error}`);
        throw error;
    }
};

export const updateUser = async (id: string, user: User): Promise<User> => {
    try {
        const response = await axios.patch(`${API_URL}/users/${id}`, user);
        return response.data;
    } catch (error) {
        console.error(`Error updating user: ${error}`);
        throw error;
    }
};

export const deleteUser = async (id: string): Promise<void> => {
    try {
        await axios.delete(`${API_URL}/users/${id}`);
    } catch (error) {
        console.error(`Error deleting user: ${error}`);
        throw error;
    }
};
