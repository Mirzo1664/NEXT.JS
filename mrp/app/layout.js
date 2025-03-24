'use client'; // Добавляем 'use client', так как используем состояние и эффекты
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Nav from "./nav/page";
import Footer from "./footer/page";
import { useState, useEffect } from 'react';

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

  // Загружаем тему из localStorage при загрузке страницы
  useEffect(() => {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
      setIsDarkMode(true);
    }
  }, []);

  // Применяем тему и сохраняем её в localStorage
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
        <Nav />
        {children}
        <Footer />
        {/* Кнопка для переключения темы */}
        <button
          onClick={toggleDarkMode}
          style={{
            position: 'fixed',
            bottom: '20px',
            right: '20px',
            padding: '10px',
            borderRadius: '50%',
            backgroundColor: isDarkMode ? '#fff' : '#000',
            color: isDarkMode ? '#000' : '#fff',
            border: 'none',
            cursor: 'pointer',
            zIndex: 1000,
          }}
        >
          {isDarkMode ? '☀️' : '🌙'}
        </button>
      </body>
    </html>
  );
}