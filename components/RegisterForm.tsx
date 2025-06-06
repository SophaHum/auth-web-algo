import React, { useState } from 'react';
import { useAuth } from '../hooks/useAuth';
import { Algorithm } from '../types';
import { AVAILABLE_ALGORITHMS } from '../constants';

export const RegisterForm: React.FC = () => {
  const { register, isLoading, error } = useAuth();
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    algorithm: 'sha256' as Algorithm
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const { username, email, password, algorithm } = formData;
    await register(username, email, password, algorithm);
  };

  return (
    <form onSubmit={handleSubmit}>
      {error && <div className="error">{error}</div>}
      <div>
        <input
          type="text"
          placeholder="Username"
          value={formData.username}
          onChange={e => setFormData(prev => ({ ...prev, username: e.target.value }))}
          required
        />
      </div>
      <div>
        <input
          type="email"
          placeholder="Email"
          value={formData.email}
          onChange={e => setFormData(prev => ({ ...prev, email: e.target.value }))}
          required
        />
      </div>
      <div>
        <input
          type="password"
          placeholder="Password"
          value={formData.password}
          onChange={e => setFormData(prev => ({ ...prev, password: e.target.value }))}
          required
        />
      </div>
      <div>
        <select
          value={formData.algorithm}
          onChange={e => setFormData(prev => ({ ...prev, algorithm: e.target.value as Algorithm }))}
        >
          {AVAILABLE_ALGORITHMS.map(algo => (
            <option key={algo} value={algo}>{algo}</option>
          ))}
        </select>
      </div>
      <button type="submit" disabled={isLoading}>
        {isLoading ? 'Registering...' : 'Register'}
      </button>
    </form>
  );
};
