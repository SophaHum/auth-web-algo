import { Algorithm, ApiResponse } from '../../types';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const authApi = {
  async register(username: string, email: string, password: string, hashAlgorithm: Algorithm) {
    const response = await fetch(`${API_BASE_URL}/register`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        username,
        email,
        password,
        hashAlgorithm
      }),
    });
    
    return response.json();
  },

  async login(email: string, password: string) {
    const response = await fetch(`${API_BASE_URL}/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email,
        password,
      }),
    });
    
    return response.json();
  },

  algorithms: {
    async getCurrent() {
      const response = await fetch(`${API_BASE_URL}/algorithm`);
      if (!response.ok) {
        throw new Error('Failed to get algorithm');
      }
      return await response.json() as ApiResponse;
    },

    async update(algorithm: Algorithm) {
      const response = await fetch(`${API_BASE_URL}/algorithm/update`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ algorithm }),
      });
      
      if (!response.ok) {
        throw new Error('Failed to update algorithm');
      }
      
      return await response.json() as ApiResponse;
    },

    async hash(algorithm: Algorithm, password: string) {
      const response = await fetch(`${API_BASE_URL}/algorithm/hash`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ algorithm, password }),
      });
      
      if (!response.ok) {
        throw new Error('Failed to hash password');
      }
      
      return await response.json() as ApiResponse;
    },

    async verify(algorithm: Algorithm, password: string, hashedPassword: string) {
      const response = await fetch(`${API_BASE_URL}/algorithm/verify`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ algorithm, password, hashedPassword }),
      });
      
      if (!response.ok) {
        throw new Error('Failed to verify password');
      }
      
      return await response.json() as ApiResponse;
    },
  },
}