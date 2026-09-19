import React, { useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import Search from "../recherche/Search";
import "./NavBar.css";
import { useCart } from "../Carts/CartContext";
import { FaUserCircle } from "react-icons/fa";
import { FaShoppingCart } from "react-icons/fa";

const API_URL = "http://localhost:3000";

export default function NavBar() {
  const navigate = useNavigate();
  const { cart } = useCart();
  const [openProductMenu, setOpenProductMenu] = useState(false);
  const [openMenu, setOpenMenu] = useState(false);
  const [user, setUser] = useState(null);

  const token = localStorage.getItem("token");

  useEffect(() => {
    if (!token) {
      setUser(null);
      return;
    }

    fetch(`${API_URL}/profile`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        console.log("Profil Navbar :", data);
        setUser(data);
      })
      .catch((error) => {
        console.error("Erreur profil Navbar :", error);
      });
  }, [token]);

  const logout = () => {
    localStorage.removeItem("token");
    setUser(null);
    setOpenMenu(false);
    navigate("/Login");
  };

  return (
    <header className="header">

      <h2 className="logo" onClick={() => navigate("/Home")}>
        SHOP<span className="logo-dot">.</span>
      </h2>

      <Search />

      <nav className="navigation">

        <NavLink to="/Home">
          Home
        </NavLink>

        <NavLink to="/addproduct">
          Shop
        </NavLink>

        <NavLink to="/Achat">
          Services
        </NavLink>

        <div className="product-menu">

  <button
    className="product-menu-button"
    onClick={() => setOpenProductMenu(!openProductMenu)}
  >
    Produit
    <span className={openProductMenu ? "arrow rotate" : "arrow"}>
      ▾
    </span>
  </button>

  {openProductMenu && (
    <div className="product-dropdown">

      <button
        onClick={() => {
          setOpenProductMenu(false);
          navigate("/pordact?genre=femme");
        }}
      >
        Femme
      </button>

      <button
        onClick={() => {
          setOpenProductMenu(false);
          navigate("/pordact?category=homme");
        }}
      >
        Homme
      </button>

      <button
        onClick={() => {
          setOpenProductMenu(false);
          navigate("/pordact?category=enfant");
        }}
      >
        Enfants
      </button>

    </div>
  )}

</div>

        <NavLink to="/commande">
          Commande
        </NavLink>
        

        {/* Panier */}
        <button
          className="shop-btn"
          onClick={() => navigate("/cart")}
        >
          <FaShoppingCart className="cart-icon" />

          <span>Shop</span>

          <span className="cart-count">
            {cart.length}
          </span>
        </button>

        {/* Profil */}
        {token ? (

          <div className="profile-menu">

            <button
              className="profile-button"
              onClick={() => setOpenMenu(!openMenu)}
            >

              {user?.image ? (

                <img
                  src={user.image}
                  alt="Profil"
                  className="navbar-profile-image"
                />

              ) : (

                <FaUserCircle className="profile-icon" />

              )}

            </button>
            

            {openMenu && (

              <div className="dropdown-menu">

                <button
                  onClick={() => {
                    setOpenMenu(false);
                    navigate("/profile");
                  }}
                >
                  Afficher le profil
                </button>

                <button onClick={logout}>
                  Déconnexion
                </button>

              </div>

            )}

          </div>

        ) : (

          <button
            className="btnLogin-popup"
            onClick={() => navigate("/Login")}
          >
            Login
          </button>

        )}

      </nav>

    </header>
  );
}
