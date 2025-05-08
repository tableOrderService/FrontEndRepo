import React from 'react';
import './CategoryTabs.css';

function CategoryTabs({ categories = [], selectedCategory, onTabClick }) {
  return (
    <div className="category-tabs">
      {categories.map((cat, idx) => (
        <button
          key={cat}
          className={`category-tab${selectedCategory === idx ? ' selected' : ''}`}
          onClick={() => onTabClick(idx)}
        >
          {cat}
        </button>
      ))}
    </div>
  );
}

export default CategoryTabs; 