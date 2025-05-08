import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AppContext } from '../App';
import './Cart.css';

function Cart() {
  const navigate = useNavigate();
  const { cart, setCart } = useContext(AppContext);

  const handleQuantityChange = (id, change) => {
    setCart(prevCart => {
      return prevCart.map(item => {
        if (item.id === id) {
          const newQuantity = item.quantity + change;
          if (newQuantity <= 0) {
            return null;
          }
          return { ...item, quantity: newQuantity };
        }
        return item;
      }).filter(Boolean);
    });
  };

  const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);

  return (
    <div className="cart-page">
      <div className="cart-header">
        <button className="back-button" onClick={() => navigate(-1)}>←</button>
        <h1>장바구니</h1>
      </div>
      <div className="cart-content">
        {cart.length === 0 ? (
          <div className="empty-cart">
            <p>장바구니가 비어있습니다</p>
          </div>
        ) : (
          cart.map(item => (
            <div key={item.id} className="cart-item">
              {item.img && (
                <div className="item-image">
                  <img src={item.img} alt={item.name} />
                </div>
              )}
              <div className="item-info">
                <h3>{item.name}</h3>
                <p className="item-price">{item.price.toLocaleString()}원</p>
              </div>
              <div className="item-quantity">
                <button 
                  className="quantity-btn"
                  onClick={() => handleQuantityChange(item.id, -1)}
                >
                  -
                </button>
                <span>{item.quantity}</span>
                <button 
                  className="quantity-btn"
                  onClick={() => handleQuantityChange(item.id, 1)}
                >
                  +
                </button>
              </div>
            </div>
          ))
        )}
      </div>
      <div className="cart-summary">
        <div className="total">
          <span>총 주문금액</span>
          <span>{total.toLocaleString()}원</span>
        </div>
        <button className="order-button">주문하기</button>
      </div>
    </div>
  );
}

export default Cart; 