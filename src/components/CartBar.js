import React, { useContext } from 'react';
import { AppContext } from '../App';
import './CartBar.css';

function CartBar({ onCartClick }) {
  const { cart } = useContext(AppContext);
  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
  const totalPrice = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);

  return (
    <div className="cart-bar" onClick={onCartClick}>
      <span className="cart-text">
        총 {totalPrice.toLocaleString()}원 카트보기
      </span>
      <div className="cart-count">{totalItems}</div>
    </div>
  );
}

export default CartBar; 