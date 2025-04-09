'use client';
import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import './style.css';
import clothes from '../../imgs/Clothes.webp';
import Shop from '../../imgs/Shop.jpg';

const loadTestimonialsFromStorage = () => {
  if (typeof window !== 'undefined') {
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
  }
  return [];
};

export default function SupportPage() {
  const [activeTestimonial, setActiveTestimonial] = useState(0);
  const [testimonials, setTestimonials] = useState([]);
  const [isFeedbackModOpen, setIsFeedbackModOpen] = useState(false);
  const [isContactModOpen, setIsContactModOpen] = useState(false);

  useEffect(() => {
    setTestimonials(loadTestimonialsFromStorage());
  }, []);

  const saveTestimonialsToStorage = (testimonials) => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('testimonials', JSON.stringify(testimonials));
    }
  };

  const handleAddTestimonial = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const name = formData.get('name');
    const text = formData.get('text');

    if (name && text) {
      const newTestimonial = {
        id: Date.now(),
        name,
        text,
      };
      const updatedTestimonials = [...testimonials, newTestimonial];
      setTestimonials(updatedTestimonials);
      saveTestimonialsToStorage(updatedTestimonials);
      setIsFeedbackModOpen(false);
      e.target.reset();
    }
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveTestimonial((prev) => (prev + 1) % testimonials.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [testimonials.length]);

  return (
    <div className="support-container">
      <div className="parallax-section">
        <div className="parallax-content">

          <h2>We are always close by</h2>
          <p>Our team is ready to help you at any time.</p>
        </div>
      </div>

      <section className="content">
        <div className="image-section">
          <Image
            src={clothes}
            alt="Help"
            className="image-zoom"
            height={900}
            width={900}
            priority
          />
        </div>
        <div className="text-section">
          <h2>Our Mission</h2>

          <p className='text-section-p'>
            We strive to provide you with the best support so you can focus on what really matters.
          </p>
          <button
            className="pulse-button"
            onClick={() => setIsContactModOpen(true)}
            aria-label="Связаться с нами"
          >

Contact us
          </button>
        </div>
      </section>

      <section className="stats-section">
        <h2>Our statistics</h2>
        <div className="progress-bars">
          {[
            { label: 'Customer Satisfaction', value: '95%' },
            { label: 'Efficiency', value: '90%' },
            { label: 'Reliability', value: '98%' },
          ].map((stat, index) => (
            <div key={index} className="progress-bar">
              <div className="progress" style={{ width: stat.value }} />
              <span>{stat.label}: {stat.value}</span>
            </div>
          ))}
        </div>
      </section>

      <section className="testimonials-section">
        <h2>Our customers reviews</h2>
        <div className="testimonials-carousel">
          {testimonials.map((testimonial, index) => (
            index === activeTestimonial && (
              <div key={testimonial.id} className="testimonial active">
                <p>"{testimonial.text}"</p>
                <h3>- {testimonial.name}</h3>
              </div>
            )
          ))}
        </div>
        <button
          className="add-testimonial-button"
          onClick={() => setIsFeedbackModOpen(true)}
          aria-label="Leave a review"
        >
          Leave a review
        </button>
      </section>

      {isFeedbackModOpen && (
        <Modal
          isOpen={isFeedbackModOpen}
          onClose={() => setIsFeedbackModOpen(false)}
          title="Leave a review"
        >
          <form onSubmit={handleAddTestimonial}>
            <input
              type="text"
              name="name"
              placeholder="Your name"
              required
              aria-label="Your name"
            />
            <textarea
              name="text"
              placeholder="Your review"
              required
              aria-label="Your review"
              rows={4}
            />
            <button type="submit">Send</button>
          </form>
        </Modal>
      )}

      {isContactModOpen && (
        <Modal
          isOpen={isContactModOpen}
          onClose={() => setIsContactModOpen(false)}
          title="Contact us"
        >
          <form action="https://formspree.io/f/xaneowad" method="POST">
            <input
              type="email"
              name="email"
              placeholder="Your email"
              required
              aria-label="Your email"
            />
            <textarea
              name="message"
              placeholder="Your message"
              required
              aria-label="Your message"
              rows={4}
            />
            <button type="submit">Send</button>
          </form>
        </Modal>
      )}
    </div>
  );
}

function Modal({ isOpen, onClose, title, children }) {
  if (!isOpen) return null;

  return (
    <div className="mod-overlay" onClick={onClose}>
      <div className="mod-content" onClick={(e) => e.stopPropagation()}>
        <h2>{title}</h2>
        {children}
        <button
          className="close-button"
          onClick={onClose}
          aria-label="Закрыть"
        >

        </button>
      </div>
    </div>
  );
}