'use client';

import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import icon from "../../imgs/logo.png";
import { CiLogin } from "react-icons/ci";
import { CgProfile } from "react-icons/cg";
import { BsFillBasket3Fill } from "react-icons/bs";
import { FaHeart } from "react-icons/fa";
import { useAuth } from '../context/AuthContext';
import "./style.css";
import 'bootstrap/dist/css/bootstrap.min.css';

export default function Nav() {
  const pathname = usePathname();
  const [modalOpen, setModalOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const { user, logout } = useAuth();

  useEffect(() => {
    const checkIsMobile = () => {
      setIsMobile(window.innerWidth < 992);
    };

    checkIsMobile();

    window.addEventListener('resize', checkIsMobile);
    return () => window.removeEventListener('resize', checkIsMobile);
  }, []);

  useEffect(() => {
    if (modalOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
  }, [modalOpen]);

  const userIcons = user ? (
    <div className="d-flex align-items-center gap-3">
      <Link href="/wishlist" className="nav-link">
        <FaHeart className="fs-5" />
      </Link>
      <Link href="/basket" className="nav-link">
        <BsFillBasket3Fill className="fs-5" />
      </Link>
      <Link href="/profile" className="nav-link">
        <CgProfile /> Profile
      </Link>
    </div>
  ) : (
    <Link href="/login" className="nav-link">
      <CiLogin /> Login
    </Link>
  );

  return (
    <nav className="navbar navbar-expand-lg navbar-dark">
      <div className="container">
        <Link className="navbar-brand d-flex align-items-center" href="/">
          <Image src={icon} alt="icon" width={140} height={110} className="logo-img" />
        </Link>

        {isMobile && (
          <button
            id="open-modal"
            className="btn btn-outline-light ms-2"
            onClick={() => setModalOpen(true)}
          >
            Menu
          </button>
        )}

        {isMobile && modalOpen && (
          <div className="modal-overlay">
            <div className="modal-content">
              <button
                className="close-modal"
                onClick={() => setModalOpen(false)}
              >
                &times;
              </button>

              <div className="modal-links">
                <Link href="/" className="nav-link" onClick={() => setModalOpen(false)}>
                  Home
                </Link>
                <Link href="/about" className="nav-link" onClick={() => setModalOpen(false)}>
                  About Us
                </Link>
                <Link href="/product" className="nav-link" onClick={() => setModalOpen(false)}>
                  Product
                </Link>
                <Link href="/support" className="nav-link" onClick={() => setModalOpen(false)}>
                  Support
                </Link>
                {user ? (
                  <>
                    <Link href="/wishlist" className="nav-link" onClick={() => setModalOpen(false)}>
                      <FaHeart /> Wishlist
                    </Link>
                    <Link href="/basket" className="nav-link" onClick={() => setModalOpen(false)}>
                      <BsFillBasket3Fill /> basket
                    </Link>
                    <Link href="/profile" className="nav-link" onClick={() => setModalOpen(false)}>
                      <CgProfile /> Profile
                    </Link>
                  </>
                ) : (
                  <Link href="/login" className="nav-link" onClick={() => setModalOpen(false)}>
                    <CiLogin /> Login
                  </Link>
                )}
              </div>
            </div>
          </div>
        )}

        <div className="collapse navbar-collapse" id="navbarNav">
          <div className="navbar-nav ms-auto">
            <Link href="/" className="nav-link">
              Home
            </Link>
            <Link href="/about" className="nav-link">
              About Us
            </Link>
            <Link href="/product" className="nav-link">
              Product
            </Link>
            <Link href="/support" className="nav-link">
              Support
            </Link>
            {userIcons}
          </div>
        </div>
      </div>
    </nav>
  );
}