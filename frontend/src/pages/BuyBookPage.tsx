import { useNavigate, useParams } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { CartItem } from '../types/CartItem';
import Banner from '../components/Banner';
import { useState } from 'react';

function BuyBookPage() {
  const navigate = useNavigate();
  const { title, bookId, price } = useParams();
  const { addToCart } = useCart();
  const [quantity, setQuantity] = useState<number>(1);

  const handleAddToCart = () => {
    const newItem: CartItem = {
      bookId: Number(bookId),
      title: title || 'No Title Found',
      price: Number(price),
      quantity,
    };

    addToCart(newItem);
    navigate('/cart');
  };

  return (
    <>
      <Banner />
      {/* This is where I did the new bootstrap functionalities not learned in class.
      I used card shadow, text-success, form-label, d-flex justify-content-center,
      form-control w-25, and d-flex justify-content-between. */}

      <div className="container mt-4">
        <div className="card shadow-lg p-4">
          <h2 className="text-center mb-4">Buy "{title}"</h2>
          <h4 className="text-success">Price: ${price}</h4>
          <div className="mb-3">
            <label className="form-label">Quantity: </label>
            <div className="d-flex justify-content-center">
              <input
                className="form-control w-25"
                type="number"
                min="1"
                value={quantity}
                onChange={(x) => setQuantity(Number(x.target.value))}
              />
            </div>
          </div>
          <div className="d-flex justify-content-between">
            <button
              className="btn btn-success btn-lg"
              onClick={handleAddToCart}
            >
              Add to Cart
            </button>
            <button
              className="btn btn-secondary btn-lg"
              onClick={() => navigate(-1)}
            >
              Back
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default BuyBookPage;
