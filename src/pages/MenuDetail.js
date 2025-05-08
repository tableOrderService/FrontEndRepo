import React, { useContext, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { AppContext } from '../App';
import './MenuDetail.css';

function MenuDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { allMenuData, setCart } = useContext(AppContext);
  const [quantity, setQuantity] = useState(1);
  const [imageExists, setImageExists] = useState(true);

  const menu = allMenuData.find(item => item.id === parseInt(id));

  React.useEffect(() => {
    if (menu && menu.img) {
      const img = new window.Image();
      img.onload = () => setImageExists(true);
      img.onerror = () => setImageExists(false);
      img.src = menu.img;
    } else {
      setImageExists(false);
    }
  }, [menu]);

  const handleQuantityChange = (change) => {
    const newQuantity = quantity + change;
    if (newQuantity >= 1) {
      setQuantity(newQuantity);
    }
  };

  const handleAddToCart = () => {
    setCart(prevCart => {
      const existingItem = prevCart.find(item => item.id === menu.id);
      if (existingItem) {
        return prevCart.map(item =>
          item.id === menu.id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }
      return [...prevCart, { ...menu, quantity }];
    });
    navigate(-1);
  };

  if (!menu) {
    return (
      <div className="menu-detail">
        <div className="detail-header">
          <button className="back-button" onClick={() => navigate(-1)}>←</button>
          <h1>메뉴를 찾을 수 없습니다</h1>
        </div>
      </div>
    );
  }

  return (
    <div className="menu-detail">
      <div className="detail-header">
        <button className="back-button" onClick={() => navigate(-1)}>←</button>
        <h1>{menu.name}</h1>
      </div>
      <div className="detail-content">
        {menu.img && imageExists && (
          <img src={menu.img} alt={menu.name} className="menu-image" />
        )}
        <div className="menu-info">
          <p className="price">{menu.price.toLocaleString()}원</p>
          <p className="description">{menu.desc}</p>
          
          <div className="quantity-selector">
            <button 
              className="quantity-btn"
              onClick={() => handleQuantityChange(-1)}
            >
              -
            </button>
            <span className="quantity">{quantity}</span>
            <button 
              className="quantity-btn"
              onClick={() => handleQuantityChange(1)}
            >
              +
            </button>
          </div>
        </div>
      </div>
      <div className="detail-summary">
        <div className="total">
          <span>총 주문금액</span>
          <span>{(menu.price * quantity).toLocaleString()}원</span>
        </div>
        <button className="add-to-cart-button" onClick={handleAddToCart}>
          장바구니 담기
        </button>
      </div>
    </div>
  );
}

export default MenuDetail; 