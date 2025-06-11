import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { User, AuthContextType } from '../types';

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Mock users for demo purposes
const mockUsers: (User & { password: string })[] = [
  {
    id: '1',
    email: 'admin@company.com',
    password: 'admin123',
    name: 'Admin User',
    role: 'admin',
    department: 'IT',
    createdAt: new Date('2024-01-01')
  },
  {
    id: '2',
    email: 'user@company.com',
    password: 'user123',
    name: 'John Doe',
    role: 'user',
    department: 'Marketing',
    createdAt: new Date('2024-01-15')
  }
];

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check for stored user session
    const storedUser = localStorage.getItem('servicedesk_user');
    if (storedUser) {
      try {
        const userData = JSON.parse(storedUser);
        setUser({
          ...userData,
          createdAt: new Date(userData.createdAt)
        });
      } catch (error) {
        console.error('Error parsing stored user:', error);
        localStorage.removeItem('servicedesk_user');
      }
    }
    setLoading(false);
  }, []);

  const login = async (email: string, password: string): Promise<boolean> => {
    setLoading(true);
    
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    const foundUser = mockUsers.find(u => u.email === email && u.password === password);
    
    if (foundUser) {
      const { password: _, ...userWithoutPassword } = foundUser;
      setUser(userWithoutPassword);
      localStorage.setItem('servicedesk_user', JSON.stringify(userWithoutPassword));
      setLoading(false);
      return true;
    }
    
    setLoading(false);
    return false;
  };

  const register = async (email: string, password: string, name: string, department?: string): Promise<boolean> => {
    setLoading(true);
    
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Check if user already exists
    if (mockUsers.some(u => u.email === email)) {
      setLoading(false);
      return false;
    }
    
    const newUser: User = {
      id: Date.now().toString(),
      email,
      name,
      role: 'user',
      department,
      createdAt: new Date()
    };
    
    // Add to mock users (in real app, this would be an API call)
    mockUsers.push({ ...newUser, password });
    
    setUser(newUser);
    localStorage.setItem('servicedesk_user', JSON.stringify(newUser));
    setLoading(false);
    return true;
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('servicedesk_user');
  };

  return (
    <AuthContext.Provider value={{ user, login, register, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};