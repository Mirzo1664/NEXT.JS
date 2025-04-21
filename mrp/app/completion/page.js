'use client'
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Form, Button, Container, Row, Col, Card, Alert, Spinner } from 'react-bootstrap';
import Image from 'next/image';
import product1 from "../../imgs/t1.jpg";
import product2 from "../../imgs/t3.jpg";
import product3 from "../../imgs/t4.jpg";
import product4 from "../../imgs/t6.jpg";
import ts from "../../imgs/ts.png"
import ts2 from "../../imgs/ts2.png"
import ts3 from "../../imgs/ts3.png"
import ts4 from "../../imgs/ts4.png"

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

export default function Completion() {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [cartItems, setCartItems] = useState([]);
  const [formErrors, setFormErrors] = useState({});
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    postalCode: '',
    paymentMethod: 'card',
    cardNumber: '',
    cardExpiry: '',
    cardCvv: '',
    deliveryMethod: 'courier',
    comment: ''
  });

  useEffect(() => {
    const queryParams = new URLSearchParams(window.location.search);
    const cartParam = queryParams.get('cart');
    if (cartParam) {
      try {
        const items = JSON.parse(cartParam);
        setCartItems(items);
      } catch (e) {
        console.error('Error parsing cart items', e);
      }
    }
  }, []);

  const totalPrice = cartItems.reduce((sum, item) => sum + (item.salePrice * item.quantity), 0);
  const deliveryCost = formData.deliveryMethod === 'pickup' ? 0 : 9.99;
  const totalWithDelivery = totalPrice + deliveryCost;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (formErrors[name]) {
      setFormErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const validateForm = () => {
    const errors = {};
    const requiredFields = ['firstName', 'lastName', 'email', 'phone'];
    
    if (formData.deliveryMethod === 'courier') {
      requiredFields.push('address', 'city', 'postalCode');
    }
    
    if (formData.paymentMethod === 'card') {
      requiredFields.push('cardNumber', 'cardExpiry', 'cardCvv');
    }

    requiredFields.forEach(field => {
      if (!formData[field]) {
        errors[field] = 'This field is required';
      }
    });

    if (formData.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      errors.email = 'Please enter a valid email address';
    }

    if (formData.phone && !/^[\d\s()+ -]{10,20}$/.test(formData.phone)) {
      errors.phone = 'Please enter a valid phone number';
    }

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);
    
    setTimeout(() => {
      setIsSubmitting(false);
      setShowSuccess(true);
      localStorage.removeItem('cart');
    }, 2000);
  };

  if (showSuccess) {
    return (
      <Container className="mb-5 mt-5">
        <Row className="justify-content-center mb-5 mt-5">
          <Col md={8}>
            <Alert variant="success" className="text-center">
              <Alert.Heading>Your order has been placed successfully!</Alert.Heading>
              <p>Your order number: #{Math.floor(Math.random() * 10000)}</p>
              <p>We've sent a confirmation email to {formData.email}</p>
              <Button variant="primary" onClick={() => router.push('/')}>
                Return to homepage
              </Button>
            </Alert>
          </Col>
        </Row>
      </Container>
    );
  }

  return (
    <Container className="my-5">
      <h1 className="text-center mb-4">Checkout</h1>
      
      <Row>
        <Col lg={8}>
          <Card className="mb-4">
            <Card.Body>
              <Card.Title>Customer Information</Card.Title>
              <Form onSubmit={handleSubmit}>
                <Row>
                  <Col md={6}>
                    <Form.Group className="mb-3">
                      <Form.Label>First Name*</Form.Label>
                      <Form.Control
                        type="text"
                        name="firstName"
                        value={formData.firstName}
                        onChange={handleChange}
                        isInvalid={!!formErrors.firstName}
                      />
                      <Form.Control.Feedback type="invalid">
                        {formErrors.firstName}
                      </Form.Control.Feedback>
                    </Form.Group>
                  </Col>
                  <Col md={6}>
                    <Form.Group className="mb-3">
                      <Form.Label>Last Name*</Form.Label>
                      <Form.Control
                        type="text"
                        name="lastName"
                        value={formData.lastName}
                        onChange={handleChange}
                        isInvalid={!!formErrors.lastName}
                      />
                      <Form.Control.Feedback type="invalid">
                        {formErrors.lastName}
                      </Form.Control.Feedback>
                    </Form.Group>
                  </Col>
                </Row>

                <Row>
                  <Col md={6}>
                    <Form.Group className="mb-3">
                      <Form.Label>Email*</Form.Label>
                      <Form.Control
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        isInvalid={!!formErrors.email}
                      />
                      <Form.Control.Feedback type="invalid">
                        {formErrors.email}
                      </Form.Control.Feedback>
                    </Form.Group>
                  </Col>
                  <Col md={6}>
                    <Form.Group className="mb-3">
                      <Form.Label>Phone*</Form.Label>
                      <Form.Control
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        isInvalid={!!formErrors.phone}
                      />
                      <Form.Control.Feedback type="invalid">
                        {formErrors.phone}
                      </Form.Control.Feedback>
                    </Form.Group>
                  </Col>
                </Row>

                <Form.Group className="mb-3">
                  <Form.Label>Delivery Method*</Form.Label>
                  <div>
                    <Form.Check
                      type="radio"
                      id="courier"
                      label="Courier delivery ($5)"
                      name="deliveryMethod"
                      value="courier"
                      checked={formData.deliveryMethod === 'courier'}
                      onChange={handleChange}
                    />
                    <Form.Check
                      type="radio"
                      id="pickup"
                      label="Pickup (free)"
                      name="deliveryMethod"
                      value="pickup"
                      checked={formData.deliveryMethod === 'pickup'}
                      onChange={handleChange}
                    />
                  </div>
                </Form.Group>

                {formData.deliveryMethod === 'courier' && (
                  <>
                    <Form.Group className="mb-3">
                      <Form.Label>Delivery Address*</Form.Label>
                      <Form.Control
                        type="text"
                        name="address"
                        value={formData.address}
                        onChange={handleChange}
                        isInvalid={!!formErrors.address}
                      />
                      <Form.Control.Feedback type="invalid">
                        {formErrors.address}
                      </Form.Control.Feedback>
                    </Form.Group>
                    <Row>
                      <Col md={6}>
                        <Form.Group className="mb-3">
                          <Form.Label>City*</Form.Label>
                          <Form.Control
                            type="text"
                            name="city"
                            value={formData.city}
                            onChange={handleChange}
                            isInvalid={!!formErrors.city}
                          />
                          <Form.Control.Feedback type="invalid">
                            {formErrors.city}
                          </Form.Control.Feedback>
                        </Form.Group>
                      </Col>
                      <Col md={6}>
                        <Form.Group className="mb-3">
                          <Form.Label>Postal Code*</Form.Label>
                          <Form.Control
                            type="text"
                            name="postalCode"
                            value={formData.postalCode}
                            onChange={handleChange}
                            isInvalid={!!formErrors.postalCode}
                          />
                          <Form.Control.Feedback type="invalid">
                            {formErrors.postalCode}
                          </Form.Control.Feedback>
                        </Form.Group>
                      </Col>
                    </Row>
                  </>
                )}

                <Form.Group className="mb-3">
                  <Form.Label>Payment Method*</Form.Label>
                  <div>
                    <Form.Check
                      type="radio"
                      id="card"
                      label="Credit/Debit Card"
                      name="paymentMethod"
                      value="card"
                      checked={formData.paymentMethod === 'card'}
                      onChange={handleChange}
                    />
                    <Form.Check
                      type="radio"
                      id="cash"
                      label="Cash on Delivery"
                      name="paymentMethod"
                      value="cash"
                      checked={formData.paymentMethod === 'cash'}
                      onChange={handleChange}
                    />
                  </div>
                </Form.Group>

                {formData.paymentMethod === 'card' && (
                  <>
                    <Form.Group className="mb-3">
                      <Form.Label>Card Number*</Form.Label>
                      <Form.Control
                        type="text"
                        name="cardNumber"
                        value={formData.cardNumber}
                        onChange={handleChange}
                        placeholder="1234 5678 9012 3456"
                        isInvalid={!!formErrors.cardNumber}
                      />
                      <Form.Control.Feedback type="invalid">
                        {formErrors.cardNumber}
                      </Form.Control.Feedback>
                    </Form.Group>
                    <Row>
                      <Col md={6}>
                        <Form.Group className="mb-3">
                          <Form.Label>Expiry Date*</Form.Label>
                          <Form.Control
                            type="text"
                            name="cardExpiry"
                            value={formData.cardExpiry}
                            onChange={handleChange}
                            placeholder="MM/YY"
                            isInvalid={!!formErrors.cardExpiry}
                          />
                          <Form.Control.Feedback type="invalid">
                            {formErrors.cardExpiry}
                          </Form.Control.Feedback>
                        </Form.Group>
                      </Col>
                      <Col md={6}>
                        <Form.Group className="mb-3">
                          <Form.Label>CVV*</Form.Label>
                          <Form.Control
                            type="text"
                            name="cardCvv"
                            value={formData.cardCvv}
                            onChange={handleChange}
                            placeholder="123"
                            isInvalid={!!formErrors.cardCvv}
                          />
                          <Form.Control.Feedback type="invalid">
                            {formErrors.cardCvv}
                          </Form.Control.Feedback>
                        </Form.Group>
                      </Col>
                    </Row>
                  </>
                )}

                <Form.Group className="mb-3">
                  <Form.Label>Order Notes</Form.Label>
                  <Form.Control
                    as="textarea"
                    rows={3}
                    name="comment"
                    value={formData.comment}
                    onChange={handleChange}
                  />
                </Form.Group>
              </Form>
            </Card.Body>
          </Card>
        </Col>

        <Col lg={4}>
          <Card>
            <Card.Body>
              <Card.Title>Your Order</Card.Title>
              
              {cartItems.map((item, index) => (
                <div key={`${item.id}-${index}`} className="d-flex justify-content-between mb-2 align-items-center">
                  <div className="d-flex align-items-center">
                    <div className="me-2" style={{ width: '50px', height: '50px', position: 'relative' }}>
                      <Image 
                        src={productImages[item.image]}
                        alt={item.name}
                        fill
                        style={{ objectFit: 'contain' }}
                      />
                    </div>
                    <div>
                      <div>{item.name}</div>
                      <small className="text-muted">× {item.quantity}</small>
                    </div>
                  </div>
                  <div>${(item.salePrice * item.quantity).toFixed(2)}</div>
                </div>
              ))}

              <hr />

              <div className="d-flex justify-content-between mb-2">
                <div>Shipping:</div>
                <div>{deliveryCost.toFixed(2)} $</div>
              </div>

              <div className="d-flex justify-content-between fw-bold fs-5">
                <div>Total:</div>
                <div>{totalWithDelivery.toFixed(2)} $</div>
              </div>

              <Button
                variant="primary"
                size="lg"
                className="w-100 mt-3"
                onClick={handleSubmit}
                disabled={isSubmitting || cartItems.length === 0}
              >
                {isSubmitting ? (
                  <>
                    <Spinner
                      as="span"
                      animation="border"
                      size="sm"
                      role="status"
                      aria-hidden="true"
                    />
                    <span className="ms-2">Processing your order...</span>
                  </>
                ) : 'Place Order'}
              </Button>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}