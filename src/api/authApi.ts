import { Algorithm, ApiResponse, LoginResponse } from '../types';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

async function handleResponse(response: Response) {
  if (!response.ok) {
    const error = await response.json().catch(() => ({ message: 'An error occurred' }));
    throw new Error(error.message || 'An error occurred');
  }
  return response.json();
}

export const authApi = {
  async register(username: string, email: string, password: string, hashAlgorithm: Algorithm): Promise<ApiResponse<LoginResponse>> {
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
    return handleResponse(response);
  },

  async login(email: string, password: string): Promise<ApiResponse<LoginResponse>> {
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
    return handleResponse(response);
  },

  algorithms: {
    async getCurrent(): Promise<ApiResponse> {
      const response = await fetch(`${API_BASE_URL}/algorithm`);
      return handleResponse(response);
    },

    async update(algorithm: Algorithm): Promise<ApiResponse> {
      const response = await fetch(`${API_BASE_URL}/algorithm/update`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ algorithm }),
      });
      return handleResponse(response);
    },

    async hash(algorithm: Algorithm, password: string): Promise<ApiResponse> {
      const response = await fetch(`${API_BASE_URL}/algorithm/hash`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ algorithm, password }),
      });
      return handleResponse(response);
    },

    async verify(algorithm: Algorithm, password: string, hashedPassword: string): Promise<ApiResponse> {
      const response = await fetch(`${API_BASE_URL}/algorithm/verify`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ algorithm, password, hashedPassword }),
      });
      return handleResponse(response);
    },
  },
};