import React, { useState, useRef, useEffect, createContext, useContext } from 'react';
import { BrowserRouter as Router, Routes, Route, useNavigate } from 'react-router-dom';
import Header from './components/Header';
import CategoryTabs from './components/CategoryTabs';
import MenuList from './components/MenuList';
import CartBar from './components/CartBar';
import MenuDetail from './pages/MenuDetail';
import Cart from './pages/Cart';
import './App.css';

// 전역 상태를 위한 Context 생성
export const AppContext = createContext();

const categories = ['CATEGORY1', 'LONGCATEGORY2', 'CATEGORY3'];
const menuData = [
  [
    { id: 1, name: 'menu 1-1', desc: '설명1-1 ex) 엄청 맛있는 음식입니다', img: '/images/image_1_160x120.png', price: 12500 },
    { id: 2, name: 'menu 1-2', desc: '설명1-2 ex) 엄청 엄청 엄청 엄청 엄청 맛있는 두 번째 음식입니다. 설명도 엄청 깁니다. 설명설명설명설명설명설명설명설명설명설명설명설명설명설명설명설명설명설명설명설명설명설명설명설명설명설명설명설명설명설명설명설명설명설명설명설명설명설명설명설명설명설명설명설명설명설명설명설명설명설명설명설명설명설명설명설명설명설명설명설명설명설명설명설명설명설명', img: 'https://img.daily.co.kr/@files/www.daily.co.kr/content/food/2020/20200730/40d0fb3794229958bdd1e36520a4440f.jpg', price: 15000 },
    { id: 3, name: 'menu 1-3', desc: '설명2-1 ex) 엄청 맛있는 음식입니다', img: '', price: 13500 },
    { id: 4, name: 'menu 1-4', desc: '설명2-1 ex) 엄청 맛있는 음식입니다', img: '', price: 13500 },
    { id: 5, name: 'menu 1-5', desc: '설명2-1 ex) 엄청 맛있는 음식입니다', img: '', price: 13500 },
    { id: 6, name: 'menu 1-6', desc: '설명2-1 ex) 엄청 맛있는 음식입니다', img: '', price: 13500 },
    { id: 7, name: 'menu 1-7', desc: '설명2-1 ex) 엄청 맛있는 음식입니다', img: '', price: 13500 },
    { id: 8, name: 'menu 1-8', desc: '설명2-1 ex) 엄청 맛있는 음식입니다', img: '', price: 13500 }
  ],
  [
    { id: 9, name: 'menu 2-1', desc: '설명2-1 ex) 엄청 맛있는 음식입니다', img: '', price: 13500 },
    { id: 10, name: 'menu 2-2', desc: '설명2-2 ex) 엄청 맛있는 음식입니다', img: 'https://via.placeholder.com/80', price: 14500 },
    { id: 11, name: 'menu 2-3', desc: '설명2-2 ex) 엄청 맛있는 음식입니다', img: 'https://via.placeholder.com/80', price: 14500 },
    { id: 12, name: 'menu 2-4', desc: '설명2-2 ex) 엄청 맛있는 음식입니다', img: 'https://via.placeholder.com/80', price: 14500 },
    { id: 13, name: 'menu 2-5', desc: '설명2-2 ex) 엄청 맛있는 음식입니다', img: 'https://via.placeholder.com/80', price: 14500 },
    { id: 14, name: 'menu 2-6', desc: '설명2-2 ex) 엄청 맛있는 음식입니다', img: 'https://via.placeholder.com/80', price: 14500 },
    { id: 15, name: 'menu 2-7', desc: '설명2-2 ex) 엄청 맛있는 음식입니다', img: 'https://via.placeholder.com/80', price: 14500 },
    { id: 16, name: 'menu 2-8', desc: '설명2-2 ex) 엄청 맛있는 음식입니다', img: 'https://via.placeholder.com/80', price: 14500 },
  ],
  [
    { id: 17, name: 'menu 3-1', desc: '설명3-1 ex) 엄청 맛있는 음식입니다', img: 'https://via.placeholder.com/80', price: 16500 },
  ],
];

// 모든 메뉴 데이터를 하나의 배열로 변환
const allMenuData = menuData.flat();

function Home() {
  const [selectedCategory, setSelectedCategory] = useState(0);
  const { cart, addToCart } = useContext(AppContext);
  const navigate = useNavigate();

  const handleTabClick = (index) => {
    setSelectedCategory(index);
    const element = document.getElementById(`category-${index}`);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  useEffect(() => {
    const handleScroll = () => {
      const offsets = categories.map((cat, idx) => {
        const el = document.getElementById(`category-${idx}`);
        if (!el) return Infinity;
        return Math.abs(el.getBoundingClientRect().top - 80);
      });
      const minIdx = offsets.indexOf(Math.min(...offsets));
      setSelectedCategory(minIdx);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleAdd = (menu) => {
    addToCart(menu);
  };

  const handleMenuClick = (menuId) => {
    navigate(`/menu/${menuId}`);
  };

  const handleCartClick = () => {
    navigate('/cart');
  };

  return (
    <div className="app">
      <Header />
      <CategoryTabs
        categories={categories}
        selectedCategory={selectedCategory}
        onTabClick={handleTabClick}
      />
      <div style={{ padding: '16px', paddingBottom: '80px' }}>
        {categories.map((cat, idx) => (
          <div key={cat} id={`category-${idx}`} style={{ marginBottom: '32px' }}>
            <h2>{cat}</h2>
            <MenuList 
              menus={menuData[idx]}
              onAdd={handleAdd}
              onMenuClick={handleMenuClick}
            />
          </div>
        ))}
      </div>
      <CartBar 
        onCartClick={handleCartClick}
      />
    </div>
  );
}

function App() {
  const [cart, setCart] = useState([]);

  const addToCart = (menu) => {
    console.log('addToCart 호출됨', menu);
    setCart(prevCart => {
      const existingItem = prevCart.find(item => item.id === menu.id);
      if (existingItem) {
        return prevCart.map(item =>
          item.id === menu.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prevCart, { ...menu, quantity: 1 }];
    });
  };

  return (
    <AppContext.Provider value={{ cart, setCart, addToCart, allMenuData }}>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/menu/:id" element={<MenuDetail />} />
          <Route path="/cart" element={<Cart />} />
        </Routes>
      </Router>
    </AppContext.Provider>
  );
}

// CartBar에서 cart 상태 로그를 찍기 위해 HOC로 감쌈
const CartBarWithLog = (props) => {
  console.log('CartBar cart:', props.cart);
  return <CartBar {...props} />;
};

export default App;
