import { NavLink, useNavigate } from "react-router-dom";
import { FaUserShield, FaBox, FaShoppingBag, FaUsers } from "react-icons/fa";
import "./AdminNavBar.css";

export default function AdminNavBar() {
  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");

    navigate("/Login");
  };

  return (
    <header className="admin-navbar">

      <div className="admin-logo">
        <FaUserShield />
        <span>ADMIN</span>
      </div>

      <nav className="admin-navigation">

        <NavLink to="/admin">
          Dashboard
        </NavLink>

        <NavLink to="/addproduct">
          <FaBox />
          Produits
        </NavLink>

        <NavLink to="/commande">
          <FaShoppingBag />
          Commandes
        </NavLink>

        <NavLink to="/users">
          <FaUsers />
          Utilisateurs
        </NavLink>

         <NavLink to="/Achat">
          <FaUsers />
          produit
        </NavLink>

      </nav>

      <div className="admin-actions">

        <button
          onClick={() => navigate("/Home")}
          className="admin-site-btn"
        >
          Voir le site
        </button>

        <button
          onClick={logout}
          className="admin-logout"
        >
          Déconnexion
        </button>

      </div>

    </header>
  );
}