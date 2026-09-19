import NavBar from "../NavBar/NavBar";
import { useCart } from "./CartContext";
import "./Cart.css";

export default function Cart() {
  const { cart, removeFromCart } = useCart();

  return (
    <>
      <NavBar />

      <div className="cart-container">

        <h1 className="cart-title">
          Mon panier
        </h1>

        {cart.length === 0 ? (

          <p className="cart-empty">
            Le panier est vide.
          </p>

        ) : (

          <div className="cart-grid">

            {cart.map((product) => (

              <div
                className="cart-card"
                key={product._id}
              >

                <img
                  src={product.image}
                  alt={product.name}
                  className="cart-image"
                />

                <div className="cart-details">

                  <h3 className="cart-product-name">
                    {product.name}
                  </h3>

                  <p className="cart-product-category">
                    {product.category}
                  </p>

                  <p className="cart-product-price">
                    {product.prix} DA
                  </p>

                  <button
                    className="cart-delete-btn"
                    onClick={() =>
                      removeFromCart(product._id)
                    }
                  >
                    Supprimer
                  </button>

                </div>

              </div>

            ))}

          </div>

        )}

      </div>
    </>
  );
}