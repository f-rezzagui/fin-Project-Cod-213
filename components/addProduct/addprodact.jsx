import React, { useState } from "react";
import "./addProdact.css";
import NavBar from "../NavBar/NavBar"
export default function AddProduct() {
  const [name, setName] = useState("");
  const [category, setCategory] = useState("");
  const [prix, setPrix] = useState("");
  const [price, setPrice] = useState("");
  const [image, setImage] = useState(null);
  const [description, setDescription] = useState("");
  const [genre, setGenre] = useState(null);
 const handleFormSubmit = async (e) => {
  e.preventDefault();

  const token = localStorage.getItem("token");

  if (!token) {
    alert("Vous devez être connecté en tant qu'administrateur.");
    return;
  }

  if (!genre) {
    alert("Veuillez sélectionner le genre.");
    return;
  }

  const formData = new FormData();

  formData.append("name", name);
  formData.append("category", category);
  formData.append("prix", prix);
  formData.append("price", price);
  formData.append("description", description);
  formData.append("genre", genre);

  if (image) {
    formData.append("image", image);
  }

  try {
    const res = await fetch("http://localhost:3000/prodact", {
      method: "POST",

      headers: {
        Authorization: `Bearer ${token}`,
      },

      body: formData,
    });

    const data = await res.json();

    if (!res.ok) {
      console.error("Erreur serveur :", data);

      throw new Error(
        data.message || `Erreur serveur : ${res.status}`
      );
    }

    setName("");
    setCategory("");
    setPrix("");
    setPrice("");
    setDescription("");
    setGenre(null);
    setImage(null);

    e.target.reset();

    alert("Produit créé avec succès !");
  } catch (error) {
    console.error("Erreur attrapée :", error);

    alert(error.message || "Une erreur est survenue.");
  }
};

  return (
    <div>
      <NavBar />
      
      
      <div className="product-form-container">
      
      <h1>PRODUCT</h1>
      <form onSubmit={handleFormSubmit}>
        <div className="form-group">
          <label>Nom de l'article</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>

        <div className="form-group">
          <label>Catégorie</label>
          <input
            type="text"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            required
          />
        </div>
        <div className="pointure">

          {["femme","homme","enfants"].map(
            (size) => (
              <button
                key={size}
                type="button"
                className={
                  genre === size
                    ? "active"
                    : ""
                }
                onClick={() =>
                  setGenre(size)
                }
              >
                {size}
              </button>
            )
          )}

        </div>

        <div className="form-group">
          <label>Prix</label>
          <input
            type="number"
            value={prix}
            onChange={(e) => setPrix(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label>nomber de Piece</label>
          <input
            type="number"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            required
          />
        </div>

        <div className="form-group">
          <label>Description</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>

        <div className="form-group">
          <label>Image de l'article</label>
          <input
            type="file"
            onChange={(e) => setImage(e.target.files[0])}
            required
          />
        </div>

        <button className="BtnAdd" type="submit">Créer l'article</button>
      </form>
    </div>
    </div>
  );
}
