import axios, { AxiosError, type AxiosInstance, type InternalAxiosRequestConfig } from 'axios';
import type {Product} from '../interfaces/product.interface';
import type {Cart, CartItem} from '../interfaces/cart.interface';
import type {User, LoginResponse, RegisterRequest} from '../interfaces/user.interface';

export const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

const apiClient: AxiosInstance = axios.create({
    baseURL: API_URL,
    headers: {
        'Content-Type': 'application/json',
    },
    timeout: 10000, // 10 секунд
});

apiClient.interceptors.request.use(
    (config: InternalAxiosRequestConfig) => {
        const token = localStorage.getItem('access_token');
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error: AxiosError) => {
        return Promise.reject(error);
    }
);

apiClient.interceptors.response.use(
    (response) => response,
    (error: AxiosError) => {
        if (error.response) {
            console.error('API Error:', error.response.status, error.response.data);
        } else if (error.request) {
            console.error('Network Error:', error.request);
        } else {
            console.error('Error:', error.message);
        }
        return Promise.reject(error);
    }
);

export const getErrorMessage = (error: unknown): string => {
    if (axios.isAxiosError(error)) {
        if (error.response) {
            const status = error.response.status;
            const data = error.response.data as { error?: string; message?: string } | undefined;
            
            if (data?.error) {
                return data.error;
            }
            if (data?.message) {
                return data.message;
            }
            
            if (status === 401) {
                return 'Неверный email или пароль';
            }
            if (status === 404) {
                return 'Данные не найдены';
            }
            if (status === 409) {
                return 'Пользователь с таким email уже существует';
            }
            if (status === 500) {
                return 'Ошибка на сервере. Попробуйте позже.';
            }
            return `Ошибка сервера (${status})`;
        } else if (error.request) {
            return 'Сервер недоступен. Убедитесь, что backend запущен.';
        }
        return 'Ошибка при выполнении запроса';
    }
    if (error instanceof Error) {
        return error.message;
    }
    return 'Произошла неизвестная ошибка';
};

export const productAPI = {
    getAll: async (): Promise<Product[]> => {
        const response = await apiClient.get<Product[]>('/products');
        return response.data;
    },

    getById: async (id: number): Promise<Product> => {
        const response = await apiClient.get<Product>(`/products/${id}`);
        return response.data;
    },

    search: async (query: string): Promise<Product[]> => {
        const response = await apiClient.get<Product[]>('/products/search', {
            params: { q: query },
        });
        return response.data;
    },
};

export const cartAPI = {
    get: async (): Promise<Cart> => {
        const response = await apiClient.get<Cart>('/cart');
        return response.data;
    },

    addItem: async (productId: number, count: number = 1): Promise<CartItem> => {
        const response = await apiClient.post<CartItem>('/cart/items', {
            productId,
            count,
        });
        return response.data;
    },

    updateItem: async (itemId: number, count: number): Promise<CartItem> => {
        const response = await apiClient.put<CartItem>(`/cart/items/${itemId}`, {
            count,
        });
        return response.data;
    },

    removeItem: async (itemId: number): Promise<void> => {
        await apiClient.delete(`/cart/items/${itemId}`);
    },

    clear: async (): Promise<void> => {
        await apiClient.delete('/cart');
    },
};

export const authAPI = {
    login: async (email: string, password: string): Promise<LoginResponse> => {
        const response = await apiClient.post<LoginResponse>('/auth/login', {
            email,
            password,
        });
        if (response.data.access_token) {
            localStorage.setItem('access_token', response.data.access_token);
        }
        return response.data;
    },

    register: async (data: RegisterRequest): Promise<LoginResponse> => {
        const response = await apiClient.post<LoginResponse>('/auth/register', data);
        if (response.data.access_token) {
            localStorage.setItem('access_token', response.data.access_token);
        }
        return response.data;
    },

    getMe: async (): Promise<User> => {
        const response = await apiClient.get<User>('/auth/me');
        return response.data;
    },

    logout: (): void => {
        localStorage.removeItem('access_token');
    },
};

export default apiClient;

export const PREFIX = API_URL;