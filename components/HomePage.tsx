import React, { useState, useEffect } from 'react';
import { useAuth } from '../hooks/useAuth';
import { Algorithm } from '../types';
import { AVAILABLE_ALGORITHMS } from '../constants';
import Button from './common/Button';
import Select from './common/Select';
import LogoutIcon from './icons/LogoutIcon';
import { authApi } from '../src/api/authApi';

const HomePage: React.FC = () => {
  const { user, logout } = useAuth();
  const [selectedAlgorithm, setSelectedAlgorithm] = useState<Algorithm>(AVAILABLE_ALGORITHMS[0]);
  const [inputText, setInputText] = useState<string>('');
  const [generatedHash, setGeneratedHash] = useState<string | null>(null);
  const [isGenerating, setIsGenerating] = useState<boolean>(false);
  const [currentAlgorithm, setCurrentAlgorithm] = useState<Algorithm>(AVAILABLE_ALGORITHMS[0]);

  useEffect(() => {
    const fetchCurrentAlgorithm = async () => {
      try {
        const response = await authApi.algorithms.getCurrent();
        if (response.algorithm) {
          setSelectedAlgorithm(response.algorithm);
          setCurrentAlgorithm(response.algorithm);
        }
      } catch (error) {
        console.error('Failed to fetch current algorithm:', error);
      }
    };
    fetchCurrentAlgorithm();
  }, []);

  const handleAlgorithmChange = async (algorithm: Algorithm) => {
    try {
      await authApi.algorithms.update(algorithm);
      setSelectedAlgorithm(algorithm);
      setCurrentAlgorithm(algorithm);
    } catch (error) {
      console.error('Failed to update algorithm:', error);
      // Revert selection
      setSelectedAlgorithm(currentAlgorithm);
    }
  };

  const handleGenerateHash = async () => {
    if (!inputText.trim()) {
      alert("Please enter some text to hash.");
      return;
    }
    setIsGenerating(true);
    setGeneratedHash(null);
    try {
      const response = await authApi.algorithms.hash(selectedAlgorithm, inputText);
      if (response.hashedPassword) {
        setGeneratedHash(response.hashedPassword);
      }
    } catch (error) {
      console.error('Failed to generate hash:', error);
      alert('Failed to generate hash. Please try again.');
    } finally {
      setIsGenerating(false);
    }
  };

  const algorithmOptions = AVAILABLE_ALGORITHMS.map(algo => ({ value: algo, label: algo }));

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header */}
      <header className="bg-white shadow-md">
        <div className="max-w-7xl mx-auto py-4 px-4 sm:px-6 lg:px-8 flex justify-between items-center">
          <h1 className="text-2xl font-semibold text-gray-900">Algorithm Demo</h1>
          <div className="flex items-center space-x-4">
            {user && <span className="text-sm text-gray-600">Welcome, {user.email}!</span>}
            <Button onClick={logout} variant="secondary" className="flex items-center space-x-2">
              <LogoutIcon />
              <span>Logout</span>
            </Button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-4xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
        <div className="bg-white p-8 rounded-lg shadow-xl space-y-6">
          <div>
            <h2 className="text-xl font-semibold text-gray-800 mb-1">Hashing Algorithm Playground</h2>
            <p className="text-sm text-gray-600">Select an algorithm, enter text, and simulate hash generation.</p>
          </div>

          <Select
            label="Choose Algorithm"
            id="algorithm"
            options={algorithmOptions}
            value={selectedAlgorithm}
            onChange={(e) => handleAlgorithmChange(e.target.value as Algorithm)}
          />

          <div>
            <label htmlFor="inputText" className="block text-sm font-medium text-gray-700 mb-1">
              Text to Hash
            </label>
            <textarea
              id="inputText"
              rows={4}
              className="shadow-sm focus:ring-primary-500 focus:border-primary-500 block w-full sm:text-sm border border-gray-300 rounded-md p-2"
              placeholder="Enter any text here..."
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
            />
          </div>

          <Button onClick={handleGenerateHash} isLoading={isGenerating} fullWidth variant="primary">
            {isGenerating ? 'Generating...' : 'Generate Mock Hash'}
          </Button>

          {generatedHash && (
            <div className="mt-6 p-4 bg-gray-50 rounded-md border border-gray-200">
              <h3 className="text-md font-medium text-gray-700">Generated Output:</h3>
              <pre className="mt-1 text-sm text-gray-900 whitespace-pre-wrap break-all bg-gray-100 p-3 rounded">
                {generatedHash}
              </pre>
              <p className="mt-2 text-xs text-gray-500">Note: This is a simulated hash for demonstration purposes.</p>
            </div>
          )}
           {!generatedHash && isGenerating && (
             <div className="mt-6 p-4 bg-gray-50 rounded-md border border-gray-200 flex items-center justify-center">
                <svg className="animate-spin h-8 w-8 text-primary-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                <p className="ml-3 text-sm text-gray-600">Generating hash...</p>
             </div>
           )}
        </div>
      </main>
    </div>
  );
};

export default HomePage;
