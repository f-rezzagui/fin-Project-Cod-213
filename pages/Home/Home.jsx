import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import NavBar from "../../components/NavBar/NavBar";
import { useCart } from "../../components/Carts/CartContext";
import "./Home.css";

const API_URL = "http://localhost:3000";

export default function Home() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    setLoading(true);
    setError(null);

    fetch(`${API_URL}/prodact`)
      .then((res) => {
        if (!res.ok) {
          throw new Error("Erreur lors du chargement des produits");
        }

        return res.json();
      })
      .then((data) => {
        setProducts(Array.isArray(data) ? data : data.prodact|| []);
      })
      .catch((error) => {
        console.error(error);
        setError("Impossible de charger les produits pour le moment.");
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

 
  const categories = [
    ...new Set(
      products
        .map((product) => product.category)
        .filter(Boolean)
    ),
  ];

  return (
    <>
      <NavBar />

      <main className="home">

     
        <section className="hero">
          <div className="hero-badge">Offres de la semaine</div>

          <div className="hero-content">
            <h1>
              Tout ce qu'il vous faut,
              <br />
              <strong>livré vite.</strong>
            </h1>

            <p>
              Une sélection de produits suivie en continu,
              au meilleur prix, sans mauvaise surprise.
            </p>

            <button
              className="hero-button"
              onClick={() => navigate("/achat")}
            >
              Voir les produits
              <span>→</span>
            </button>
          </div>

          <div className="hero-side">
            <div className="hero-side-card">
              <div className="hero-side-visual" />
              <strong>Nouveautés</strong>
              <span>Fraîchement ajoutées</span>
            </div>
            <div className="hero-side-card hero-side-card--alt">
              <div className="hero-side-visual" />
              <strong>Meilleures ventes</strong>
              <span>Ce que nos clients préfèrent</span>
            </div>
          </div>
        </section>

       
        <section className="reassurance">
          <span><strong>Livraison rapide</strong> partout en Algérie</span>
          <span><strong>Paiement sécurisé</strong> à chaque commande</span>
          <span><strong>Retours simples</strong> sous conditions</span>
        </section>

       
        <section className="categories-section">
  <div className="section-header">
    <span className="section-label">Explorer</span>
    <h2>Nos catégories</h2>
  </div>

  <div className="categories">

    <button
      className="category-card"
      onClick={() => navigate("/pordact?category=vetement")}
    >
      <div className="category-icon">👕</div>
      <h3>Mode</h3>
      <span>Voir les produits →</span>
    </button>

    <button
      className="category-card"
      onClick={() => navigate("/pordact?category=chaussure")}
    >
      <div className="category-icon">👟</div>
      <h3>Chaussure</h3>
      <span>Voir les produits →</span>
    </button>

    <button
      className="category-card"
      onClick={() => navigate("/pordact?category=Accessoires")}
    >
      <div className="category-icon">⌚</div>
      <h3>Accessoires</h3>
      <span>Voir les produits →</span>
    </button>

    <button
      className="category-card"
      onClick={() => navigate("/pordact?category=Électronique")}
    >
      <div className="category-icon">💻</div>
      <h3>Électronique</h3>
      <span>Voir les produits →</span>
    </button>

  </div>
</section>
       
        <section className="products-section">

          <div className="section-header products-header">
            <div>
              <span className="section-label">Nos produits</span>
              <h2>Produits populaires</h2>
            </div>

            <button
              className="view-all"
              onClick={() => navigate("/achat")}
            >
              Voir tous les produits →
            </button>
          </div>

          {loading ? (
            <div className="loading">
              <div className="loader"></div>
              <p>Chargement des produits...</p>
            </div>
          ) : error ? (
            <div className="empty-products">
              <span>⚠️</span>
              <h3>Une erreur est survenue</h3>
              <p>{error}</p>
            </div>
          ) : products.length === 0 ? (
            <div className="empty-products">
              <span>🛍️</span>
              <h3>Aucun produit disponible</h3>
              <p>
                Les produits apparaîtront ici lorsqu'ils seront ajoutés.
              </p>
            </div>
          ) : (
            <div className="products-grid">

              {products.slice(0, 8).map((prodact) => (

                <article
                  className="product-card"
                  key={prodact._id}
                >

                  
                  <button
                    type="button"
                    className="product-image"
                    onClick={() =>
                      navigate(`/prodact/${prodact._id}`)
                    }
                  >
                    <img
                      src={prodact.image}
                      alt={prodact.name}
                    />

                    <span className="product-badge">
                      Nouveau
                    </span>
                  </button>

               
                  <div className="product-info">

                    <span className="product-category">
                      {prodact.category}
                    </span>

                    <h3>
                      <button
                        type="button"
                        className="product-title-button"
                        onClick={() =>
                          navigate(`/prodact/${prodact._id}`)
                        }
                      >
                        {prodact.name}
                      </button>
                    </h3>

                    <div className="product-bottom">

                      <strong>
                        {prodact.prix || product.price} DA
                      </strong>

                      
                    </div>

                  </div>

                </article>

              ))}

            </div>
          )}

        </section>

        <section className="promotion">

          <div className="promotion-content">

            <span>Offre spéciale</span>

            <h2>
              Faites-vous plaisir.
              <br />
              <strong>Shoppez maintenant.</strong>
            </h2>

            <p>
              Trouvez les produits qui correspondent
              à votre style et à vos besoins.
            </p>

            <button onClick={() => navigate("/achat")}>
              Acheter maintenant →
            </button>

          </div>

          <div className="promotion-shape">
            <span>SHOP</span>
          </div>

        </section>

        <section className="advantages">

          <div className="advantage">
            <span>🚚</span>
            <div>
              <h3>Livraison rapide</h3>
              <p>Recevez vos commandes rapidement.</p>
            </div>
          </div>

          <div className="advantage">
            <span>🔒</span>
            <div>
              <h3>Paiement sécurisé</h3>
              <p>Vos informations sont protégées.</p>
            </div>
          </div>

          <div className="advantage">
            <span>↩️</span>
            <div>
              <h3>Commande simple</h3>
              <p>Une expérience d'achat facile.</p>
            </div>
          </div>

        </section>

      </main>

      <footer className="footer">

        <div className="footer-container">

          <div className="footer-brand">
            <h2>SHOP<span>.</span></h2>

            <p>
              Votre boutique en ligne pour découvrir
              des produits de qualité.
            </p>
          </div>

          <div>
            <h3>Boutique</h3>

            <p>
              <button type="button" onClick={() => navigate("/achat")}>
                Produits
              </button>
            </p>

            <p>
              <button type="button" onClick={() => navigate("/cart")}>
                Panier
              </button>
            </p>
          </div>

          <div>
            <h3>Compte</h3>

            <p>
              <button type="button" onClick={() => navigate("/Login")}>
                Connexion
              </button>
            </p>

            <p>
              <button type="button" onClick={() => navigate("/Register")}>
                Inscription
              </button>
            </p>
          </div>

          <div>
            <h3>Contact</h3>

            <p>📧 contact@shop.com</p>
            <p>📞 +213 XX XX XX XX</p>
          </div>

        </div>

        <div className="footer-bottom">
          © 2026 SHOP. Tous droits réservés.
        </div>

      </footer>
    </>
  );
}
