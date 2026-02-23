// LoadingProvider - Context provider for loading state

'use client';

import { createContext, useContext, useState, useEffect, type ReactNode } from 'react';
import { SplashScreen } from '@/components/ui/SplashScreen';

interface LoadingContextType {
  isLoading: boolean;
  setSceneLoaded: () => void;
  setContentLoaded: () => void;
}

const LoadingContext = createContext<LoadingContextType | undefined>(undefined);

interface LoadingProviderProps {
  children: ReactNode;
}

export function LoadingProvider({ children }: LoadingProviderProps) {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <LoadingContext.Provider value={{ isLoading, setSceneLoaded: () => {}, setContentLoaded: () => {} }}>
      <SplashScreen isLoading={isLoading} />
      {children}
    </LoadingContext.Provider>
  );
}

export function useLoading() {
  const context = useContext(LoadingContext);
  if (context === undefined) {
    throw new Error('useLoading must be used within a LoadingProvider');
  }
  return context;
}
