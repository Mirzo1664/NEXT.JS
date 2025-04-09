'use client'
import { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { FaPlus, FaMinus } from 'react-icons/fa';
import product1 from "../../imgs/t1.jpg";
import product2 from "../../imgs/t3.jpg";
import product3 from "../../imgs/t4.jpg";
import product4 from "../../imgs/t6.jpg";
import './style.css'


export default function Basket() {
  const [cartItems, setCartItems] = useState([]);
  
  const productImages = {
    "/t1.jpg": product1,
    "/t2.jpg": product2,
    "/t3.jpg": product3,
    "/t4.jpg": product4 
  };

  useEffect(() => {
    const savedCart = localStorage.getItem('cart');
    if (savedCart) {
      const items = JSON.parse(savedCart);
      const itemsWithQuantity = items.map(item => ({
        ...item,
        quantity: item.quantity || 1
      }));
      setCartItems(itemsWithQuantity);
    }
  }, []);

  const updateQuantity = (productId, category, change) => {
    setCartItems(prev => {
      const newItems = prev.map(item => {
        if (item.id === productId && item.category === category) {
          const newQuantity = Math.max(1, item.quantity + change);
          return { ...item, quantity: newQuantity };
        }
        return item;
      });
      localStorage.setItem('cart', JSON.stringify(newItems));
      return newItems;
    });
  };

  const removeFromCart = (productId, category) => {
    const updatedCart = cartItems.filter(
      item => !(item.id === productId && item.category === category)
    );
    setCartItems(updatedCart);
    localStorage.setItem('cart', JSON.stringify(updatedCart));
  };

  const calculateTotal = () => {
    return cartItems.reduce((total, item) => {
      return total + (item.salePrice * item.quantity);
    }, 0);
  };

  return (
    <div className="basket-container">
      <h1>Корзина</h1>
      {cartItems.length === 0 ? (
        <div className="empty-message">
          <h2>Ваша корзина пуста</h2>
          <Link href="/product" className="continue-shopping">
            Продолжить покупки
          </Link>
        </div>
      ) : (
        <>
          <div className="cart-grid">
            {cartItems.map(item => (
              <div key={`${item.category}-${item.id}`} className="cart-item">
                <div className="cart-image-container">
                  <Image 
                    src={productImages[item.image]}
                    alt={item.name}
                    width={200}
                    height={200}
                    objectFit="cover"
                  />
                </div>
                <div className="cart-info">
                  <h3>{item.name}</h3>
                  <p className="item-price">${(item.salePrice * item.quantity).toFixed(2)}</p>
                  <div className="quantity-controls">
                    <button 
                      className="quantity-btn"
                      onClick={() => updateQuantity(item.id, item.category, -1)}
                    >
                      <FaMinus />
                    </button>
                    <span className="quantity">{item.quantity}</span>
                    <button 
                      className="quantity-btn"
                      onClick={() => updateQuantity(item.id, item.category, 1)}
                    >
                      <FaPlus />
                    </button>
                  </div>
                  <button 
                    className="remove-btn"
                    onClick={() => removeFromCart(item.id, item.category)}
                  >
                    Удалить
                  </button>
                </div>
              </div>
            ))}
          </div>
          <div className="cart-summary">
            <div className="summary-content">
              <h2>Итого:</h2>
              <div className="total-amount">
                ${calculateTotal().toFixed(2)}
              </div>
              <button className="checkout-btn">
                Оформить заказ
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
