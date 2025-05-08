import React from 'react';
import './CategoryTabs.css';

function CategoryTabs({ categories = [], selected, onSelect }) {
  return (
    <div className="category-tabs">
      {categories.map((cat, idx) => (
        <button
          key={cat}
          className={`category-tab${selected === idx ? ' selected' : ''}`}
          onClick={() => onSelect(idx)}
        >
          {cat}
        </button>
      ))}
    </div>
  );
}

export default CategoryTabs; 