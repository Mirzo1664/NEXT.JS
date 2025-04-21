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
import hamLogo from '../imgs/i18.png';
import levisLogo from '../imgs/i19.png';
import uspoloLogo from '../imgs/i20.png';
import nikeLogo from '../imgs/i7.png';
import pumaLogo from '../imgs/i21.png';
import F from '../imgs/Q.png';



export default function Home() {
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
              <div className="home-product-image">
                <Image 
                  src={productImages[product.image]}
                  alt={product.name}
                  layout="fill"
                  objectFit="cover"
                  quality={100}
                />
              </div>
              <Link href="/product" legacyBehavior passHref>
          <a className="go-to-shop-btn">Go To Shop</a>
        </Link>
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
          {productsData1.products.map((product, index) => {
            const imageMap = [ts, ts2, ts3, ts4];
            const productImage = imageMap[index % imageMap.length];
            
            return (
              <div className="product-card" key={product.id}>
                <div className="home-product-image">
                  <Image 
                    src={productImage}
                    alt={product.name}
                    layout="fill"
                    objectFit="cover"
                    quality={100}
                  />
                </div>
                <Link href="/product" legacyBehavior passHref>
          <a className="go-to-shop-btn">Go To Shop</a>
        </Link>
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
      </div>
      <div className="top-brands-section">
      <div className="brands-header">
        <h2 className="brands-title">Top Brands Deal</h2>
        <p className="brands-subtitle">Up To 60% off on brands</p>
      </div>
      
      
      <div className="brands-grid">
        <div className="brand-item">
          <div className="brand-logo">
            <Image 
              src={hamLogo} 
              alt="HAM" 
              width={120} 
              height={60}
              className="brand-image"
            />
          </div>
        </div>
        
        <div className="brand-item">
          <div className="brand-logo">
            <Image 
              src={levisLogo} 
              alt="Levis" 
              width={120} 
              height={60}
              className="brand-image"
            />
          </div>
        </div>
        
        <div className="brand-item">
          <div className="brand-logo">
            <Image 
              src={uspoloLogo} 
              alt="U.S. POLO ASSN." 
              width={120} 
              height={60}
              className="brand-image"
            />
          </div>
        </div>

        <div className="brand-item">
          <div className="brand-logo">
            <Image 
              src={nikeLogo} 
              alt="Nike" 
              width={120} 
              height={60}
              className="brand-image"
            />
          </div>
        </div>

        <div className="brand-item">
          <div className="brand-logo">
            <Image 
              src={pumaLogo} 
              alt="Puma" 
              width={120} 
              height={60}
              className="brand-image"
            />
          </div>
        </div>
      </div>
    </div>
    <div className="bannerContainer">
      <div className="textContent">
        <h2 className="mainHeading">WE MADE YOUR EVERYDAY</h2>
        <h1 className="title">FASHION BETTER!</h1>
        <p className="subtext">In our journey to improve everyday fashion.</p>
        <p className="brandText"> presents EVERYDAY wear range</p>
        <p className="description">Comfortable & Affordable fashion 24/7</p>
        <Link href={'/product'}><button className='b'>Shop Now</button></Link>
      </div>
      
      <div className="hh-imageContainer">
        <Image 
          src={F} 
          alt="Everyday Fashion" 
          layout="fill"
          objectFit="cover"
          quality={100}
          className="hh-image"
        />
      </div>
    </div>
    </div>
  );
}
