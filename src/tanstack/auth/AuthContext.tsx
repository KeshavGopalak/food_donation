import AsyncStorage from '@react-native-async-storage/async-storage';
import React, {
  createContext,
  ReactNode,
  useCallback,
  useContext,
  useEffect,
  useState,
} from 'react';

const AUTH_TOKEN_KEY = 'auth_token';

type AuthContextValue = {
  token: string | null;
  setToken: (token: string | null) => Promise<void>;
};

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [token, updateToken] = useState<string | null>(null);

  useEffect(() => {
    let isMounted = true;
    AsyncStorage.getItem(AUTH_TOKEN_KEY)
      .then(savedToken => {
        if (isMounted && savedToken) {
          updateToken(savedToken);
        }
      })
      .catch(error => {
        console.error('Unable to restore the saved authentication token.', error);
      });

    return () => {
      isMounted = false;
    };
  }, []);

  const setToken = useCallback(async (nextToken: string | null) => {
    if (nextToken) {
      await AsyncStorage.setItem(AUTH_TOKEN_KEY, nextToken);
    } else {
      await AsyncStorage.removeItem(AUTH_TOKEN_KEY);
    }
    updateToken(nextToken);
  }, []);

  return (
    <AuthContext.Provider value={{ token, setToken }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }

  return context;
}
