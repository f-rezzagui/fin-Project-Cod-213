import React, { useEffect, useState } from "react";
import axios from "axios";
import { IoSearch } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import "./Search.css";

const API_URL = "http://localhost:3000/prodact";

export default function Search({ onResults }) {
  const [search, setSearch] = useState("");
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    const value = search.trim();

    if (!value) {
      setResults([]);
      onResults?.([]);
      return;
    }

    const timer = setTimeout(async () => {
      try {
        setLoading(true);

        const res = await axios.get(
          `${API_URL}?search=${encodeURIComponent(value)}`
        );

        const products = Array.isArray(res.data) ? res.data : [];

        setResults(products);
        onResults?.(products);
      } catch (error) {
        console.error("Erreur recherche :", error);
        setResults([]);
        onResults?.([]);
      } finally {
        setLoading(false);
      }
    }, 300);

    return () => clearTimeout(timer);
  }, [search, onResults]);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!search.trim()) return;

    if (results.length > 0) {
      navigate(`/product/${results[0]._id}`);
    }
  };

  const handleProductClick = (id) => {
    setSearch("");
    setResults([]);

    navigate(`/product/${id}`);
  };

  return (
    <div className="search-container">
      <form onSubmit={handleSubmit} className="search-form">
        <input
          type="text"
          placeholder="Rechercher un produit..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <button className="BtnSearch" type="submit">
          <IoSearch />
        </button>
      </form>

      {search.trim() !== "" && (
        <div className="search-results">

          {loading && (
            <div className="search-loading">
              Recherche...
            </div>
          )}

          {!loading && results.length === 0 && (
            <div className="no-results">
              Aucun produit trouvé
            </div>
          )}

          {!loading &&
            results.map((product) => (
              <div
                className="search-result-item"
                key={product._id}
                onClick={() => handleProductClick(product._id)}
              >
                <img
                  src={product.image}
                  alt={product.name}
                  className="search-product-image"
                />

                <div className="search-product-info">
                  <h4>{product.name}</h4>

                  <p>{product.category}</p>

                  <strong>
                    {product.prix} DA
                  </strong>
                </div>
              </div>
            ))}
        </div>
      )}
    </div>
  );
}