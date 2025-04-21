'use client'
import { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { FaTimes } from 'react-icons/fa';
import product1 from "../../imgs/t1.jpg";
import product2 from "../../imgs/t3.jpg";
import product3 from "../../imgs/t4.jpg";
import product4 from "../../imgs/t6.jpg";
import ts from "../../imgs/ts.png"
import ts2 from "../../imgs/ts2.png"
import ts3 from "../../imgs/ts3.png"
import ts4 from "../../imgs/ts4.png"
import Alert from '../Alert';
import './style.css';

export default function Wishlist() {
  const [wishlistItems, setWishlistItems] = useState([]);
  const [alert, setAlert] = useState(null);
  
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

  useEffect(() => {
    const savedWishlist = localStorage.getItem('wishlist');
    if (savedWishlist) {
      setWishlistItems(JSON.parse(savedWishlist));
    }
  }, []);

  const removeFromWishlist = (productId, category) => {
    const updatedWishlist = wishlistItems.filter(
      item => !(item.id === productId && item.category === category)
    );
    setWishlistItems(updatedWishlist);
    localStorage.setItem('wishlist', JSON.stringify(updatedWishlist));
    
    setAlert({
      type: 'success',
      message: 'Item removed from wishlist'
    });
    
    setTimeout(() => setAlert(null), 3000);
  };

  const addAllToCart = () => {
    const savedCart = localStorage.getItem('cart') || '[]';
    const currentCart = JSON.parse(savedCart);
    
    const updatedCart = [...currentCart, ...wishlistItems];
    localStorage.setItem('cart', JSON.stringify(updatedCart));
    
    setWishlistItems([]);
    localStorage.setItem('wishlist', '[]');
    
    setAlert({
      type: 'success',
      message: `All items (${wishlistItems.length}) added to cart`
    });
    
    setTimeout(() => setAlert(null), 3000);
  };

  const calculateTotal = () => {
    return wishlistItems.reduce((total, item) => total + item.salePrice, 0);
  };

  return (
    <div className="page-layout-container">
      <div className="content-wrapper">
        <Alert alert={alert} onClose={() => setAlert(null)} />
        
        <div className="wishlist-page-container">
          <h1 className="wishlist-title">WISHLIST</h1>
          {wishlistItems.length === 0 ? (
            <div className="wishlist-empty-message">
              <h2>Your wishlist is empty</h2>
              <Link href="/product" className="wishlist-continue-shopping">
                Continue Shopping
              </Link>
            </div>
          ) : (
            <>
              <div className="wishlist-header">
                <div className="header-product">Product</div>
                <div className="header-price">Price</div>
                <div className="header-actions">Actions</div>
              </div>

              <div className="wishlist-items-list">
                {wishlistItems.map(item => (
                  <div key={`${item.category}-${item.id}`} className="wishlist-item-card">
                    <div className="wishlist-item-product">
                      <div className="wishlist-product-image-wrapper">
                        <Image 
                          src={productImages[item.image]}
                          alt={item.name}
                          width={100}
                          height={100}
                          objectFit="contain"
                        />
                      </div>
                      <span className="wishlist-product-name">{item.name}</span>
                    </div>
                    
                    <div className="wishlist-item-price">
                      ${item.salePrice.toFixed(2)}
                    </div>
                    
                    <div className="wishlist-item-actions">
                      <button 
                        className="wishlist-remove-btn"
                        onClick={() => removeFromWishlist(item.id, item.category)}
                      >
                        <FaTimes />
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              <div className="wishlist-summary">
                <div className="wishlist-total-info">
                  <span>Total items: {wishlistItems.length}</span>
                  <span>Total cost: ${calculateTotal().toFixed(2)}</span>
                </div>
                <button className="wishlist-add-all-btn" onClick={addAllToCart}>
                  Add all to cart
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
