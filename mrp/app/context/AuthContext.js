'use client';

import { createContext, useState, useContext, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Alert from '../Alert';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [accounts, setAccounts] = useState([]);
  const [alert, setAlert] = useState(null); // Добавляем состояние для алерта
  const router = useRouter();

  // Показ алерта с автоскрытием
  const showAlert = (message, type = 'danger') => {
    setAlert({ message, type });
    setTimeout(() => setAlert(null), 5000);
  };
  

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    const storedAccounts = localStorage.getItem('accounts');
    
    if (storedUser) setUser(JSON.parse(storedUser));
    if (storedAccounts) setAccounts(JSON.parse(storedAccounts));
  }, []);

  const login = async (email, password) => {
    try {
      const storedAccounts = JSON.parse(localStorage.getItem('accounts') || '[]');
      const account = storedAccounts.find(acc => acc.email === email && acc.password === password);
      
      if (account) {
        const userData = { email: account.email, name: account.username };
        setUser(userData);
        localStorage.setItem('user', JSON.stringify(userData));
        router.push('/profile');
        showAlert('Login successful!', 'success');
        return true;
      } else {
        showAlert('Invalid email or password. Please sign up first.');
        return false;
      }
    } catch (err) {
      showAlert('An error occurred during login');
      return false;
    }
  };

  const signup = async (username, email, password) => {
    try {
      const storedAccounts = JSON.parse(localStorage.getItem('accounts') || '[]');
      const emailExists = storedAccounts.some(acc => acc.email === email);
      
      if (emailExists) {
        throw new Error('Email already registered');
      }
      
      const newAccount = { username, email, password };
      const updatedAccounts = [...storedAccounts, newAccount];
      
      setAccounts(updatedAccounts);
      localStorage.setItem('accounts', JSON.stringify(updatedAccounts));
      
      const userData = { email, name: username };
      setUser(userData);
      localStorage.setItem('user', JSON.stringify(userData));
      router.push('/profile');
      showAlert('Registration successful!', 'success');
      return true;
    } catch (err) {
      showAlert(err.message || 'Registration failed');
      return false;
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('user');
    router.push('/login');
    showAlert('You have been logged out', 'info');
  };

  return (
    <AuthContext.Provider value={{ user, login, signup, logout, accounts, alert, showAlert }}>
      {alert && <Alert alert={alert} onClose={() => showAlert(null)} />}
      {children}
    </AuthContext.Provider>
  );

  
};

  
export const useAuth = () => useContext(AuthContext);

  