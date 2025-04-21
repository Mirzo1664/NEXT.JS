'use client'
import { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { FaPlus, FaMinus, FaTimes } from 'react-icons/fa';
import product1 from "../../imgs/t1.jpg";
import product2 from "../../imgs/t3.jpg";
import product3 from "../../imgs/t4.jpg";
import product4 from "../../imgs/t6.jpg";
import ts from "../../imgs/ts.png"
import ts2 from "../../imgs/ts2.png"
import ts3 from "../../imgs/ts3.png"
import ts4 from "../../imgs/ts4.png"
import './style.css'

export default function Basket() {
  const [cartItems, setCartItems] = useState([]);
  
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

  const clearCart = () => {
    setCartItems([]);
    localStorage.removeItem('cart');
  };

  return (
    <div className="basket-page-container">
      <div className="basket-content-wrapper">
        <div className="basket-main-container">
          <h1 className="basket-main-title">Basket</h1>
          {cartItems.length === 0 ? (
            <div className="basket-empty-message">
              <h2>YOUR BASKET IS EMPTY</h2>
              <Link href="/product" className="basket-continue-shopping">
Continue shopping
              </Link>
            </div>
          ) : (
            <>
              <div className="basket-items-header">
                <div className="basket-header-product">Product</div>
                <div className="basket-header-price">Price</div>
                <div className="basket-header-quantity">quantity</div>
                <div className="basket-header-total">Total Items</div>
              </div>

              <div className="basket-items-list">
                {cartItems.map(item => (
                  <div key={`${item.category}-${item.id}`} className="basket-item-card">
                    <div className="basket-item-product">
                      <button 
                        className="basket-remove-btn"
                        onClick={() => removeFromCart(item.id, item.category)}
                      >
                        <FaTimes />
                      </button>
                      <div className="basket-product-image-wrapper">
                        <Image 
                          src={productImages[item.image]}
                          alt={item.name}
                          width={100}
                          height={100}
                          objectFit="contain"
                        />
                      </div>
                      <span className="basket-product-name">{item.name}</span>
                    </div>
                    
                    <div className="basket-item-price">
                      ${item.salePrice.toFixed(2)}
                    </div>
                    
                    <div className="basket-item-quantity">
                      <button 
                        className="basket-quantity-btn"
                        onClick={() => updateQuantity(item.id, item.category, -1)}
                      >
                        <FaMinus />
                      </button>
                      <span className="basket-quantity">{item.quantity}</span>
                      <button 
                        className="basket-quantity-btn"
                        onClick={() => updateQuantity(item.id, item.category, 1)}
                      >
                        <FaPlus />
                      </button>
                    </div>
                    
                    <div className="basket-item-total">
                      ${(item.salePrice * item.quantity).toFixed(2)}
                    </div>
                  </div>
                ))}
              </div>

              <div className="basket-summary">
                <div className="basket-total-row">
                  <span>Total:</span>
                  <span>${calculateTotal().toFixed(2)}</span>
                </div>
                <Link href={{
                  pathname: "/completion",
                  query: { cart: JSON.stringify(cartItems) }
                }}>
                  <button className="basket-checkout-btn">
                  Place an order
                  </button>
                </Link>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}