'use client';

import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination, Navigation } from 'swiper/modules';
import t1 from '../../imgs/t1.jpg';
import t2 from '../../imgs/t2.jpg';
import t3 from '../../imgs/t3.jpg';
import t4 from '../../imgs/t4.jpg';
import t5 from '../../imgs/t5.jpg';
import t6 from '../../imgs/t6.jpg';
import w1 from '../../imgs/w1.jpg';
import w2 from '../../imgs/w2.jpg';
import w3 from '../../imgs/w3.jpg';
import R from '../../imgs/R.png';
import M from '../../imgs/M.png';
import Image from 'next/image';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import './style.css';

export default function About() {
    return (
        <div className="about-page">
            <div className="hero-section">
                <div className="hero-content">
                    <h1>About Us</h1>
                    <p>We create fashion that inspires</p>
                    <div>
                        <a href='/produc'>
                            <button className="button">
                                <i className="animation"></i>Go To Shop<i className="animation"></i>
                            </button>
                        </a>
                    </div>
                </div>
            </div>

            <div className="mission-section">
                <h2>Our Mission</h2>
                <p>
                    We believe that clothing is not just fabric, but a way to express individuality. Our goal is to help you feel confident and stylish every day. We carefully select each item to ensure it delights you with quality, comfort, and design.
                </p>
            </div>

            <div className="values-section">
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

            <div className="team-section">
                <h2>Our Team</h2>
                <p>
                    We are a team of enthusiasts who live and breathe fashion. Our designers, stylists, and managers work together to create the best shopping experience for you.
                </p>
                <div className="team-grid">
                    <div className="team-member">
                        <Image src={w1} alt='Jessie, Lead Designer' width={300} height={400} />
                        <h3>Jessie</h3>
                        <p>Lead Designer</p>
                    </div>
                    <div className="team-member">
                        <Image src={w2} alt='Ivan, Sales Manager' width={300} height={400} />
                        <h3>Ivan</h3>
                        <p>Sales Manager</p>
                    </div>
                    <div className="team-member">
                        <Image src={w3} alt='Kate, Stylist' width={300} height={400} />
                        <h3>Kate</h3>
                        <p>Stylist</p>
                    </div>
                </div>
            </div>

            <div className="cta-section">
                <h2>Join Our Style!</h2>
                <p>
                    Explore our collections and find what highlights your uniqueness.
                </p>
                <div>
                    <a href='/product'>
                        <button className="button">
                            <i className="animation"></i>Go To Shop<i className="animation"></i>
                        </button>
                    </a>
                </div>
            </div>

            <h1 className='products-title'>Our Products</h1>

            <div className="clothing-slider">
                <Swiper
                    modules={[Autoplay, Pagination, Navigation]}
                    spaceBetween={30}
                    slidesPerView={3}
                    centeredSlides={true}
                    autoplay={{
                        delay: 3000,
                        disableOnInteraction: false
                    }}
                    pagination={{
                        clickable: true,
                        dynamicBullets: true
                    }}
                    navigation
                    loop
                    className="mySwiper"
                    breakpoints={{
                        320: {
                            slidesPerView: 1,
                            spaceBetween: 20
                        },
                        768: {
                            slidesPerView: 2,
                            spaceBetween: 30
                        },
                        1024: {
                            slidesPerView: 3,
                            spaceBetween: 40
                        }
                    }}
                >
                    {[t1, t2, t3, t4, t5, t6].map((img, i) => (
                        <SwiperSlide key={i}>
                            <Image
                                src={img}
                                alt={`Fashion item ${i + 1}`}
                                width={400}
                                height={400}
                                className="image-swapper"
                            />
                        </SwiperSlide>
                    ))}
                </Swiper>
            </div>

            <div className="about-content">
                <div className="story-section left-image">
                    <div className="story-image">
                        <Image
                            src={M}
                            alt="Founder of MRP"
                            width={500}
                            height={600}
                            className="founder-photo"
                        />
                    </div>
                    <div className="story-text">
                        <h2>The Idea and the Woman</h2>
                        <p>
                            MRP was founded in 2010 and has become one of the most successful companies in our country.
                            Like many Italian companies, MRP remains a family business, although no family member is a designer.
                        </p>
                        <p>
                            We follow a successful formula, working with renowned designers to create our collections.
                            This method was described by fashion critic Colin McDowell as a form of design co-creation,
                            typical for many Italian prêt-à-porter brands.
                        </p>
                    </div>
                </div>

                <div className="story-section right-image">
                    <div className="story-text">
                        <h2>Magic in the Details</h2>
                        <p>
                            The first MRP store opened in a small town in the eastern part of the country in 2010.
                            The first collection consisted of two coats and a suit that were replicas of famous designs.
                        </p>
                        <p>
                            Although the founder was a lawyer by education, her family had deep roots in tailoring:
                            her great-grandmother made clothes for women, and her mother opened a professional sewing school.
                            The ambition to create clothing for the masses carried huge potential—especially at a time
                            when high fashion still dominated and the quality prêt-à-porter market hardly existed.
                        </p>
                    </div>
                    <div className="story-image">
                        <Image
                            src={R}
                            alt="MRP clothing details"
                            width={500}
                            height={600}
                            className="details-photo"
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}
