import axios from 'axios';

const API_URL = 'http://localhost:3000';

// Fetch all motorcycles
export const fetchMotorcycles = async () => {
    try {
        const response = await axios.get(`${API_URL}/motorcycles`);
        return response.data.motorcycles;
    } catch (error) {
        console.error('Error fetching motorcycles:', error);
        throw error;
    }
};

// Fetch motorcycle by ID
export const fetchMotorcyclesById = async (id) => {
    try {
        const response = await axios.get(`${API_URL}/motorcycles/${id}`);
        return response.data;
    } catch (error) {
        console.error('Error fetching motorcycle by ID:', error);
        throw error;
    }
};

// Add motorcycle
export const addMotorcycle = async (formData) => {
    try {
        const response = await axios.post(`${API_URL}/motorcycles/add`, formData, {
            headers: { 'Content-Type': 'multipart/form-data' },
        });
        return response.data;
    } catch (error) {
        console.error('Error adding motorcycle:', error);
        throw error;
    }
};

// Edit motorcycle
export const editMotorcycle = async (id, formData) => {
    try {
        const response = await axios.put(`${API_URL}/motorcycles/edit/${id}`, formData, {
            headers: { 'Content-Type': 'multipart/form-data' },
        });
        return response.data;
    } catch (error) {
        console.error('Error editing motorcycle:', error);
        throw error;
    }
};

// Delete motorcycle
export const deleteMotorcycle = async (id) => {
    try {
        const response = await axios.delete(`${API_URL}/motorcycles/${id}`);
        return response.data;
    } catch (error) {
        console.error('Error deleting motorcycle:', error);
        throw error;
    }
};

// Fetch all users
export const fetchTotalUsers = async () => {
    try {
      const response = await axios.get(`${API_URL}/auth/users`);
      return response.data;
    } catch (error) {
      console.error('Error fetching total users:', error);
      throw error;
    }
  };

  
// Fetch all admins
export const fetchAdmins = async () => {
    try {
        const response = await axios.get(`${API_URL}/auth/admins`);
        return response.data;
    } catch (error) {
        console.error('Error fetching admins:', error);
        throw error;
    }
};

// Assign admin role
export const assignAdminRole = async (id) => {
    try {
        const response = await axios.put(`${API_URL}/auth/assign-admin/${id}`);
        return response.data.user;
    } catch (error) {
        console.error('Error assigning admin role:', error);
        throw error;
    }
};

// Remove admin role
export const removeAdminRole = async (id) => {
    try {
        const response = await axios.put(`${API_URL}/auth/remove-admin/${id}`);
        return response.data.user;
    } catch (error) {
        console.error('Error removing admin role:', error);
        throw error;
    }
};





// Update user profile
export const updateUserProfile = async (id, formData) => {
    try {
        const response = await axios.put(`${API_URL}/auth/update/${id}`, formData, {
            headers: { 'Content-Type': 'multipart/form-data' },
        });
        return response.data;
    } catch (error) {
        console.error('Error updating user profile:', error);
        throw error;
    }
};