export type Algorithm = "sha256" | "bcrypt" | "argon2";

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface User {
  id: string;
  email: string;
  username: string;
}

export interface AuthResponse {
  message: string;
  status?: string;
  error?: string;
}

export interface AlgorithmResponse {
  algorithm: Algorithm;
  message?: string;
}

export interface HashResponse {
  hashedPassword: string;
  algorithm: Algorithm;
  message?: string;
}

export interface VerifyResponse {
  isValid: boolean;
  message?: string;
}

export interface ApiError {
  message: string;
  status?: number;
}

export interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  error: string | null;
  login: (email: string, password: string) => Promise<void>;
  register: (username: string, email: string, password: string, hashAlgorithm: Algorithm) => Promise<void>;
  logout: () => void;
}

export interface ApiResponse<T = any> {
  [x: string]: any;
  success: boolean;
  message: string;
  data: T | null;
}

export interface LoginResponse {
  token?: string;
  user: {
    id: string;
    email: string;
    username: string;
  };
}

export interface RegisterRequest {
  username: string;
  email: string;
  password: string;
  hashAlgorithm: string;
}