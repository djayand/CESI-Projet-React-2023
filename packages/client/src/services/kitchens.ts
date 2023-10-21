import axios from 'axios';
import { Kitchen } from '../types/kitchen';

const API_URL = process.env.REACT_APP_URL_API_MS_KITCHENS;

export const getKitchens = async (): Promise<Kitchen[]> => {
    try {
        const response = await axios.get(`${API_URL}/kitchens`);
        return response.data;
    } catch (error) {
        console.error(`Error getting kitchens: ${error}`);
        throw error;
    }
};

export const getKitchen = async (id: string): Promise<Kitchen> => {
    try {
        const response = await axios.get(`${API_URL}/kitchens/${id}`);
        return response.data;
    } catch (error) {
        console.error(`Error getting kitchen: ${error}`);
        throw error;
    }
};

export const createKitchen = async (kitchen: Kitchen): Promise<Kitchen> => {
    try {
        const response = await axios.post(`${API_URL}/kitchens`, kitchen);
        return response.data;
    } catch (error) {
        console.error(`Error creating kitchen: ${error}`);
        throw error;
    }
};

export const updateKitchen = async (id: string, kitchen: Kitchen): Promise<Kitchen> => {
    try {
        const response = await axios.patch(`${API_URL}/kitchens/${id}`, kitchen);
        return response.data;
    } catch (error) {
        console.error(`Error updating kitchen: ${error}`);
        throw error;
    }
};

export const deleteKitchen = async (id: string): Promise<void> => {
    try {
        await axios.delete(`${API_URL}/kitchens/${id}`);
    } catch (error) {
        console.error(`Error deleting kitchen: ${error}`);
        throw error;
    }
};
