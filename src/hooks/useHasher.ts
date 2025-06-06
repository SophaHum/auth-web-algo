import { useState } from 'react';
import { Algorithm } from '../types';
import { authApi } from '../api/authApi';

interface UseHasherReturn {
  hash: (text: string, algorithm: Algorithm) => Promise<void>;
  verify: (text: string, hashedText: string, algorithm: Algorithm) => Promise<boolean>;
  result: string | null;
  isLoading: boolean;
  error: string | null;
}

export const useHasher = (): UseHasherReturn => {
  const [result, setResult] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const hash = async (text: string, algorithm: Algorithm) => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await authApi.algorithms.hash(algorithm, text);
      if (response.hashedPassword) {
        setResult(response.hashedPassword);
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to hash text');
    } finally {
      setIsLoading(false);
    }
  };

  const verify = async (text: string, hashedText: string, algorithm: Algorithm): Promise<boolean> => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await authApi.algorithms.verify(algorithm, text, hashedText);
      return response.isValid || false;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to verify hash');
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  return {
    hash,
    verify,
    result,
    isLoading,
    error
  };
};