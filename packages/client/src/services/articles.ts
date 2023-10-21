import axios from 'axios';
import { Article } from '../types/article';

const API_URL = process.env.REACT_APP_URL_API_MS_CATALOG;

export const getArticles = async (): Promise<Article[]> => {
    try {
        const response = await axios.get(`${API_URL}/articles`);
        return response.data;
    } catch (error) {
        console.error(`Error getting articles: ${error}`);
        throw error;
    }
};

export const getArticle = async (id: string): Promise<Article> => {
    try {
        const response = await axios.get(`${API_URL}/articles/${id}`);
        return response.data;
    } catch (error) {
        console.error(`Error getting article: ${error}`);
        throw error;
    }
};

export const getArticlesByIds = async (ids: string[]): Promise<Article[]> => {
    try {
        const response = await axios.get(`${API_URL}/articles`, { params: { ids } });
        return response.data;
    } catch (error) {
        console.error(`Error getting articles: ${error}`);
        throw error;
    }
};

export const createArticle = async (article: Article): Promise<Article> => {
    try {
        const response = await axios.post(`${API_URL}/articles`, article);
        return response.data;
    } catch (error) {
        console.error(`Error creating article: ${error}`);
        throw error;
    }
};

export const updateArticle = async (id: string, article: Article): Promise<Article> => {
    try {
        const response = await axios.patch(`${API_URL}/articles/${id}`, article);
        return response.data;
    } catch (error) {
        console.error(`Error updating article: ${error}`);
        throw error;
    }
};

export const deleteArticle = async (id: string): Promise<void> => {
    try {
        await axios.delete(`${API_URL}/articles/${id}`);
    } catch (error) {
        console.error(`Error deleting article: ${error}`);
        throw error;
    }
};