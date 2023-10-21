import axios from 'axios';
import {FutureMenu, Menu} from '../types/menu';

const API_URL = process.env.REACT_APP_URL_API_MS_CATALOG;

export const getMenus = async (): Promise<Menu[]> => {
    try {
        const response = await axios.get(`${API_URL}/menus`);
        return response.data;
    } catch (error) {
        console.error(`Error getting menus: ${error}`);
        throw error;
    }
};

export const getMenu = async (id: string): Promise<Menu> => {
    try {
        const response = await axios.get(`${API_URL}/menus/${id}`);
        return response.data;
    } catch (error) {
        console.error(`Error getting menu: ${error}`);
        throw error;
    }
};

export const getMenuByKitchenId = async (kitchenId: string): Promise<Menu[]> => {
    try {
        const response = await axios.get(`${API_URL}/menus`);
        const menus = response.data;
        return menus.filter((menu: Menu) => menu.kitchenId === kitchenId);
    } catch (error) {
        console.error(`Error getting menus by kitchenId: ${error}`);
        throw error;
    }
};

export const createMenu = async (menu: FutureMenu): Promise<Menu> => {
    try {
        const response = await axios.post(`${API_URL}/menus`, menu);
        return response.data;
    } catch (error) {
        console.error(`Error creating menu: ${error}`);
        throw error;
    }
};

export const updateMenu = async (menu: Menu): Promise<Menu> => {
    try {
        const response = await axios.patch(`${API_URL}/menus/${menu.id}`, menu);
        return response.data;
    } catch (error) {
        console.error(`Error updating menu: ${error}`);
        throw error;
    }
};

export const deleteMenu = async (id: string): Promise<void> => {
    try {
        await axios.delete(`${API_URL}/menus/${id}`);
    } catch (error) {
        console.error(`Error deleting menu: ${error}`);
        throw error;
    }
};
