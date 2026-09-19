import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import NavBar from "../NavBar/NavBar";
import Achat from "../achats/achat";
import "./ProductDetail.css";

const API_URL = "http://localhost:3000";

function ProductDetails() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [product, setProduct] = useState(null);
  const [user, setUser] = useState(null);

  // =========================
  // RECUPERER UTILISATEUR
  // =========================
  useEffect(() => {
    const storedUser = localStorage.getItem("user");

    if (storedUser) {
      try {
        const parsedUser = JSON.parse(storedUser);
        setUser(parsedUser);
      } catch (error) {
        console.error(
          "Erreur localStorage user :",
          error
        );

        localStorage.removeItem("user");
      }
    }
  }, []);

  // =========================
  // RECUPERER PRODUIT
  // =========================
  useEffect(() => {
    const getProduct = async () => {
      try {
        const res = await fetch(
          `${API_URL}/prodact/${id}`
        );

        if (!res.ok) {
          throw new Error("Produit introuvable");
        }

        const data = await res.json();

        setProduct(data);

      } catch (error) {
        console.error(
          "Erreur produit :",
          error
        );
      }
    };

    getProduct();
  }, [id]);

  // =========================
  // VERIFIER ADMIN
  // =========================
  const isAdmin =
    user?.role?.toLowerCase() === "admin";

  console.log("Utilisateur :", user);
  console.log("Est admin :", isAdmin);

  // =========================
  // CHARGEMENT
  // =========================
  if (!product) {
    return (
      <>
        <NavBar />

        <h2>Chargement...</h2>
      </>
    );
  }

  // =========================
  // AFFICHAGE
  // =========================
  return (
    <>
      <NavBar />

      <div className="details-container">

        {/* IMAGE */}
        <div className="details-image">
          <img
            src={product.image}
            alt={product.name}
          />
        </div>

        {/* INFORMATIONS */}
        <div className="details-info">

          <h1>
            {product.name}
          </h1>

          <p className="category">
            Catégorie : {product.category}
          </p>

          <h2 className="price">
            {product.prix || product.price} DA
          </h2>

          <p className="description">
            {product.description}
          </p>

          {/* BOUTON UNIQUEMENT ADMIN */}
          {isAdmin === true && (
            <button
              type="button"
              className="edit-product-btn"
              onClick={() =>
                navigate(
                  `/products/edit/${product._id}`
                )
              }
            >
              Modifier
            </button>
          )}

        </div>

      </div>

      {/* SECTION ACHAT */}
      <div className="achat-section">
        <Achat />
      </div>
    </>
  );
}

export default ProductDetails;