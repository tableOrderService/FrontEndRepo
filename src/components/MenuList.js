// 카테고리 별 메뉴 리스트 컴포넌트
import React from 'react';
import MenuItem from './MenuItem';
import './MenuList.css';

function MenuList({ menus, onAdd, onMenuClick }) {
  return (
    <div className="menu-list">
      {menus.map((menu) => (
        <MenuItem
          key={menu.id}
          id={menu.id}
          name={menu.name}
          desc={menu.desc}
          img={menu.img}
          price={menu.price}
          onAdd={() => onAdd(menu)}
          onMenuClick={onMenuClick}
        />
      ))}
    </div>
  );
}

export default MenuList; 