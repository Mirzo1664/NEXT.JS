'use client';

import { createContext, useState, useContext, useEffect, useCallback, useMemo } from 'react';
import { useRouter } from 'next/navigation';
import Alert from '../Alert';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [accounts, setAccounts] = useState([]);
  const [alert, setAlert] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  const showAlert = useCallback((message, type = 'error') => {
    setAlert({ message, type });
    const timer = setTimeout(() => setAlert(null), 5000);
    return () => clearTimeout(timer);
  }, []);

  const persistUser = useCallback((userData) => {
    setUser(userData);
    localStorage.setItem('user', JSON.stringify(userData));
  }, []);

  const checkAuth = useCallback(() => {
    try {
      const storedUser = localStorage.getItem('user');
      if (storedUser) {
        const parsedUser = JSON.parse(storedUser);
        
        // Проверяем, есть ли пользователь в accounts
        const storedAccounts = JSON.parse(localStorage.getItem('accounts') || '[]');
        const accountExists = storedAccounts.some(acc => acc.email === parsedUser.email);
        
        if (accountExists) {
          setUser(parsedUser);
          return true;
        } else {
          // Пользователь есть в user, но нет в accounts - очищаем
          localStorage.removeItem('user');
          setUser(null);
          return false;
        }
      }
      return false;
    } catch (err) {
      console.error('Auth check error:', err);
      localStorage.removeItem('user');
      setUser(null);
      return false;
    }
  }, []);

  useEffect(() => {
    const verifyAuth = async () => {
      try {
        await checkAuth();
      } catch (err) {
        showAlert('Failed to verify authentication');
      } finally {
        setIsLoading(false);
      }
    };

    verifyAuth();
  }, [checkAuth, showAlert]);

  const login = useCallback(async (email, password) => {
    try {
      setIsLoading(true);
      const storedAccounts = JSON.parse(localStorage.getItem('accounts') || '[]');
      const account = storedAccounts.find(acc => acc.email === email);
      
      if (!account) {
        showAlert('Email not found. Please sign up first.');
        return false;
      }
      
      if (account.password !== password) {
        showAlert('Incorrect password');
        return false;
      }
      
      const userData = { 
        email: account.email, 
        name: account.username,
        createdAt: account.createdAt 
      };
      
      persistUser(userData);
      router.push('/profile');
      showAlert('Login successful!', 'success');
      return true;
    } catch (err) {
      showAlert('An error occurred during login');
      return false;
    } finally {
      setIsLoading(false);
    }
  }, [persistUser, router, showAlert]);

  const signup = useCallback(async (username, email, password) => {
    try {
      setIsLoading(true);
      const storedAccounts = JSON.parse(localStorage.getItem('accounts') || '[]');
      
      const emailExists = storedAccounts.some(acc => acc.email === email);
      const usernameExists = storedAccounts.some(acc => acc.username === username);
      
      if (emailExists) {
        throw new Error('Email already registered');
      }
      
      if (usernameExists) {
        throw new Error('Username already taken');
      }
      
      if (password.length < 6) {
        throw new Error('Password must be at least 6 characters');
      }
      
      const newAccount = { 
        username, 
        email, 
        password,
        createdAt: new Date().toISOString() 
      };
      
      const updatedAccounts = [...storedAccounts, newAccount];
      
      setAccounts(updatedAccounts);
      localStorage.setItem('accounts', JSON.stringify(updatedAccounts));
      
      const userData = { 
        email, 
        name: username,
        createdAt: newAccount.createdAt 
      };
      
      persistUser(userData);
      router.push('/profile');
      showAlert('Registration successful!', 'success');
      return true;
    } catch (err) {
      showAlert(err.message || 'Registration failed');
      return false;
    } finally {
      setIsLoading(false);
    }
  }, [persistUser, router, showAlert]);

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

      const storedAccounts = JSON.parse(localStorage.getItem('accounts') || '[]');
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

  const contextValue = useMemo(() => ({
    user,
    accounts,
    alert,
    isLoading,
    login,
    signup,
    logout,
    deleteAccount,
    showAlert,
    checkAuth
  }), [user, accounts, alert, isLoading, login, signup, logout, deleteAccount, showAlert, checkAuth]);

  return (
    <AuthContext.Provider value={contextValue}>
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

  