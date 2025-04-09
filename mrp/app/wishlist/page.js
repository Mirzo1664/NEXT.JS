'use client'
import { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import product1 from "../../imgs/t1.jpg";
import product2 from "../../imgs/t3.jpg";
import product3 from "../../imgs/t4.jpg";
import product4 from "../../imgs/t6.jpg";
import './style.css';

export default function Wishlist() {
  const [wishlistItems, setWishlistItems] = useState([]);
  
  const productImages = {
    "/t1.jpg": product1,
    "/t2.jpg": product2,
    "/t3.jpg": product3,
    "/t4.jpg": product4 
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
  };

  const calculateTotal = () => {
    return wishlistItems.reduce((total, item) => total + item.salePrice, 0);
  };

  return (
    <div className="wishlist-container">
      <h1>Список желаний</h1>
      {wishlistItems.length === 0 ? (
        <div className="empty-message">
          <h2>Ваш список желаний пуст</h2>
          <Link href="/product" className="continue-shopping">
            Продолжить покупки
          </Link>
        </div>
      ) : (
        <>
          <div className="wishlist-grid">
            {wishlistItems.map(item => (
              <div key={`${item.category}-${item.id}`} className="wishlist-item">
                <div className="wishlist-image-container">
                  <Image 
                    src={productImages[item.image]}
                    alt={item.name}
                    width={200}
                    height={200}
                    objectFit="cover"
                  />
                </div>
                <div className="wishlist-info">
                  <h3>{item.name}</h3>
                  <p className="item-price">${item.salePrice.toFixed(2)}</p>
                  <button 
                    className="remove-btn"
                    onClick={() => removeFromWishlist(item.id, item.category)}
                  >
                    Удалить
                  </button>
                </div>
              </div>
            ))}
          </div>
          <div className="wishlist-summary">
            <div className="summary-content">
              <div className="summary-info">
                <h2>В списке желаний:</h2>
                <div className="summary-details">
                  <span className="items-count">{wishlistItems.length} товаров</span>
                  <span className="total-amount">Общая стоимость: ${calculateTotal().toFixed(2)}</span>
                </div>
              </div>
              <Link href="/product" className="continue-shopping-btn">
                Продолжить покупки
              </Link>
            </div>
          </div>
        </>
      )}
    </div>
  );
}