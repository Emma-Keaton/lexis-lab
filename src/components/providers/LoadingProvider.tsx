// LoadingProvider - Context provider for loading state

'use client';

import { createContext, useContext, useState, useEffect, useCallback, type ReactNode } from 'react';
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
  const [sceneReady, setSceneReady] = useState(false);
  const [contentReady, setContentReady] = useState(false);

  const setSceneLoaded = useCallback(() => {
    setSceneReady(true);
  }, []);

  const setContentLoaded = useCallback(() => {
    setContentReady(true);
  }, []);

  useEffect(() => {
    const minLoadTime = 1500;
    const startTime = Date.now();

    const checkReady = () => {
      if (sceneReady && contentReady) {
        const elapsed = Date.now() - startTime;
        const remaining = Math.max(0, minLoadTime - elapsed);
        
        setTimeout(() => {
          setIsLoading(false);
        }, remaining);
      }
    };

    checkReady();
  }, [sceneReady, contentReady]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setContentReady(true);
    }, 100);

    return () => clearTimeout(timer);
  }, []);

  return (
    <LoadingContext.Provider value={{ isLoading, setSceneLoaded, setContentLoaded }}>
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
