'use client';

import { CiCircleInfo } from "react-icons/ci";
import { useState, useEffect, useMemo } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import Modal from 'react-modal';
import { FaHeart, FaShoppingCart } from 'react-icons/fa';

// Импорт изображений
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

const customModalStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
    maxWidth: '900px',
    width: '90%',
    maxHeight: '90vh',
    padding: '30px',
    borderRadius: '10px',
    border: 'none',
    boxShadow: '0 5px 15px rgba(0,0,0,0.3)'
  },
  overlay: {
    backgroundColor: 'rgba(0, 0, 0, 0.75)',
    zIndex: 1000
  }
};

// Создаем статический объект с изображениями
const staticProductImages = {
  "/t1.jpg": product1,
  "/t2.jpg": product2,
  "/t3.jpg": product3,
  "/t4.jpg": product4,
  "/ts.png": ts,
  "/ts2.png": ts2,
  "/ts3.png": ts3,
  "/ts4.png": ts4,
  "default": product1 // Добавляем дефолтное изображение
};

export default function Product() {
  const menImages = useMemo(() => [ts, ts2, ts3, ts4], []);
  const allWomenProducts = useMemo(() => productsData.products, []);
  const allMenProducts = useMemo(() => productsData1.products, []);

  const [isLoading, setIsLoading] = useState(true);
  const [wishlist, setWishlist] = useState([]);
  const [cart, setCart] = useState([]);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [customerProducts, setCustomerProducts] = useState([]);
  const [imageCache, setImageCache] = useState(staticProductImages);

  useEffect(() => {
    Modal.setAppElement('body');
    loadInitialData();
    setIsLoading(false); // Убираем прелоадинг, так как изображения уже статичны
  }, []);

  const loadInitialData = () => {
    try {
      const savedWishlist = localStorage.getItem('wishlist');
      const savedCart = localStorage.getItem('cart');
      const savedProducts = localStorage.getItem('userProducts');
      
      if (savedWishlist) setWishlist(JSON.parse(savedWishlist));
      if (savedCart) setCart(JSON.parse(savedCart));
      
      if (savedProducts) {
        const allProducts = JSON.parse(savedProducts);
        const customerProds = allProducts.filter(product => product.category === 'customer');
        setCustomerProducts(customerProds);
        
        // Добавляем customer images в кеш
        const newImages = {...staticProductImages};
        customerProds.forEach(product => {
          if (product.image && product.image.startsWith('data:image')) {
            newImages[`customer-${product.id}`] = product.image;
          }
        });
        
        setImageCache(newImages);
      }
    } catch (error) {
      console.error("Error loading initial data:", error);
    }
  };

  const toggleWishlist = (product, category) => {
    setWishlist(prev => {
      const productKey = `${category}-${product.id}`;
      const exists = prev.some(p => `${p.category}-${p.id}` === productKey);
      const updated = exists ? 
        prev.filter(p => `${p.category}-${p.id}` !== productKey) : 
        [...prev, { ...product, category }];
      localStorage.setItem('wishlist', JSON.stringify(updated));
      return updated;
    });
  };

  const toggleCart = (product, category) => {
    setCart(prev => {
      const productKey = `${category}-${product.id}`;
      const exists = prev.some(p => `${p.category}-${p.id}` === productKey);
      const updated = exists ? 
        prev.filter(p => `${p.category}-${p.id}` !== productKey) : 
        [...prev, { ...product, category }];
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

  const getImageSrc = (product, category, index) => {
    if (category === 'men') {
      return menImages[index % menImages.length] || staticProductImages.default;
    } else if (category === 'customer') {
      return imageCache[`customer-${product.id}`] || product.image || staticProductImages.default;
    } else {
      return imageCache[product.image] || staticProductImages.default;
    }
  };

  const isProductInList = (list, product, category) => {
    return list.some(item => `${item.category}-${item.id}` === `${category}-${product.id}`);
  };

  const renderProductCard = (product, category, index = 0) => {
    const imageSrc = getImageSrc(product, category, index);
    const isInWishlist = isProductInList(wishlist, product, category);
    const isInCart = isProductInList(cart, product, category);

    return (
      <div className="product-card" key={`${category}-${product.id}`}>
        <div className="product-image-container">
          <Image 
            src={imageSrc}
            alt={product.name || product.title}
            fill
            className="product-image"
            quality={100}
            onError={(e) => {
              e.target.src = staticProductImages.default;
              e.target.onerror = null;
            }}
          />
          <div className="product-icons">
            <button 
              className={`icon-button ${isInWishlist ? 'active' : ''}`} 
              onClick={(e) => { 
                e.stopPropagation(); 
                toggleWishlist(product, category); 
              }}
              aria-label={isInWishlist ? "Remove from wishlist" : "Add to wishlist"}
            >
              <FaHeart />
            </button>
            <button 
              className={`icon-button ${isInCart ? 'active' : ''}`} 
              onClick={(e) => { 
                e.stopPropagation(); 
                toggleCart(product, category); 
              }}
              aria-label={isInCart ? "Remove from cart" : "Add to cart"}
            >
              <FaShoppingCart />
            </button>
            <button 
              className="icon-button info-button" 
              onClick={(e) => { 
                e.stopPropagation(); 
                openModal({ ...product, category }); 
              }}
              aria-label="View product details"
            >
              <CiCircleInfo />
            </button>
          </div>
        </div>
        <div className="product-info">
          <div className="product-brand">{product.brand || 'Custom Product'}</div>
          <h3 className="product-name">{product.name || product.title}</h3>
          <span className="product-category-badge">
            {category.toUpperCase()}
          </span>
          <div className="product-price">
            {category !== 'customer' && product.originalPrice && (
              <span className="original-price">
                ${product.originalPrice.toFixed(2)}
              </span>
            )}
            <span className="sale-price">
              ${(product.salePrice || product.price).toFixed(2)}
            </span>
          </div>
        </div>
      </div>
    );
  };

  if (isLoading) {
    return (
      <div className="loading-screen">
        <div className="loading-spinner"></div>
        <p>Loading products...</p>
      </div>
    );
  }

  return (
    <div className="product-page-p">
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        style={customModalStyles}
        contentLabel="Product Details"
      >
        {selectedProduct && (
          <div className="modal-product-content">
            <button 
              className="modal-product-close" 
              onClick={closeModal}
              aria-label="Close modal"
            >
              ×
            </button>
            <div className="modal-product-image-container">
              <Image 
                src={getImageSrc(selectedProduct, selectedProduct.category, 0)}
                alt={selectedProduct.name || selectedProduct.title}
                width={400}
                height={500}
                className="modal-product-image"
                onError={(e) => {
                  e.target.src = staticProductImages.default;
                  e.target.onerror = null;
                }}
              />
            </div>
            <div className="modal-product-info">
              <h2>{selectedProduct.name || selectedProduct.title}</h2>
              <p className="modal-product-brand">{selectedProduct.brand || 'Custom Product'}</p>
              <span className="modal-product-category">
                {selectedProduct.category.toUpperCase()}
              </span>
              <p className="modal-product-description">
                {selectedProduct.description || "No description available."}
              </p>
              <div className="modal-product-price">
                {selectedProduct.originalPrice && selectedProduct.category !== 'customer' && (
                  <span className="original-price">
                    ${selectedProduct.originalPrice.toFixed(2)}
                  </span>
                )}
                <span className="sale-price">
                  ${(selectedProduct.salePrice || selectedProduct.price).toFixed(2)}
                </span>
              </div>
              <div className="modal-product-actions">
                <button 
                  className={`modal-product-button ${isProductInList(wishlist, selectedProduct, selectedProduct.category) ? 'active' : ''}`} 
                  onClick={() => toggleWishlist(selectedProduct, selectedProduct.category)}
                >
                  <FaHeart /> {isProductInList(wishlist, selectedProduct, selectedProduct.category) ? 'In Wishlist' : 'Add to Wishlist'}
                </button>
                <button 
                  className={`modal-product-button ${isProductInList(cart, selectedProduct, selectedProduct.category) ? 'active' : ''}`} 
                  onClick={() => toggleCart(selectedProduct, selectedProduct.category)}
                >
                  <FaShoppingCart /> {isProductInList(cart, selectedProduct, selectedProduct.category) ? 'In Cart' : 'Add to Cart'}
                </button>
              </div>
            </div>
          </div>
        )}
      </Modal>

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

      <div className="products-section">
        <div className="products-header">
          <h2>WOMEN'S FASHION</h2>
          <p>Shop our new arrivals from established brands</p>
        </div>
        <div className="products-grid">
          {allWomenProducts.map((product, idx) => renderProductCard(product, 'women', idx))}
        </div>
      </div>

      <div className="products-section">
        <div className="products-header">
          <h2>MEN'S FASHION</h2>
          <p>Shop our new arrivals from established brands</p>
        </div>
        <div className="products-grid">
          {allMenProducts.map((product, idx) => renderProductCard(product, 'men', idx))}
        </div>
      </div>

      <div className="products-section customer-section">
        <div className="products-header">
          <h2>CUSTOMER PRODUCTS</h2>
          <p>Unique creations from our community</p>
        </div>
        {customerProducts.length > 0 ? (
          <div className="products-grid">
            {customerProducts.map((product, idx) => renderProductCard(product, 'customer', idx))}
          </div>
        ) : (
          <p className="text-center">No customer products yet. Be the first to create one!</p>
        )}
      </div>

      <div className="product-footer-h">
        <div className="product-hero-h">
          <div className="product-image-container-h">
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
            <h4 className="product-subtitle-h">LIVE THE DAY</h4>
            <h1 className="product-title-h">LIVE IN STYLE</h1>
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