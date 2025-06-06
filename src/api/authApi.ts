import api from './axios';
import { Algorithm, ApiResponse, LoginResponse, RegisterRequest } from '../types';

export const authApi = {
  async register(username: string, email: string, password: string, hashAlgorithm: Algorithm): Promise<ApiResponse<LoginResponse>> {
    return api.post('/register', {
      username,
      email,
      password,
      hashAlgorithm
    });
  },

  async login(email: string, password: string): Promise<ApiResponse<LoginResponse>> {
    return api.post('/login', {
      email,
      password,
    });
  },

  algorithms: {
    async getCurrent(): Promise<ApiResponse> {
      return api.get('/algorithm');
    },

    async update(algorithm: Algorithm): Promise<ApiResponse> {
      return api.post('/algorithm/update', { algorithm });
    },

    async hash(algorithm: Algorithm, password: string): Promise<ApiResponse> {
      return api.post('/algorithm/hash', { algorithm, password });
    },

    async verify(algorithm: Algorithm, password: string, hashedPassword: string): Promise<ApiResponse> {
      return api.post('/algorithm/verify', { algorithm, password, hashedPassword });
    },
  },
};