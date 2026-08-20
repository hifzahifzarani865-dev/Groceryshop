import { useState } from "react";
import "./App.css";
import { products } from "./data";
import Login from "./Login";
import Checkout from "./Checkout";

function App() {
  const [showLogin, setShowLogin] = useState(false);
  const [showCheckout, setShowCheckout] = useState(false);

  const [page, setPage] = useState("home");
  const [selectedCategory, setSelectedCategory] = useState(null);

  const [search, setSearch] = useState("");
  const [cart, setCart] = useState([]);
  const [favorites, setFavorites] = useState([]);

  // Login system
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [pendingProduct, setPendingProduct] = useState(null);

  const allProducts = products.filter((product) =>
    product.name.toLowerCase().includes(search.toLowerCase())
  );

  const categoryProducts = selectedCategory
    ? products.filter(
      (product) =>
        product.category === selectedCategory &&
        product.name
          .toLowerCase()
          .includes(search.toLowerCase())
    )
    : [];

  // ================= ADD PRODUCT TO CART =================

  const addProductToCart = (product) => {
    const existingProduct = cart.find(
      (item) => item.id === product.id
    );

    if (existingProduct) {
      setCart(
        cart.map((item) =>
          item.id === product.id
            ? {
              ...item,
              quantity: item.quantity + 1,
            }
            : item
        )
      );
    } else {
      setCart([
        ...cart,
        {
          ...product,
          quantity: 1,
        },
      ]);
    }

    // Open cart page after adding
    setPage("cart");
    setSelectedCategory(null);

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  // ================= LOGIN CHECK =================

  const addToCart = (product) => {
    if (!isLoggedIn) {
      setPendingProduct(product);
      setShowLogin(true);
      return;
    }

    addProductToCart(product);
  };

  // ================= LOGIN SUCCESS =================

  const handleLoginSuccess = () => {
    setIsLoggedIn(true);
    setShowLogin(false);

    if (pendingProduct) {
      addProductToCart(pendingProduct);
      setPendingProduct(null);
    }
  };

  // ================= FAVORITES =================

  const toggleFavorite = (product) => {
    const alreadyFavorite = favorites.some(
      (item) => item.id === product.id
    );

    if (alreadyFavorite) {
      setFavorites(
        favorites.filter(
          (item) => item.id !== product.id
        )
      );
    } else {
      setFavorites([...favorites, product]);
    }
  };

  // ================= QUANTITY =================

  const increaseQuantity = (id) => {
    setCart(
      cart.map((item) =>
        item.id === id
          ? {
            ...item,
            quantity: item.quantity + 1,
          }
          : item
      )
    );
  };

  const decreaseQuantity = (id) => {
    setCart(
      cart
        .map((item) =>
          item.id === id
            ? {
              ...item,
              quantity: item.quantity - 1,
            }
            : item
        )
        .filter((item) => item.quantity > 0)
    );
  };

  // ================= REMOVE =================

  const removeFromCart = (id) => {
    setCart(
      cart.filter((item) => item.id !== id)
    );
  };

  // ================= TOTAL =================

  const cartTotal = cart.reduce(
    (total, item) =>
      total + item.price * item.quantity,
    0
  );

  // ================= CATEGORIES =================

  const categories = [
    {
      name: "Vegetables",
      icon: "🥦",
    },
    {
      name: "Fruits",
      icon: "🍎",
    },
    {
      name: "Dairy",
      icon: "🥛",
    },
    {
      name: "Bakery",
      icon: "🍞",
    },
    {
      name: "Beverages",
      icon: "🥤",
    },
    {
      name: "Snacks",
      icon: "🍪",
    },
  ];

  return (
    <div className="app">

      {/* ================= NAVBAR ================= */}

      <nav className="navbar">

        {/* LOGO */}
        <div
          className="logo"
          onClick={() => {
            setPage("home");
            setSelectedCategory(null);
            setShowCheckout(false);
          }}
          style={{ cursor: "pointer" }}
        >
          🛒 FreshMart
        </div>

        <div className="nav-links">

          {/* HOME */}
          <a
            href="#"
            onClick={(e) => {
              e.preventDefault();

              setPage("home");
              setSelectedCategory(null);
              setShowCheckout(false);
            }}
          >
            Home
          </a>

          {/* CATEGORIES */}
          <a
            href="#"
            onClick={(e) => {
              e.preventDefault();

              setPage("categories");
              setSelectedCategory(null);
              setShowCheckout(false);
            }}
          >
            Categories
          </a>

          {/* SHOP */}
          <a
            href="#"
            onClick={(e) => {
              e.preventDefault();

              setPage("shop");
              setSelectedCategory(null);
              setShowCheckout(false);
            }}
          >
            Shop
          </a>

          {/* ABOUT */}
          <a
            href="#"
            onClick={(e) => {
              e.preventDefault();

              setPage("about");
              setSelectedCategory(null);
              setShowCheckout(false);
            }}
          >
            About
          </a>

        </div>

        {/* SEARCH */}

        <div className="search-box">

          <input
            type="text"
            placeholder="Search groceries..."
            value={search}
            onChange={(e) =>
              setSearch(e.target.value)
            }
          />

          <button>🔍</button>

        </div>

        {/* ICONS */}

        <div className="nav-icons">

          {/* FAVORITES */}

          <button
            onClick={() => {
              setPage("favorites");
              setSelectedCategory(null);
              setShowCheckout(false);

              window.scrollTo({
                top: 0,
                behavior: "smooth",
              });
            }}
          >
            ♡

            {favorites.length > 0 && (
              <span className="cart-count">
                {favorites.length}
              </span>
            )}

          </button>

          {/* CART */}

          <button
            className="cart-button"
            onClick={() => {
              setPage("cart");
              setSelectedCategory(null);
              setShowCheckout(false);

              window.scrollTo({
                top: 0,
                behavior: "smooth",
              });
            }}
          >
            🛒

            {cart.length > 0 && (
              <span className="cart-count">
                {cart.length}
              </span>
            )}

          </button>

          {/* LOGIN */}

          <button
            onClick={() =>
              setShowLogin(true)
            }
          >
            {isLoggedIn ? "✓" : "👤"}
          </button>

        </div>

      </nav>


      {/* ================= HOME ================= */}

      {page === "home" && !showCheckout && (

        <section className="hero">

          <div className="hero-content">

            <p className="small-title">
              FRESH & ORGANIC
            </p>

            <h1>
              Fresh groceries,
              <br />
              delivered to you
            </h1>

            <p>
              Get fresh fruits, vegetables,
              dairy products and everyday
              groceries delivered right to
              your door.
            </p>

            <button
              className="shop-btn"
              onClick={() => {
                setPage("shop");

                window.scrollTo({
                  top: 0,
                  behavior: "smooth",
                });
              }}
            >
              Shop Now →
            </button>

          </div>

          <div className="hero-image">
            🥦 🍎 🥕
          </div>

        </section>
      )}


      {/* ================= ABOUT ================= */}

      {page === "about" && !showCheckout && (

        <section className="about-page">

          <div className="about-page-box">


            <h1>
              About FreshMart
            </h1>

            <p>
              FreshMart makes grocery shopping
              simple, fast and convenient.
              We provide fresh fruits,
              vegetables, dairy products and
              everyday groceries for your
              daily needs.
            </p>

            <p>
              Our goal is to make grocery
              shopping easy and enjoyable,
              with quality products and a
              simple shopping experience.
            </p>

          </div>

        </section>
      )}


      {/* ================= SHOP ================= */}

      {page === "shop" && !showCheckout && (

        <section className="shop-page">

          <div className="shop-page-header">



            <h1>
              Shop Groceries
            </h1>

            <p>
              All Available Products
            </p>

          </div>

          <div className="product-grid">

            {allProducts.map((product) => (

              <div
                className="product-card"
                key={product.id}
              >

                <div className="product-image">
                  {product.emoji}
                </div>

                <button
                  className="favorite-btn"
                  onClick={() =>
                    toggleFavorite(product)
                  }
                >
                  {favorites.some(
                    (item) =>
                      item.id === product.id
                  )
                    ? "♥"
                    : "♡"}
                </button>

                <h3>
                  {product.name}
                </h3>

                <p>
                  {product.unit}
                </p>

                <strong>
                  Rs. {product.price}
                </strong>

                <button
                  className="add-btn"
                  onClick={() =>
                    addToCart(product)
                  }
                >
                  Add to Cart
                </button>

              </div>

            ))}

          </div>

        </section>
      )}

      {/* ================= CATEGORIES ================= */}

      {page === "categories" &&
        !selectedCategory &&
        !showCheckout && (

          <section className="categories-page">

            <div className="shop-page-header">

              <h1>
                Shop by Category
              </h1>

              <p>
                Select a category to see
                its products
              </p>

            </div>

            <div className="category-grid">

              {categories.map((category) => (

                <button
                  className="category-card"
                  key={category.name}
                  onClick={() => {

                    setSelectedCategory(
                      category.name
                    );

                    window.scrollTo({
                      top: 0,
                      behavior: "smooth",
                    });

                  }}
                >

                  <span>
                    {category.icon}
                  </span>

                  <h3>
                    {category.name}
                  </h3>

                </button>

              ))}

            </div>

          </section>
        )}


      {/* ================= SELECTED CATEGORY ================= */}

      {page === "categories" &&
        selectedCategory &&
        !showCheckout && (

          <section className="shop-page">

            <div className="shop-page-header">

              <button
                className="back-btn"
                onClick={() => {
                  setSelectedCategory(null);
                  window.scrollTo({
                    top: 0,
                    behavior: "smooth",
                  });
                }}
              >
                ← Back to Categories
              </button>

              <h1>
                {selectedCategory}
              </h1>

              <p>
                Fresh products available
                in this category
              </p>

            </div>

            <div className="product-grid">

              {categoryProducts.map((product) => (

                <div
                  className="product-card"
                  key={product.id}
                >

                  <div className="product-image">
                    {product.emoji}
                  </div>

                  <button
                    className="favorite-btn"
                    onClick={() =>
                      toggleFavorite(product)
                    }
                  >
                    {favorites.some(
                      (item) =>
                        item.id === product.id
                    )
                      ? "♥"
                      : "♡"}
                  </button>

                  <h3>
                    {product.name}
                  </h3>

                  <p>
                    {product.unit}
                  </p>

                  <strong>
                    Rs. {product.price}
                  </strong>

                  <button
                    className="add-btn"
                    onClick={() =>
                      addToCart(product)
                    }
                  >
                    Add to Cart
                  </button>

                </div>

              ))}

            </div>

          </section>
        )}


      {/* ================= CART ================= */}

      {page === "cart" && !showCheckout && (

        <section className="cart-page">

          <div className="shop-page-header">



            <h1>
              Your Cart
            </h1>

            <p>
              Your selected groceries
            </p>

          </div>

          {cart.length === 0 ? (

            <div className="empty-cart">

              <h2>
                Your cart is empty.
              </h2>

            </div>

          ) : (

            <>

              <div className="cart-list">

                {cart.map((item) => (

                  <div
                    className="cart-item"
                    key={item.id}
                  >

                    <div className="cart-product">

                      <span className="cart-emoji">
                        {item.emoji}
                      </span>

                      <div>

                        <h3>
                          {item.name}
                        </h3>

                        <p>
                          Rs. {item.price} /{" "}
                          {item.unit}
                        </p>

                      </div>

                    </div>

                    <div className="quantity">

                      <button
                        onClick={() =>
                          decreaseQuantity(
                            item.id
                          )
                        }
                      >
                        −
                      </button>

                      <span>
                        {item.quantity}
                      </span>

                      <button
                        onClick={() =>
                          increaseQuantity(
                            item.id
                          )
                        }
                      >
                        +
                      </button>

                    </div>

                    <strong>
                      Rs.{" "}
                      {item.price *
                        item.quantity}
                    </strong>

                    <button
                      className="remove-btn"
                      onClick={() =>
                        removeFromCart(
                          item.id
                        )
                      }
                    >
                      Remove
                    </button>

                  </div>

                ))}

              </div>

              <div className="cart-total">

                <div>

                  <span>
                    Cart Total
                  </span>

                  <h2>
                    Rs. {cartTotal}
                  </h2>

                </div>

                <button
                  className="checkout-btn"
                  onClick={() =>
                    setShowCheckout(true)
                  }
                >
                  Proceed to Checkout →
                </button>

              </div>

            </>

          )}

        </section>
      )}


      {/* ================= FAVORITES ================= */}

      {page === "favorites" && !showCheckout && (

        <section className="favorites-page">

          <div className="shop-page-header">

            <h1>
              My Favorites
            </h1>

            <p>
              Products you saved
            </p>

          </div>

          {favorites.length === 0 ? (

            <div className="empty-favorites">

              <div className="empty-favorite-icon">
                ♡
              </div>

              <h2>
                No Favorite Products Yet
              </h2>

              <p>
                Tap the heart on any product
                to save it here.
              </p>

              <button
                className="shop-btn"
                onClick={() =>
                  setPage("shop")
                }
              >
                Browse Products →
              </button>

            </div>

          ) : (

            <div className="product-grid">

              {favorites.map((product) => (

                <div
                  className="product-card"
                  key={product.id}
                >

                  <div className="product-image">
                    {product.emoji}
                  </div>

                  <button
                    className="favorite-btn active"
                    onClick={() =>
                      toggleFavorite(product)
                    }
                  >
                    ♥
                  </button>

                  <h3>
                    {product.name}
                  </h3>

                  <p>
                    {product.unit}
                  </p>

                  <strong>
                    Rs. {product.price}
                  </strong>

                  <button
                    className="add-btn"
                    onClick={() =>
                      addToCart(product)
                    }
                  >
                    Add to Cart
                  </button>

                </div>

              ))}

            </div>

          )}

        </section>
      )}


      {/* ================= CHECKOUT ================= */}

      {showCheckout && (

        <Checkout
          cart={cart}
          total={cartTotal}
          onBack={() =>
            setShowCheckout(false)
          }
          onOrderPlaced={() => {

            setCart([]);
            setShowCheckout(false);
            setPage("home");

          }}
        />

      )}


      {/* ================= LOGIN ================= */}

      {showLogin && (

        <Login
          onClose={() =>
            setShowLogin(false)
          }
          onLoginSuccess={
            handleLoginSuccess
          }
        />

      )}

    </div>
  );
}

export default App;