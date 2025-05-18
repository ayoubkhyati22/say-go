import { createContext, useContext, useState, useEffect } from 'react';

type User = {
  id: string;
  name: string;
  email: string;
  profileImage?: string;
};

type AuthContextType = {
  user: User | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => void;
  register: (name: string, email: string, password: string) => void;
  logout: () => void;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const isAuthenticated = !!user;

  // Check for stored user data on app launch
  useEffect(() => {
    // In a real app, this would check for a stored token or session
    // For demo purposes, we'll just set a fake user if one was previously logged in
    const storedUser = {
      id: '123',
      name: 'John Doe',
      email: 'john.doe@example.com',
    };
    
    // Uncomment this line to simulate an already logged in user
    // setUser(storedUser);
  }, []);

  const login = (email: string, password: string) => {
    // In a real app, this would make an API call to validate credentials
    // For demo purposes, we'll accept any credentials and create a fake user
    
    // Simulate an API response delay
    setTimeout(() => {
      const newUser = {
        id: '123',
        name: 'John Doe',
        email: email,
      };
      
      setUser(newUser);
      
      // In a real app, we would store the token/session here
    }, 500);
  };

  const register = (name: string, email: string, password: string) => {
    // In a real app, this would make an API call to create a new user
    // For demo purposes, we'll accept any data and create a fake user
    
    // Simulate an API response delay
    setTimeout(() => {
      const newUser = {
        id: '123',
        name: name,
        email: email,
      };
      
      setUser(newUser);
      
      // In a real app, we would store the token/session here
    }, 500);
  };

  const logout = () => {
    // In a real app, this would clear the token/session
    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated,
        login,
        register,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}