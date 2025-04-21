'use client';
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Nav from "./nav/page";
import Footer from "./footer/page";
import { useState, useEffect } from 'react';
import { AuthProvider } from "./context/AuthContext";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export default function RootLayout({ children }) {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
      setIsDarkMode(true);
    }

    const timer = setTimeout(() => {
      setIsLoading(false);
    },10);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  }, [isDarkMode]);

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
  };

  return (
    <html lang="en" lang="ru" className="translated-ltr">
      <body className={`${geistSans.variable} ${geistMono.variable} ${isDarkMode ? 'dark' : ''}`}>
        {isLoading ? (
          <div className="loader-overlay">
            <div className="loader-wrapper">
              <div className="loader-circle"></div>
              <div className="loader-circle"></div>
              <div className="loader-circle"></div>
              <div className="loader-shadow"></div>
              <div className="loader-shadow"></div>
              <div className="loader-shadow"></div>
            </div>
          </div>
        ) : (
          <AuthProvider>
            <Nav />
            {children}
            <Footer />
            <button
              onClick={toggleDarkMode}
              className="theme-toggle-button"
            >
              {isDarkMode ? '☀️' : '🌙'}
            </button>
          </AuthProvider>
        )}
      </body>
    </html>
  );
}