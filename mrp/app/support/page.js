'use client';
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import './style.css';

const loadTestimonialsFromStorage = () => {
    const savedTestimonials = localStorage.getItem('testimonials');
    return savedTestimonials ? JSON.parse(savedTestimonials) : [
        {
            id: 1,
            name: "Иван Иванов",
            text: "Отличная поддержка! Решили мой вопрос за считанные минуты.",
        },
        {
            id: 2,
            name: "Мария Петрова",
            text: "Очень профессиональная команда. Рекомендую!",
        },
        {
            id: 3,
            name: "Алексей Смирнов",
            text: "Спасибо за оперативность и качество услуг.",
        },
    ];
};

export default function SupportPage() {
    const [activeTestimonial, setActiveTestimonial] = useState(0);
    const [testimonials, setTestimonials] = useState(loadTestimonialsFromStorage()); 
    const [isFeedbackModOpen, setIsFeedbackModOpen] = useState(false); 
    const [isContactModOpen, setIsContactModOpen] = useState(false); 

    const saveTestimonialsToStorage = (testimonials) => {
        localStorage.setItem('testimonials', JSON.stringify(testimonials));
    };

    const openFeedbackMod = () => {
        setIsFeedbackModOpen(true);
    };

    const closeFeedbackMod = () => {
        setIsFeedbackModOpen(false);
    };

    const openContactMod = () => {
        setIsContactModOpen(true);
    };

    const closeContactMod = () => {
        setIsContactModOpen(false);
    };

    const handleAddTestimonial = (e) => {
        e.preventDefault();
        const name = e.target.name.value;
        const text = e.target.text.value;

        if (name && text) {
            const newTestimonial = {
                id: testimonials.length + 1,
                name,
                text,
            };
            const updatedTestimonials = [...testimonials, newTestimonial];
            setTestimonials(updatedTestimonials);
            saveTestimonialsToStorage(updatedTestimonials); 
            closeFeedbackMod();
        }
    };

    useEffect(() => {
        const interval = setInterval(() => {
            setActiveTestimonial((prev) => (prev + 1) % testimonials.length);
        }, 5000);
        return () => clearInterval(interval);
    }, [testimonials]);

    return (
        <div className="support-container">
            <div className="parallax-section">
                <motion.div
                    className="parallax-bg"
                    style={{ backgroundImage: `url(https://photo-ideal.ru/upload/iblock/6bb/foto_dlya_sayta_2.jpg)` }}
                    initial={{ y: 0 }}
                    whileInView={{ y: -50 }}
                    transition={{ duration: 1 }}
                />
                <div className="parallax-content">
                    <h2>Мы всегда рядом</h2>
                    <p>Наша команда готова помочь вам в любое время.</p>
                </div>
            </div>

            <section className="content">
                <motion.div
                    className="image-section"
                    initial={{ opacity: 0, x: -100 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 1 }}
                >
                    <img src='' alt="Help" className="image-zoom" />
                </motion.div>
                <motion.div
                    className="text-section"
                    initial={{ opacity: 0, x: 100 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 1 }}
                >
                    <h2>Наша миссия</h2>
                    <p>
                        Мы стремимся предоставить вам лучшую поддержку, чтобы вы могли сосредоточиться на том, что действительно важно.
                    </p>
                    <button
                
                        className="pulse-button"
                        onClick={openContactMod}
                    >
                        Связаться с нами
                    </button>
                </motion.div>
            </section>

            <section className="stats-section">
                <h2>Наша статистика</h2>
                <div className="progress-bars">
                    <div className="progress-bar">
                        <motion.div
                            className="progress"
                            initial={{ width: 0 }}
                            whileInView={{ width: '95%' }}
                            transition={{ duration: 2 }}
                        />
                        <span>Удовлетворенность клиентов: 95%</span>
                    </div>
                    <div className="progress-bar">
                        <motion.div
                            className="progress"
                            initial={{ width: 0 }}
                            whileInView={{ width: '90%' }}
                            transition={{ duration: 2 }}
                        />
                        <span>Оперативность: 90%</span>
                    </div>
                    <div className="progress-bar">
                        <motion.div
                            className="progress"
                            initial={{ width: 0 }}
                            whileInView={{ width: '98%' }}
                            transition={{ duration: 2 }}
                        />
                        <span>Надежность: 98%</span>
                    </div>
                </div>
            </section>

            <section className="testimonials-section">
                <h2>Отзывы наших клиентов</h2>
                <div className="testimonials-carousel">
                    {testimonials.map((testimonial, index) => (
                        <motion.div
                            key={testimonial.id}
                            className={`testimonial ${index === activeTestimonial ? 'active' : ''}`}
                            initial={{ opacity: 0, y: 50 }}
                            animate={{ opacity: index === activeTestimonial ? 1 : 0, y: index === activeTestimonial ? 0 : 50 }}
                            transition={{ duration: 0.5 }}
                        >
                            <p>"{testimonial.text}"</p>
                            <h3>- {testimonial.name}</h3>
                        </motion.div>
                    ))}
                </div>
                <button className="add-testimonial-button" onClick={openFeedbackMod}>
                    Оставить отзыв
                </button>
            </section>

            <AnimatePresence>
                {isFeedbackModOpen && (
                    <motion.div
                        className="mod-overlay"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={closeFeedbackMod}
                    >
                        <motion.div
                            className="mod-content"
                            initial={{ y: -50, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            exit={{ y: -50, opacity: 0 }}
                            onClick={(e) => e.stopPropagation()}
                        >
                            <h2 >Оставить отзыв</h2>
                            <form onSubmit={handleAddTestimonial}>
                                <input
                                    type="text"
                                    name="name"
                                    placeholder="Ваше имя"
                                    required
                                />
                                <textarea
                                    name="text"
                                    placeholder="Ваш отзыв"
                                    required
                                />
                                <button type="submit">Отправить</button>
                            </form>
                            <button className="close-button" onClick={closeFeedbackMod}>×</button>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>

            <AnimatePresence>
                {isContactModOpen && (
                    <motion.div
                        className="mod-overlay"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={closeContactMod}
                    >
                        <motion.div
                            className="mod-content"
                            initial={{ y: -50, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            exit={{ y: -50, opacity: 0 }}
                            onClick={(e) => e.stopPropagation()}
                        >
                            <h2>Связаться с нами</h2>
                            <form action="https://formspree.io/f/xaneowad" method="POST">
                                <input
                                    type="email"
                                    name="email"
                                    placeholder="Ваш email"
                                    required
                                />
                                <textarea
                                    name="message"
                                    placeholder="Ваше сообщение"
                                    required
                                />
                                <button type="submit" >Отправить</button>
                            </form>
                            <button className="close-button" onClick={closeContactMod}>×</button>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}