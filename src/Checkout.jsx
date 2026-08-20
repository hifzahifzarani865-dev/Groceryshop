import { useState } from "react";

function Checkout({ cart, total, onBack, onOrderPlaced }) {
  const [orderPlaced, setOrderPlaced] = useState(false);

  const handleOrder = (e) => {
    e.preventDefault();
    setOrderPlaced(true);
  };

  if (orderPlaced) {
    return (
      <div className="checkout-page">
        <div className="success-box">
          <div className="success-icon">✓</div>

          <h1>Order Placed Successfully!</h1>

          <p>
            Thank you for shopping with FreshMart.
          </p>

          <p>
            Your order has been received and will be
            delivered soon.
          </p>

          <button
            className="checkout-btn"
            onClick={onOrderPlaced}
          >
            Continue Shopping
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="checkout-page">

      <div className="checkout-header">
        <button onClick={onBack}>
          ← Back to Shopping
        </button>

        <h1>Checkout</h1>
      </div>

      <div className="checkout-container">

        {/* Delivery Information */}
        <form
          className="checkout-form"
          onSubmit={handleOrder}
        >
          <h2>Delivery Information</h2>

          <input
            type="text"
            placeholder="Full Name"
            required
          />

          <input
            type="tel"
            placeholder="Phone Number"
            required
          />

          <input
            type="text"
            placeholder="Complete Address"
            required
          />

          <input
            type="text"
            placeholder="City"
            required
          />

          <h2>Payment Method</h2>

          <label className="payment-option">
            <input
              type="radio"
              name="payment"
              defaultChecked
            />
            Cash on Delivery
          </label>

          <label className="payment-option">
            <input
              type="radio"
              name="payment"
            />
            Bank Transfer
          </label>

          <button
            type="submit"
            className="place-order-btn"
          >
            Place Order
          </button>
        </form>

        {/* Order Summary */}
        <div className="order-summary">
          <h2>Order Summary</h2>

          {cart.map((item) => (
            <div
              className="summary-item"
              key={item.id}
            >
              <span>
                {item.emoji} {item.name} × {item.quantity}
              </span>

              <strong>
                Rs. {item.price * item.quantity}
              </strong>
            </div>
          ))}

          <hr />

          <div className="summary-total">
            <span>Total</span>

            <strong>
              Rs. {total}
            </strong>
          </div>
        </div>

      </div>
    </div>
  );
}

export default Checkout;