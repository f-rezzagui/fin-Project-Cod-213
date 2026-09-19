import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "./EditProduct.css";

const API_URL = "http://localhost:3000";

export default function EditProduct() {

  const { id } = useParams();
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [category, setCategory] = useState("");
  const [prix, setPrix] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");

  const [image, setImage] = useState(null);
  const [oldImage, setOldImage] = useState("");

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const [message, setMessage] = useState("");
  const [error, setError] = useState("");


  
  useEffect(() => {

    const getProduct = async () => {

      try {

        const response = await fetch(
          `${API_URL}/prodact/${id}`
        );

        const text = await response.text();

        let data;

        try {
          data = JSON.parse(text);
        } catch {
          throw new Error(
            "Le serveur a retourné une réponse invalide."
          );
        }

        if (!response.ok) {

          throw new Error(
            data.message || "Produit introuvable"
          );

        }

        setName(data.name || "");
        setCategory(data.category || "");
        setPrix(data.prix || "");
        setPrice(data.price ?? "");
        setDescription(data.description || "");
        setOldImage(data.image || "");

      } catch (error) {

        console.error(
          "Erreur récupération produit :",
          error
        );

        setError(error.message);

      } finally {

        setLoading(false);

      }
    };

    getProduct();

  }, [id]);


 
  const handleSubmit = async (e) => {

    e.preventDefault();

    setSaving(true);
    setMessage("");
    setError("");

    try {

      const token =
        localStorage.getItem("token");


     
      if (!token) {

        setError(
          "Vous devez être connecté pour modifier ce produit."
        );

        setSaving(false);

        return;
      }


    
      const formData = new FormData();

      formData.append("name", name);
      formData.append("category", category);
      formData.append("prix", prix);
      formData.append("price", price);
      formData.append("description", description);


      // Nouvelle image seulement si sélectionnée

      if (image) {

        formData.append(
          "image",
          image
        );

      }


      
      
     
      const response = await fetch(
        `${API_URL}/prodact/${id}`,
        {
          method: "PATCH",

          headers: {
            Authorization: `Bearer ${token}`
          },

          body: formData
        }
      );


     
      const text = await response.text();

      console.log(
        "Réponse serveur :",
        text
      );


      let data;

      try {

        data = JSON.parse(text);

      } catch {

        throw new Error(
          `Le serveur a retourné une réponse non JSON (${response.status}).`
        );

      }


      
      if (!response.ok) {

        if (response.status === 401) {

          localStorage.removeItem("token");
          localStorage.removeItem("user");

          setError(
            "Votre session a expiré. Veuillez vous reconnecter."
          );

          setTimeout(() => {
            navigate("/Login");
          }, 1500);

          return;
        }


        if (response.status === 403) {

          setError(
            "Vous n'avez pas les droits administrateur."
          );

          return;
        }


        throw new Error(
          data.message ||
          "Erreur lors de la modification du produit"
        );

      }


 
      setMessage(
        "Produit modifié avec succès !"
      );

      console.log(
        "Produit modifié :",
        data.product
      );


      setTimeout(() => {

        navigate("/pordact");

      }, 1000);


    } catch (error) {

      console.error(
        "Erreur modification :",
        error
      );

      setError(
        error.message ||
        "Une erreur est survenue."
      );

    } finally {

      setSaving(false);

    }

  };


  

  if (loading) {

    return (
      <div className="edit-loading">
        Chargement du produit...
      </div>
    );

  }


  
  if (error && !name) {

    return (
      <div className="edit-error">
        {error}
      </div>
    );

  }



  return (

    <div className="edit-product-container">

      <div className="edit-product-card">

        <h1>
          Modifier le produit
        </h1>


        {message && (
          <div className="success-message">
            {message}
          </div>
        )}


        {error && (
          <div className="error-message">
            {error}
          </div>
        )}


        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>
              Nom du produit
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) =>
                setName(e.target.value)
              }
              required
            />

          </div>


          {/* CATÉGORIE */}

          <div className="form-group">

            <label>
              Catégorie
            </label>

            <input
              type="text"
              value={category}
              onChange={(e) =>
                setCategory(e.target.value)
              }
              required
            />

          </div>


          {/* PRIX AFFICHÉ */}

          <div className="form-group">

            <label>
              Prix affiché
            </label>

            <input
              type="text"
              value={prix}
              onChange={(e) =>
                setPrix(e.target.value)
              }
              placeholder="25000 DA"
              required
            />

          </div>


          {/* PRIX NUMÉRIQUE */}

          <div className="form-group">

            <label>
              Prix numérique
            </label>

            <input
              type="number"
              value={price}
              onChange={(e) =>
                setPrice(e.target.value)
              }
              min="0"
              required
            />

          </div>


          {/* DESCRIPTION */}

          <div className="form-group">

            <label>
              Description
            </label>

            <textarea
              value={description}
              onChange={(e) =>
                setDescription(e.target.value)
              }
              rows="5"
              required
            />

          </div>


        

          {oldImage && (

            <div className="old-image">

              <p>
                Image actuelle :
              </p>

              <img
                src={oldImage}
                alt={name}
              />

            </div>

          )}


       

          <div className="form-group">

            <label>
              Nouvelle image
            </label>

            <input
              type="file"
              accept="image/*"
              onChange={(e) => {

                const file =
                  e.target.files[0];

                setImage(
                  file || null
                );

              }}
            />

          </div>


          {/* BOUTONS */}

          <div className="edit-buttons">

            <button
              type="button"
              className="cancel-button"
              onClick={() =>
                navigate("/pordact")
              }
            >
              Annuler
            </button>


            <button
              type="submit"
              className="save-button"
              disabled={saving}
            >

              {saving
                ? "Modification..."
                : "Modifier le produit"
              }

            </button>

          </div>

        </form>

      </div>

    </div>

  );

}