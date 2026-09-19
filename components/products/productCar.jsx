import { useNavigate } from "react-router-dom";
import "./product.css";

function ProductCard({ product }) {
  const navigate = useNavigate();

  return (
    <div
      className="product-card"
      onClick={() => navigate(`/product/${product._id}`)}
      style={{ cursor: "pointer" }}
    >
      <img
        src={product.image}
        alt={product.name}
        className="product-image"
      />

      <div className="product-details">
        <p className="product-category">{product.category}</p>
        <h3 className="product-name">{product.name}</h3>
        <p className="product-price">{product.prix} DA</p>


        
      </div>
    </div>
  );
}

export default ProductCard;