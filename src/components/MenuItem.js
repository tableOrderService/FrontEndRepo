// 각 메뉴 아이템 컴포넌트
import React, { useState, useEffect } from 'react';
import './MenuItem.css';

function MenuItem({ name, desc, img, price, onAdd, onMenuClick, id }) {
  const [imageExists, setImageExists] = useState(true);

  useEffect(() => {
    if (img) {
      const imgElement = new Image();
      imgElement.onload = () => setImageExists(true);
      imgElement.onerror = () => setImageExists(false);
      imgElement.src = img;
    } else {
      setImageExists(false);
    }
  }, [img]);

  const handleAdd = (e) => {
    e.stopPropagation();
    onAdd();
  };

  return (
    <div className="menu-item" onClick={() => onMenuClick(id)}>
      <div className="menu-info">
        <div className="menu-name">{name}</div>
        <div className="menu-desc">{desc}</div>
        <div className="menu-price">{price && price.toLocaleString()}원</div>
      </div>
      <div className="menu-img-box">
        {imageExists && <img src={img} alt={name} className="menu-img" />}
        <button className="cart-btn" onClick={handleAdd}>🛒</button>
      </div>
    </div>
  );
}

export default MenuItem; 