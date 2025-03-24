'use client';

import { createContext, useState, useContext, useEffect, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import Alert from '../Alert';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [accounts, setAccounts] = useState([]);
  const [alert, setAlert] = useState(null);
  const router = useRouter();

  const showAlert = useCallback((message, type = 'danger') => {
    setAlert({ message, type });
    const timer = setTimeout(() => setAlert(null), 5000);
    return () => clearTimeout(timer);
  }, []);

  const persistUser = useCallback((userData) => {
    setUser(userData);
    localStorage.setItem('user', JSON.stringify(userData));
  }, []);

  useEffect(() => {
    try {
      const storedUser = localStorage.getItem('user');
      const storedAccounts = localStorage.getItem('accounts');
      
      if (storedUser) setUser(JSON.parse(storedUser));
      if (storedAccounts) setAccounts(JSON.parse(storedAccounts));
    } catch (err) {
      showAlert('Failed to load user data');
      localStorage.removeItem('user');
    }
  }, [showAlert]);

  const login = async (email, password) => {
    try {
      const storedAccounts = JSON.parse(localStorage.getItem('accounts') || '[]');
      const account = storedAccounts.find(acc => acc.email === email && acc.password === password);
      
      if (!account) {
        showAlert('Invalid email or password. Please sign up first.');
        return false;
      }
      
      const userData = { email: account.email, name: account.username };
      persistUser(userData);
      router.push('/profile');
      showAlert('Login successful!', 'success');
      return true;
    } catch (err) {
      showAlert('An error occurred during login');
      return false;
    }
  };

  const signup = async (username, email, password) => {
    try {
      const storedAccounts = JSON.parse(localStorage.getItem('accounts') || []);
      
      // Проверяем уникальность email
      if (storedAccounts.some(acc => acc.email === email)) {
        throw new Error('Email already registered');
      }
      
      // Проверяем уникальность username
      if (storedAccounts.some(acc => acc.username === username)) {
        throw new Error('Username already taken');
      }
      
      const newAccount = { username, email, password };
      const updatedAccounts = [...storedAccounts, newAccount];
      
      setAccounts(updatedAccounts);
      localStorage.setItem('accounts', JSON.stringify(updatedAccounts));
      
      const userData = { email, name: username };
      persistUser(userData);
      router.push('/profile');
      showAlert('Registration successful!', 'success');
      return true;
    } catch (err) {
      showAlert(err.message || 'Registration failed');
      return false;
    }
  };

  const logout = useCallback(() => {
    setUser(null);
    localStorage.removeItem('user');
    router.push('/login');
    showAlert('You have been logged out', 'info');
  }, [router, showAlert]);

  const deleteAccount = useCallback(() => {
    try {
      if (!user) {
        showAlert('No user to delete');
        return false;
      }

      const storedAccounts = JSON.parse(localStorage.getItem('accounts') || []);
      const updatedAccounts = storedAccounts.filter(acc => acc.email !== user.email);
      
      setAccounts(updatedAccounts);
      localStorage.setItem('accounts', JSON.stringify(updatedAccounts));
      
      setUser(null);
      localStorage.removeItem('user');
      
      router.push('/');
      showAlert('Account deleted successfully', 'success');
      return true;
    } catch (err) {
      showAlert('Failed to delete account');
      return false;
    }
  }, [user, router, showAlert]);

  return (
    <AuthContext.Provider value={{ 
      user, 
      login, 
      signup, 
      logout, 
      deleteAccount,
      accounts, 
      alert, 
      showAlert 
    }}>
      {alert && (
        <Alert 
          message={alert.message} 
          type={alert.type} 
          onClose={() => setAlert(null)} 
        />
      )}
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};