import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { CartItem } from '../types/CartItem';

function CartPage() {
  const navigate = useNavigate();
  const { cart, removeFromCart } = useCart();
  const totalAmount = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  return (
    <>
      <div className="container mt-4">
        <h1>Your Cart</h1>
        <div>
          {cart.length === 0 ? (
            <p>Your Cart is Empty.</p>
          ) : (
            <ul className="list-unstyled">
              {cart.map((item: CartItem) => (
                <li className="card p-3 mb-3 shadow-sm" key={item.bookId}>
                  <strong className="fs-4">{item.title}</strong>
                  <br />
                  <strong>Quantity: </strong> {item.quantity}
                  <br />
                  <strong>Price: </strong> {item.price}
                  <br />
                  <strong>Item Total:</strong> $
                  {(item.price * item.quantity).toFixed(2)}
                  <br />
                  <br />
                  <button
                    className="btn btn-danger"
                    onClick={() => removeFromCart(item.bookId)}
                  >
                    Remove
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>
        <h3>Total: ${totalAmount.toFixed(2)}</h3>
        <br />
        <button className="btn btn-primary me-2">Checkout</button>
        <button
          className="btn btn-secondary"
          onClick={() => navigate('/books')}
        >
          Continue Browsing
        </button>
      </div>
    </>
  );
}

export default CartPage;
