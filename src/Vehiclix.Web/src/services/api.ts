import { Vehicle, Claim, Fine, Report } from '../types';
import axios from 'axios';

const api = axios.create({
    baseURL: 'http://localhost:5001/api',
    headers: {
        'Content-Type': 'application/json'
    }
});

const getAuthHeaders = () => {
    const token = localStorage.getItem('token');
    return token ? { Authorization: `Bearer ${token}` } : {};
};

export const vehicleService = {
    getAll: async (): Promise<Vehicle[]> => {
        const response = await api.get('/vehicles', { headers: getAuthHeaders() });
        return response.data;
    },

    getById: async (id: string): Promise<Vehicle> => {
        const response = await api.get(`/vehicles/${id}`, { headers: getAuthHeaders() });
        return response.data;
    },

    create: async (vehicle: Omit<Vehicle, 'id'>): Promise<Vehicle> => {
        const response = await api.post('/vehicles', vehicle, { headers: getAuthHeaders() });
        return response.data;
    },

    update: async (id: string, vehicle: Partial<Vehicle>): Promise<Vehicle> => {
        const response = await api.put(`/vehicles/${id}`, vehicle, { headers: getAuthHeaders() });
        return response.data;
    },

    delete: async (id: string): Promise<void> => {
        await api.delete(`/vehicles/${id}`, { headers: getAuthHeaders() });
    }
};

export const claimService = {
    getAll: async (): Promise<Claim[]> => {
        const response = await api.get('/claims', { headers: getAuthHeaders() });
        return response.data;
    },

    getById: async (id: string): Promise<Claim> => {
        const response = await api.get(`/claims/${id}`, { headers: getAuthHeaders() });
        return response.data;
    },

    create: async (claim: Omit<Claim, 'id'>): Promise<Claim> => {
        const response = await api.post('/claims', claim, { headers: getAuthHeaders() });
        return response.data;
    },

    update: async (id: string, claim: Partial<Claim>): Promise<Claim> => {
        const response = await api.put(`/claims/${id}`, claim, { headers: getAuthHeaders() });
        return response.data;
    }
};

export const fineService = {
    getAll: async (): Promise<Fine[]> => {
        const response = await api.get('/fines', { headers: getAuthHeaders() });
        return response.data;
    },

    getById: async (id: string): Promise<Fine> => {
        const response = await api.get(`/fines/${id}`, { headers: getAuthHeaders() });
        return response.data;
    },

    create: async (fine: Omit<Fine, 'id'>): Promise<Fine> => {
        const response = await api.post('/fines', fine, { headers: getAuthHeaders() });
        return response.data;
    },

    update: async (id: string, fine: Partial<Fine>): Promise<Fine> => {
        const response = await api.put(`/fines/${id}`, fine, { headers: getAuthHeaders() });
        return response.data;
    }
};

export const reportService = {
    getAll: async (): Promise<Report[]> => {
        const response = await api.get('/reports', { headers: getAuthHeaders() });
        return response.data;
    },

    getById: async (id: string): Promise<Report> => {
        const response = await api.get(`/reports/${id}`, { headers: getAuthHeaders() });
        return response.data;
    },

    generate: async (reportData: {
        type: string;
        startDate: string;
        endDate: string;
    }): Promise<Report> => {
        const response = await api.post('/reports/generate', reportData, { headers: getAuthHeaders() });
        return response.data;
    }
};

export default {
    login: async (email: string, password: string) => {
        const response = await api.post('/auth/login', { email, password });
        const data = response.data;
        localStorage.setItem('token', data.token);
        return data;
    },

    register: async (userData: any) => {
        const response = await api.post('/auth/register', userData);
        return response.data;
    },

    logout: () => {
        localStorage.removeItem('token');
    }
}; 