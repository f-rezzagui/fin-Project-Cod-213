import { useState, useEffect } from "react";
import "./product.css";
import { Link, useSearchParams } from "react-router-dom";
import NavBar from "../NavBar/NavBar";

const API_URL = "http://localhost:3000";

function Products() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  const [searchParams] = useSearchParams();


  const category = searchParams.get("category");
const genre = searchParams.get("genre");
  useEffect(() => {
    fetchProducts();
  }, [category]);

  const fetchProducts = async () => {
    try {
      setLoading(true);

      let url = `${API_URL}/prodact`;

     
      if (category) {
        url += `?category=${encodeURIComponent(category)}`;
      }
      if (genre) {
        url += `?genre=${encodeURIComponent(genre)}`;
      }


      const res = await fetch(url);
      const data = await res.json();

      setProducts(Array.isArray(data) ? data : []);

    } catch (err) {
      console.error(
        "Erreur lors du chargement des produits:",
        err
      );

      setProducts([]);

    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <NavBar />

      <div className="products-container">

       
        <h1 className="products-title">
          {category
            ? `Produits ${category}`
            : "Tous les produits"}
        </h1>

        {loading ? (

          <p className="status-message">
            Chargement...
          </p>

        ) : products.length === 0 ? (

          <p className="status-message">
            Aucun produit disponible
            {category && ` pour ${category}`}.
          </p>

        ) : (

          products.map((product) => (

            <Link
              to={`/product/${product._id}`}
              key={product._id}
              className="product-link"
            >

              <div className="product-card">

                <img
                  src={product.image}
                  alt={product.name}
                  className="product-image"
                />

                <div className="product-details">

                  <p className="product-category">
                    {product.category}
                  </p>

                  <h3 className="product-name">
                    {product.name}
                  </h3>

                  <p className="product-price">
                    {product.prix} DA
                  </p>

                </div>

              </div>

            </Link>

          ))

        )}

      </div>
    </div>
  );
}

export default Products;