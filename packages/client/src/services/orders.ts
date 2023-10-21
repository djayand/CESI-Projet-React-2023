import axios from 'axios';
import { Order } from '../types/order';

const API_URL = process.env.REACT_APP_URL_API_MS_ORDERS;

export const getOrders = async (): Promise<Order[]> => {
    try {
        const response = await axios.get(`${API_URL}/orders`);
        return response.data;
    } catch (error) {
        console.error(`Error getting orders: ${error}`);
        throw error;
    }
};

export const getOrder = async (id: string): Promise<Order> => {
    try {
        const response = await axios.get(`${API_URL}/orders/${id}`);
        return response.data;
    } catch (error) {
        console.error(`Error getting order: ${error}`);
        throw error;
    }
};

export const createOrder = async (order: Order): Promise<Order> => {
    try {
        const response = await axios.post(`${API_URL}/orders`, order);
        return response.data;
    } catch (error) {
        console.error(`Error creating order: ${error}`);
        throw error;
    }
};

export const updateOrder = async (id: string, order: Order): Promise<Order> => {
    try {
        const response = await axios.patch(`${API_URL}/orders/${id}`, order);
        return response.data;
    } catch (error) {
        console.error(`Error updating order: ${error}`);
        throw error;
    }
};

export const deleteOrder = async (id: string): Promise<void> => {
    try {
        await axios.delete(`${API_URL}/orders/${id}`);
    } catch (error) {
        console.error(`Error deleting order: ${error}`);
        throw error;
    }
};
