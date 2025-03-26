import './App.css';
import { CartProvider } from './context/CartContext';
import BooksPage from './pages/BooksPage';
import CartPage from './pages/CartPage';
import BuyBookPage from './pages/BuyBookPage';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

function App() {
  return (
    <>
      <CartProvider>
        <Router>
          <Routes>
            <Route path="/" element={<BooksPage />} />
            <Route path="/books" element={<BooksPage />} />
            <Route path="/cart" element={<CartPage />} />
            <Route
              path="/buy/:bookId/:title/:price"
              element={<BuyBookPage />}
            />
          </Routes>
        </Router>
      </CartProvider>
    </>
  );
}

export default App;
