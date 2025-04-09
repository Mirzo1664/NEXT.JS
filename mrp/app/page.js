import Link from 'next/link'
import styles from "./home.css"
import Image from 'next/image'
import ts from "../imgs/ts.png"
import ts2 from "../imgs/ts2.png"
import ts3 from "../imgs/ts3.png"
import ts4 from "../imgs/ts4.png"
import product1 from "../imgs/t1.jpg"
import product4  from "../imgs/t6.jpg"
import product2  from "../imgs/t3.jpg"
import product3  from "../imgs/t4.jpg"
import productsData from './products.json'
import productsData1 from './product-man.json'

export default function Home() {
  const productImages = {
    "/t1.jpg": product1,
    "/t2.jpg": product2,
    "/t3.jpg": product3,
    "/t4.jpg": product4 
  };

  return (
    <div className="home-container">
      <div className="Warp">
        <div className="text-content">
          <h1 className="transparentText">Welcome To MRP Shop</h1>
          <p className="subtext">
            Our store presents modern clothes that will always be in fashion and will always look beautiful. We guarantee quality and style in every piece.
          </p>
          <div className="about-container">
            <h3>About us</h3>
            <Link href="/about" legacyBehavior passHref>
              <a className="circle-button" style={{ textDecoration: 'none' }}>
                <span className="arrow-line">→</span>
              </a>
            </Link>
          </div>
        </div>
        
        <div className='collections-side'>
          <div className='Collection'>
            <h4>Featured Collections</h4>
            <div className="img-container">
              <Image 
                src={ts} 
                alt="Featured Collections" 
                layout="fill"
                objectFit="cover"
                quality={100}
              />
            </div>
            <h3>New Arrivals</h3>
          </div>
          <div className='Collection'>
            <h4>Featured Collections</h4>
            <div className="img-container">
              <Image 
                src={ts2} 
                alt="Featured Collections" 
                layout="fill"
                objectFit="cover"
                quality={100}
              />
            </div>
            <h3>Summer Collection</h3>
          </div>
          <div className='Collection'>
            <h4>Featured Collections</h4>
            <div className="img-container">
              <Image 
                src={ts3} 
                alt="Featured Collections" 
                layout="fill"
                objectFit="cover"
                quality={100}
              />
            </div>
            <h3>Winter Essentials</h3>
          </div>
          <div className='Collection'>
            <h4>Featured Collections</h4>
            <div className="img-container">
              <Image 
                src={ts4} 
                alt="Featured Collections" 
                layout="fill"
                objectFit="cover"
                quality={100}
              />
            </div>
            <h3>Limited Edition</h3>
          </div>
        </div>
      </div>
      
      <div className="featured-banner">
        <div className="banner-content">
          <h2>Seasonal Sale</h2>
          <p>
          Be in fashion and be in fashion</p>
          <Link href="/product" legacyBehavior passHref>
            <a className="shop-now-btn">Shop Now</a>
          </Link>
        </div>
      </div>
      <div className="products-section">
        <div className="products-header">
          <h2>WOMEN'S FASHION</h2>
          <p>Shop our new arrivals from established brands</p>
        </div>
        
        <div className="products-grid">
          {productsData.products.map((product) => (
            <div className="product-card" key={product.id}>
              <div className="product-image">
                <Image 
                  src={productImages[product.image]}
                  alt={product.name}
                  layout="fill"
                  objectFit="cover"
                  quality={100}
                />
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
          ))}
        </div>
      </div>
      <div className="products-section">
        <div className="products-header">
          <h2>MEN'S FASHION</h2>
          <p>Shop our new arrivals from established brands</p>
        </div>
        
        <div className="products-grid">
          {productsData1.products.map((product) => (
            <div className="product-card" key={product.id}>
              <div className="product-image">
                <Image 
                  src={productImages[product.image]}
                  alt={product.name}
                  layout="fill"
                  objectFit="cover"
                  quality={100}
                />
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
          ))}
        </div>
      </div>
    </div>
  );
}
