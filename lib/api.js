const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';
export const getToken = () => {
    if (typeof window !== 'undefined') {
        return localStorage.getItem('token');
    }
    return null;
};
export const setToken = (token) => {
    if (typeof window !== 'undefined') {
        localStorage.setItem('token', token);
    }
};
export const removeToken = () => {
    if (typeof window !== 'undefined') {
        localStorage.removeItem('token');
    }
};
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
        method: 'GET', 
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

export const signup = async (email, password, name) => {
    const response = await apiRequest('/api/auth/signup', {
        method: 'POST',
        body: JSON.stringify({ email, password, name }),
    });

    if (response.token) {
        setToken(response.token);
    }

    return response;
};

export const getProducts = async () => {
    return apiRequest('/api/products');
};

export const getProduct = async (id) => {
    return apiRequest(`/api/products/${id}`);
};

export const createOrder = async (items, total) => {
    return apiRequest('/api/orders', {
        method: 'POST',
        body: JSON.stringify({ items, total }),
    });
};

export const getOrders = async () => {
    return apiRequest('/api/orders');
};


