
import React, { useState, FormEvent } from 'react';
import { useAuth } from '../hooks/useAuth';
import Input from './common/Input';
import Button from './common/Button';
import UserIcon from './icons/UserIcon';
import LockIcon from './icons/LockIcon';

const AuthPage: React.FC = () => {
  const [isLoginMode, setIsLoginMode] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const { login, register, isLoading, error } = useAuth();

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (isLoginMode) {
      await login(email, password);
    } else {
      if (password !== confirmPassword) {
        alert("Passwords don't match!"); // Simple alert, could use error state
        return;
      }
      await register(email, email, password, 'sha256'); // Using email as username for now
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-primary-500 to-accent-500 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8 bg-white p-10 rounded-xl shadow-2xl">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            {isLoginMode ? 'Sign in to your account' : 'Create a new account'}
          </h2>
        </div>
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          {error && <p className="text-red-500 text-sm text-center">{error}</p>}
          <Input
            id="email"
            label="Email address"
            type="email"
            autoComplete="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="you@example.com"
            icon={<UserIcon />}
          />
          <Input
            id="password"
            label="Password"
            type="password"
            autoComplete={isLoginMode ? "current-password" : "new-password"}
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="••••••••"
            icon={<LockIcon />}
          />
          {!isLoginMode && (
            <Input
              id="confirm-password"
              label="Confirm Password"
              type="password"
              autoComplete="new-password"
              required
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="••••••••"
              icon={<LockIcon />}
            />
          )}

          <div>
            <Button type="submit" isLoading={isLoading} fullWidth variant="primary">
              {isLoginMode ? 'Sign in' : 'Register'}
            </Button>
          </div>
        </form>
        <div className="text-sm text-center">
          <button
            onClick={() => { setIsLoginMode(!isLoginMode); }}
            className="font-medium text-primary-600 hover:text-primary-500"
          >
            {isLoginMode ? "Don't have an account? Register" : 'Already have an account? Sign in'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default AuthPage;
