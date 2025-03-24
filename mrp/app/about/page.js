'use client';


import React, { useRef } from 'react';
import { useInView } from 'react-intersection-observer';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination, Navigation } from 'swiper/modules';
import t1 from '../../imgs/t1.jpg'
import t2 from '../../imgs/t2.jpg'
import t3 from '../../imgs/t3.jpg'
import t4 from '../../imgs/t4.jpg'
import t5 from '../../imgs/t5.jpg'
import t6 from '../../imgs/t6.jpg'
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import './style.css';


export default function About() {
    const [heroRef, heroInView] = useInView({ triggerOnce: true, threshold: 0.3 });
    const [missionRef, missionInView] = useInView({ triggerOnce: true, threshold: 0.3 });
    const [valuesRef, valuesInView] = useInView({ triggerOnce: true, threshold: 0.3 });
    const [teamRef, teamInView] = useInView({ triggerOnce: true, threshold: 0.3 });
    const [ctaRef, ctaInView] = useInView({ triggerOnce: true, threshold: 0.3 });

    return (
        <div className="about-page">
            <div ref={heroRef} className={`hero-section ${heroInView ? 'fade-in' : ''}`}>
                <div className="hero-content">
                    <h1>About Us</h1>
                    <p>We create fashion that inspires</p>
                    <div>
                        <a href='/'><button className="button"><i className="animation"></i>Go To Shop<i className="animation"></i></button></a>
                    </div>
                </div>
            </div>

            <div ref={missionRef} className={`mission-section ${missionInView ? 'slide-in-left' : ''}`}>
                <h2>Our Mission</h2>
                <p>
                    We believe that clothing is not just fabric, but a way to express individuality. Our goal is to help you feel confident and stylish every day. We carefully select each item to ensure it delights you with quality, comfort, and design.
                </p>
            </div>

            <div ref={valuesRef} className={`values-section ${valuesInView ? 'fade-in' : ''}`}>
                <h2>Why Choose Us?</h2>
                <div className="values-grid">
                    <div className="value-card">
                        <div className="icon">💎</div>
                        <h3>Quality</h3>
                        <p>We work only with trusted materials and manufacturers.</p>
                    </div>
                    <div className="value-card">
                        <div className="icon">✨</div>
                        <h3>Uniqueness</h3>
                        <p>Our collections are created with attention to detail.</p>
                    </div>
                    <div className="value-card">
                        <div className="icon">🚀</div>
                        <h3>Fast Delivery</h3>
                        <p>Get your order quickly and conveniently.</p>
                    </div>
                    <div className="value-card">
                        <div className="icon">❤️</div>
                        <h3>Customer Care</h3>
                        <p>Your satisfaction is our priority.</p>
                    </div>
                </div>
            </div>

            <div ref={teamRef} className={`team-section ${teamInView ? 'slide-in-right' : ''}`}>
                <h2>Our Team</h2>
                <p>
                    We are a team of enthusiasts who live and breathe fashion. Our designers, stylists, and managers work together to create the best shopping experience for you.
                </p>
                <div className="team-grid">
                    <div className="team-member">
                        <img src="https://photo-ideal.ru/upload/iblock/6bb/foto_dlya_sayta_2.jpg" alt="Andre - Lead Designer" />
                        <h3>Andre</h3>
                        <p>Lead Designer</p>
                    </div>
                    <div className="team-member">
                        <img src="https://photo-ideal.ru/upload/iblock/6bb/foto_dlya_sayta_2.jpg" alt="Ivan - Sales Manager" />
                        <h3>Ivan</h3>
                        <p>Sales Manager</p>
                    </div>
                    <div className="team-member">
                        <img src="https://photo-ideal.ru/upload/iblock/6bb/foto_dlya_sayta_2.jpg" alt="Vasya - Stylist" />
                        <h3>Vasya</h3>
                        <p>Stylist</p>
                    </div>
                </div>
            </div>

            <div ref={ctaRef} className={`cta-section ${ctaInView ? 'fade-in' : ''}`}>
                <h2>Join Our Style!</h2>
                <p>
                    Explore our collections and find what highlights your uniqueness.
                </p>
                <div>
                    <a href='/'><button className="button"><i className="animation"></i>Go To Shop<i className="animation"></i></button></a>
                </div>
                
            </div>
            <div className="clothing-slider">
                <Swiper
                    modules={[Autoplay, Pagination, Navigation]}
                    spaceBetween={30}
                    slidesPerView={3}
                    autoplay={{ delay: 3000, disableOnInteraction: false }}
                    pagination={{ clickable: true }}
                    navigation
                    loop
                    className="mySwiper"
                >
                    <SwiperSlide>
                        <img src={t1} alt="Clothing 1" />
                    </SwiperSlide>
                    <SwiperSlide>
                        <img src={t2} alt="Clothing 2" />
                    </SwiperSlide>
                    <SwiperSlide>
                        <img src={t3} alt="Clothing 3" />
                    </SwiperSlide>
                    <SwiperSlide>
                        <img src={t4} alt="Clothing 4" />
                    </SwiperSlide>
                    <SwiperSlide>
                        <img src={t5} alt="Clothing 5" />
                    </SwiperSlide>
                    <SwiperSlide>
                        <img src={t6} alt="Clothing 6" />
                    </SwiperSlide>
                </Swiper>
            </div>
        </div>
    );
}