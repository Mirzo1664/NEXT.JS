'use client'
import { useState, useEffect } from 'react';
import Link from 'next/link'
import Image from 'next/image'
import pr from '../../imgs/pr.png'
import h from '../../imgs/h.png'
import pr1 from '../../imgs/pr1.png'
import pr2 from '../../imgs/pr2.png'
import pr3 from '../../imgs/pr3.png'
import pr4 from '../../imgs/pr4.png'
import product1 from "../../imgs/t1.jpg"
import product4 from "../../imgs/t6.jpg"
import product2 from "../../imgs/t3.jpg"
import product3 from "../../imgs/t4.jpg"
import productsData from '../products.json'
import productsData1 from '../product-man.json'
import './style.css'
import { FaHeart, FaShoppingCart } from 'react-icons/fa';

export default function Product() {
  const productImages = {
    "/t1.jpg": product1,
    "/t2.jpg": product2,
    "/t3.jpg": product3,
    "/t4.jpg": product4 
  };

  // Состояния для количества отображаемых товаров
  const [womenVisibleCount, setWomenVisibleCount] = useState(4);
  const [menVisibleCount, setMenVisibleCount] = useState(4);

  const [wishlist, setWishlist] = useState([]);
  const [cart, setCart] = useState([]);

  useEffect(() => {
    const savedWishlist = localStorage.getItem('wishlist');
    const savedCart = localStorage.getItem('cart');
    if (savedWishlist) setWishlist(JSON.parse(savedWishlist));
    if (savedCart) setCart(JSON.parse(savedCart));
  }, []);

  // Функции для загрузки дополнительных товаров
  const loadMoreWomen = () => {
    setWomenVisibleCount(prev => prev + 4);
  };

  const loadMoreMen = () => {
    setMenVisibleCount(prev => prev + 4);
  };

  // Функция для работы с вишлистом
  const toggleWishlist = (product, category) => {
    setWishlist(prev => {
      const isInWishlist = prev.some(item => item.id === product.id && item.category === category);
      let newWishlist;
      if (isInWishlist) {
        newWishlist = prev.filter(item => !(item.id === product.id && item.category === category));
      } else {
        newWishlist = [...prev, { ...product, category: category }];
      }
      localStorage.setItem('wishlist', JSON.stringify(newWishlist));
      return newWishlist;
    });
  };

  // Функция для добавления в корзину
  const toggleCart = (product, category) => {
    setCart(prev => {
      const isInCart = prev.some(item => item.id === product.id && item.category === category);
      let newCart;
      if (isInCart) {
        newCart = prev.filter(item => !(item.id === product.id && item.category === category));
      } else {
        newCart = [...prev, { ...product, category: category }];
      }
      localStorage.setItem('cart', JSON.stringify(newCart));
      return newCart;
    });
  };

  return (
    <div className="product-page-p">
      {/* Hero Section */}
      <div className="product-hero-p">
        <div className="product-image-p">
          <Image 
            src={pr} 
            alt="Fashion collection" 
            fill
            priority
            className="product-image"
          />
          <div className="image-overlay"></div>
        </div>
        
        <div className="product-content">
          <h4 className="product-subtitle">NEW TREND</h4>
          <h1 className="product-title">COLLUSION</h1>
          <p className="product-description">An exclusive selection of this season's trends.</p>
          
          <div className="product-actions">
            <Link href="/home" className="discover-button">
              HOME
            </Link>
            <Link href="/About" className="shop-button">
              ABOUT US
            </Link>
          </div>
        </div>
      </div>
       
      {/* Gallery Section */}
      <div className="gallery-section">
        <div className="gallery-grid">
          <div className="gallery-item large">
            <Image 
              src={pr1}
              alt="Fashion gallery"
              fill
              className="gallery-image"
            />
          </div>
          <div className="gallery-item small">
            <Image 
              src={pr4}
              alt="Fashion gallery"
              fill
              className="gallery-image"
            />
          </div>
          <div className="gallery-item small">
            <Image 
              src={pr3}
              alt="Fashion gallery"
              fill
              className="gallery-image"
            />
          </div>
          <div className="gallery-item large">
            <Image 
              src={pr2}
              alt="Fashion gallery"
              fill
              className="gallery-image"
            />
            <div className="category-overlay">
              <h3>BEAUTY FASHION</h3>
            </div>
          </div>
        </div>
      </div>

      <div className="products-section">
        <div className="products-header">
          <h2>WOMEN'S FASHION</h2>
          <p>Shop our new arrivals from established brands</p>
        </div>
        
        <div className="products-grid">
          {productsData.products.slice(0, womenVisibleCount).map((product) => {
            const isInWishlist = wishlist.some(item => item.id === product.id && item.category === 'women');
            const isInCart = cart.some(item => item.id === product.id && item.category === 'women');
            
            return (
              <div className="product-card" key={`women-${product.id}`}>
                <div className="product-image-container">
                  <Image 
                    src={productImages[product.image]}
                    alt={product.name}
                    fill
                    className="product-image"
                    quality={100}
                  />
                  <div className="product-icons">
                    <button 
                      className={`icon-button ${isInWishlist ? 'active' : ''}`}
                      onClick={() => toggleWishlist(product, 'women')}
                    >
                      <FaHeart />
                    </button>
                    <button 
                      className={`icon-button ${isInCart ? 'active' : ''}`}
                      onClick={() => toggleCart(product, 'women')}
                    >
                      <FaShoppingCart />
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
          })}
        </div>
        
        {womenVisibleCount < productsData.products.length && (
          <div className="load-more-container">
            <button onClick={loadMoreWomen} className="load-more-button">
              SHOW MORE
            </button>
          </div>
        )}
      </div>

      {/* Men's Fashion Section */}
      <div className="products-section">
        <div className="products-header">
          <h2>MEN'S FASHION</h2>
          <p>Shop our new arrivals from established brands</p>
        </div>
        
        <div className="products-grid">
          {productsData1.products.slice(0, menVisibleCount).map((product) => {
            const isInWishlist = wishlist.some(item => item.id === product.id && item.category === 'men');
            const isInCart = cart.some(item => item.id === product.id && item.category === 'men');
            
            return (
              <div className="product-card" key={`men-${product.id}`}>
                <div className="product-image-container">
                  <Image 
                    src={productImages[product.image]}
                    alt={product.name}
                    fill
                    className="product-image"
                    quality={100}
                  />
                  <div className="product-icons">
                    <button 
                      className={`icon-button ${isInWishlist ? 'active' : ''}`}
                      onClick={() => toggleWishlist(product, 'men')}
                    >
                      <FaHeart />
                    </button>
                    <button 
                      className={`icon-button ${isInCart ? 'active' : ''}`}
                      onClick={() => toggleCart(product, 'men')}
                    >
                      <FaShoppingCart />
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
          })}
        </div>
        
        {menVisibleCount < productsData1.products.length && (
          <div className="load-more-container">
            <button onClick={loadMoreMen} className="load-more-button">
              SHOW MORE
            </button>
          </div>
        )}
      </div>

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
  )
}