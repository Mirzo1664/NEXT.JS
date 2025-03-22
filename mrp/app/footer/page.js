'use client';

import "./footer.css";
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin, FaTelegram } from 'react-icons/fa';

export default function Footer() {
    return (
        <footer className="footer">
            <div className="footerContent">
                <div className="footerSection">
                    <h2>MRP WEBSITE</h2>
                    <p>
                        Your Style, Your Story
                        At MRP, we don’t just sell clothes—we help you tell your story. Every piece in our collection is designed to make you feel confident, empowered, and ready to take on the world.
                    </p>
                    <div className="socialIcons">
                        <a href="https://www.facebook.com/profile.php?id=100086488926125" aria-label="Facebook"><FaFacebook /></a>
                        <a href="https://x.com/FreeGame764333" aria-label="Twitter"><FaTwitter /></a>
                        <a href="https://www.instagram.com/ibragimov.m.d/?next=%2F" aria-label="Instagram"><FaInstagram /></a>
                        <a href="https://www.linkedin.com/in/mirzoali-ibragimov-386194358/" aria-label="LinkedIn"><FaLinkedin /></a>
                        <a href="https://t.me/IbragimovMirzoAli" aria-label="Telegram"><FaTelegram /></a>
                    </div>
                </div>
                <div className="footerSection">
                    <h3>LINK</h3>
                    <ul>
                        <li><a href="/">Home</a></li>
                        <li><a href="/about">About</a></li>
                        <li><a href="/product">Products</a></li>
                        <li><a href="/support">Support</a></li>
                    </ul>
                </div>
                <div className="footerSection">
                    <h3>Контакты</h3>
                    <ul>
                        <li>Adress: Uzbekistan-Samarkand</li>
                        <li>Phone: +998 (93) 929-92-62</li>
                        <li>Email: dilshodxodjanov@gmail.com</li>
                    </ul>
                </div>
                <div className="footerSection">
                    <h3>SEND REVIEW</h3>
                    <p>Leave your feedback and we will contact you.</p>
                    <form action="https://formspree.io/f/xaneowad" method="POST">
                        <input type="email" name="email" placeholder="Your email" required />
                        <textarea name="message" placeholder="Your review" required></textarea>
                        <button type="submit">Send</button>
                    </form>
                </div>
            </div>
            <div className="footerBottom">
                <p>&copy; Created in 2025. MRP: Timeless Style, Endless Possibilities.</p>
            </div>
        </footer>
    );
}