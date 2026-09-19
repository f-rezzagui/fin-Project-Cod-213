import { useState, useEffect } from "react";

const API_URL = "http://localhost:3000"; 

function ProductsPage() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [name, setName] = useState("");
  const [category, setCategory] = useState("");
  const [price, setPrice] = useState("");
  const [image, setImage] = useState(null);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const res = await fetch(`${API_URL}/products`);
      const data = await res.json();
      setProducts(data);
    } catch (err) {
      console.error("Erreur lors du chargement des produits:", err);
    }
  };


  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!name || !category || !price || !image) {
      console.log("Remplis tous les champs");
      return;
    }

    const formData = new FormData();
    formData.append("name", name);
    formData.append("category", category);
    formData.append("price", price);
    formData.append("image", image);

    try {
      setLoading(true);
      const res = await fetch(`${API_URL}/addProduct`, {
        method: "POST",
        body: formData,
      });

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.message || "Erreur lors de l'ajout");
      }

      const newProduct = await res.json();
      setProducts((prev) => [...prev, newProduct]);
      setName("");
      setCategory("");
      setPrice("");
      setImage(null);
    } catch (err) {
      console.error(err);
    } 
  };

  return (
    <div style={{ padding: "20px" }}>
      <h1>Produits</h1>

      <form onSubmit={handleSubmit} style={{ marginBottom: "30px" }}>
        <input
          type="text"
          placeholder="Nom du produit"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <input
          type="text"
          placeholder="Catégorie"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        />
        <input
          type="number"
          placeholder="Prix"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
        />
        <input type="file" onChange={(e)=>setImage(e.target.files[0])} />

        <button type="submit">
          ajouter
        </button>
      </form>

      <div style={{ display: "flex", flexWrap: "wrap", gap: "20px" }}>
          {products.map((product) => (
            <div
              key={product._id}
              style={{ border: "1px solid #ccc", padding: "10px", width: "200px" }}
            >
              <img
                src={product.image}
                alt={product.name}
                style={{ width: "100%", height: "150px", objectFit: "cover" }}
              />
              <h3>{product.name}</h3>
              <p>Catégorie: {product.category}</p>
              <p>Prix: {product.price} DA</p>
            </div>
          ))}
      </div>
    </div>
  );
}

export default ProductsPage;