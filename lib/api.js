// API utility functions for backend communication

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';

// Get token from localStorage
export const getToken = () => {
    if (typeof window !== 'undefined') {
        return localStorage.getItem('token');
    }
    return null;
};

// Set token in localStorage
export const setToken = (token) => {
    if (typeof window !== 'undefined') {
        localStorage.setItem('token', token);
    }
};

// Remove token from localStorage
export const removeToken = () => {
    if (typeof window !== 'undefined') {
        localStorage.removeItem('token');
    }
};

// API request helper
const apiRequest = async (endpoint, options = {}) => {
    const token = getToken();
    const headers = {
        'Content-Type': 'application/json',
        ...options.headers,
    };

    if (token) {
        headers['Authorization'] = `Bearer ${token}`;
    }

    const config = {
        method: 'POST',
        ...options,
        headers,
    };

    try {
        const response = await fetch(`${API_BASE_URL}${endpoint}`, config);
        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.error || 'An error occurred');
        }

        return data;
    } catch (error) {
        throw error;
    }
};

// Login API call
export const login = async (email, password) => {
    const response = await apiRequest('/api/auth/login', {
        method: 'POST',
        body: JSON.stringify({ email, password }),
    });

    if (response.token) {
        setToken(response.token);
    }

    return response;
};

// Signup API call
export const signup = async (email, password) => {
    const response = await apiRequest('/api/auth/signup', {
        method: 'POST',
        body: JSON.stringify({ email, password }),
    });

    if (response.token) {
        setToken(response.token);
    }

    return response;
};

