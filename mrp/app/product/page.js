'use client';

import { CiCircleInfo } from "react-icons/ci";
import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import Modal from 'react-modal';
import { FaHeart, FaShoppingCart } from 'react-icons/fa';

import pr from '../../imgs/pr.png';
import h from '../../imgs/h.png';
import ts from "../../imgs/ts.png";
import ts2 from "../../imgs/ts2.png";
import ts3 from "../../imgs/ts3.png";
import ts4 from "../../imgs/ts4.png";
import product1 from "../../imgs/t1.jpg";
import product2 from "../../imgs/t3.jpg";
import product3 from "../../imgs/t4.jpg";
import product4 from "../../imgs/t6.jpg";

import productsData from '../products.json';
import productsData1 from '../product-man.json';

import './style.css';

export default function Product() {
  const productImages = {
    "/t1.jpg": product1,
    "/t2.jpg": product2,
    "/t3.jpg": product3,
    "/t4.jpg": product4,
    "/ts.png": ts,
    "/ts2.png": ts2,
    "/ts3.png": ts3,
    "/ts4.png": ts4
  };

  const [wishlist, setWishlist] = useState([]);
  const [cart, setCart] = useState([]);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);

  useEffect(() => {
    Modal.setAppElement('body');
  }, []);

  useEffect(() => {
    const savedWishlist = localStorage.getItem('wishlist');
    const savedCart = localStorage.getItem('cart');
    if (savedWishlist) setWishlist(JSON.parse(savedWishlist));
    if (savedCart) setCart(JSON.parse(savedCart));
  }, []);

  const toggleWishlist = (product, category) => {
    setWishlist(prev => {
      const exists = prev.some(p => p.id === product.id && p.category === category);
      const updated = exists ? prev.filter(p => !(p.id === product.id && p.category === category)) : [...prev, { ...product, category }];
      localStorage.setItem('wishlist', JSON.stringify(updated));
      return updated;
    });
  };

  const toggleCart = (product, category) => {
    setCart(prev => {
      const exists = prev.some(p => p.id === product.id && p.category === category);
      const updated = exists ? prev.filter(p => !(p.id === product.id && p.category === category)) : [...prev, { ...product, category }];
      localStorage.setItem('cart', JSON.stringify(updated));
      return updated;
    });
  };

  const openModal = (product) => {
    setSelectedProduct(product);
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
  };

  const allWomenProducts = productsData.products;
  const allMenProducts = productsData1.products;
  const menImages = [ts, ts2, ts3, ts4];

  const renderProductCard = (product, category, index = 0) => {
    const isInWishlist = wishlist.some(item => item.id === product.id && item.category === category);
    const isInCart = cart.some(item => item.id === product.id && item.category === category);
    const imageSrc = category === 'men' ? menImages[index % menImages.length] : productImages[product.image];

    return (
      <div className="product-card" key={`${category}-${product.id}`}>
        <div className="product-image-container">
          <Image 
            src={imageSrc}
            alt={product.name}
            fill
            className="product-image"
            quality={100}
          />
          <div className="product-icons">
            <button className={`icon-button ${isInWishlist ? 'active' : ''}`} onClick={(e) => { e.stopPropagation(); toggleWishlist(product, category); }}>
              <FaHeart />
            </button>
            <button className={`icon-button ${isInCart ? 'active' : ''}`} onClick={(e) => { e.stopPropagation(); toggleCart(product, category); }}>
              <FaShoppingCart />
            </button>
            <button className="icon-button info-button" onClick={(e) => { e.stopPropagation(); openModal({ ...product, category }); }}>
              <CiCircleInfo />
            </button>
          </div>
        </div>
        <div className="product-info">
          <div className="product-brand">{product.brand}</div>
          <h3 className="product-name">{product.name}</h3>
          <div className="product-price">
            <span className="original-price">${product.originalPrice.toFixed(2)}</span>
            <span className="sale-price">${product.salePrice.toFixed(2)}</span>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="product-page-p">
      {/* Modal */}
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        className="modal-product"
        overlayClassName="modal-product-overlay"
        style={{ content: { width: 'calc(100% + 80px)', height: 'calc(100% + 80px)', maxWidth: '880px', maxHeight: 'calc(43vh + 80px)' } }}
      >
        {selectedProduct && (
          <div className="modal-product-content">
            <button className="modal-product-close" onClick={closeModal}>×</button>
            <div className="modal-product-image-container">
              <Image 
                src={productImages[selectedProduct.image] || ts}
                alt={selectedProduct.name}
                width={400}
                height={500}
                className="modal-product-image"
              />
            </div>
            <div className="modal-product-info">
              <h2>{selectedProduct.name}</h2>
              <p className="modal-product-brand">{selectedProduct.brand}</p>
              <p className="modal-product-description">{selectedProduct.description || "No description available."}</p>
              <div className="modal-product-price">
                <span className="original-price">${selectedProduct.originalPrice.toFixed(2)}</span>
                <span className="sale-price">${selectedProduct.salePrice.toFixed(2)}</span>
              </div>
              <div className="modal-product-actions">
                <button className={`modal-product-button ${wishlist.some(item => item.id === selectedProduct.id) ? 'active' : ''}`} onClick={() => toggleWishlist(selectedProduct, selectedProduct.category)}>
                  <FaHeart /> {wishlist.some(item => item.id === selectedProduct.id) ? 'In Wishlist' : 'Add to Wishlist'}
                </button>
                <button className={`modal-product-button ${cart.some(item => item.id === selectedProduct.id) ? 'active' : ''}`} onClick={() => toggleCart(selectedProduct, selectedProduct.category)}>
                  <FaShoppingCart /> {cart.some(item => item.id === selectedProduct.id) ? 'In Cart' : 'Add to Cart'}
                </button>
              </div>
            </div>
          </div>
        )}
      </Modal>

      {/* Hero Section */}
      <div className="product-hero-p">
        <div className="product-image-p">
          <Image src={pr} alt="Fashion collection" fill priority className="product-image" />
          <div className="image-overlay"></div>
        </div>
        <div className="product-content">
          <h4 className="product-subtitle">NEW TREND</h4>
          <h1 className="product-title">COLLUSION</h1>
          <p className="product-description">An exclusive selection of this season's trends.</p>
          <div className="product-actions">
            <Link href="/" className="discover-button">HOME</Link>
            <Link href="/about" className="shop-button">ABOUT US</Link>
          </div>
        </div>
      </div>

      {/* Women's Section */}
      <div className="products-section">
        <div className="products-header">
          <h2>WOMEN'S FASHION</h2>
          <p>Shop our new arrivals from established brands</p>
        </div>
        <div className="products-grid">
          {allWomenProducts.map((product, idx) => renderProductCard(product, 'women', idx))}
        </div>
      </div>

      {/* Men's Section */}
      <div className="products-section">
        <div className="products-header">
          <h2>MEN'S FASHION</h2>
          <p>Shop our new arrivals from established brands</p>
        </div>
        <div className="products-grid">
          {allMenProducts.map((product, idx) => renderProductCard(product, 'men', idx))}
        </div>
      </div>

      {/* Footer Hero Section */}
      <div className="product-footer-h">
        <div className="product-hero-h">
          <div className="product-image-h">
            <Image 
              src={h} 
              alt="Fashion collection" 
              fill
              priority
              className="product-image-h"
            />
            <div className="image-overlay-h"></div>
          </div>
          <div className="product-content-h">
            <h4 className="product-subtitle">LIVE THE DAY</h4>
            <h1 className="product-title">LIVE IN STYLE</h1>
            <div className="product-actions-h">
              <Link href="/home" className="discover-button-h">
                SUPPORT
              </Link>
            </div>
          </div>
        </div>
      </div>

    </div>
  );
}
