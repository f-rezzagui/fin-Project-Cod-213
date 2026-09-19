import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./EditProfile.css";
import NavBar from "../NavBar/NavBar"
const API_URL = "http://localhost:3000";

export default function EditProfile() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    firstname: "",
    email: ""
  });

  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState("");
  const [loading, setLoading] = useState(true);

  // Récupérer le profil
  useEffect(() => {
    const token = localStorage.getItem("token");

    fetch(`${API_URL}/profile`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
      .then((res) => res.json())
      .then((data) => {
        setForm({
          name: data.name || "",
          firstname: data.firstname || "",
          email: data.email || ""
        });

        // Photo existante
        if (data.image) {
          setPreview(data.image);
        }

        setLoading(false);
      })
      .catch((error) => {
        console.error("Erreur :", error);
        setLoading(false);
      });
  }, []);

  // Modifier les champs
  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  };

  // Sélectionner une photo
  const handleImageChange = (e) => {
    const file = e.target.files[0];

    if (!file) return;

    setImage(file);

    // Aperçu de l'image
    const imageUrl = URL.createObjectURL(file);
    setPreview(imageUrl);
  };

  // Enregistrer
  const handleSubmit = async (e) => {
    e.preventDefault();

    const token = localStorage.getItem("token");

    try {
      const formData = new FormData();

      formData.append("name", form.name);
      formData.append("firstname", form.firstname);
      formData.append("email", form.email);

      // Ajouter l'image uniquement si une nouvelle image est sélectionnée
      if (image) {
        formData.append("image", image);
      }

      const response = await fetch(`${API_URL}/profile`, {
        method: "PATCH",

        headers: {
          Authorization: `Bearer ${token}`
        },

        body: formData
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.message || "Erreur lors de la modification"
        );
      }

      alert("Profil modifié avec succès !");

      navigate("/profile");

    } catch (error) {
      console.error("Erreur :", error);
      alert(error.message);
    }
  };

  if (loading) {
    return (
      <h2 className="edit-loading">
        Chargement...
      </h2>
    );
  }

  return (
    <div className="edit-profile">
      <NavBar />
      <div className="edit-profile-card">

        <h2>Modifier mon profil</h2>

        <p className="edit-subtitle">
          Modifiez vos informations personnelles
        </p>

        <form onSubmit={handleSubmit}>

          {/* PHOTO */}
          <div className="edit-photo">

            <label htmlFor="profile-image">

              <div className="edit-avatar">

                {preview ? (
                  <img
                    src={preview}
                    alt="Photo de profil"
                  />
                ) : (
                  form.name?.charAt(0).toUpperCase()
                )}

                <div className="camera">
                  📷
                </div>

              </div>

            </label>

            <input
              id="profile-image"
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              hidden
            />

            <p>
              Cliquez sur la photo pour la modifier
            </p>

          </div>

          {/* NOM */}
          <div className="input-group">

            <label>Nom</label>

            <input
              type="text"
              name="name"
              value={form.name}
              onChange={handleChange}
              required
            />

          </div>

          {/* PRÉNOM */}
          <div className="input-group">

            <label>Prénom</label>

            <input
              type="text"
              name="firstname"
              value={form.firstname}
              onChange={handleChange}
              required
            />

          </div>

          {/* EMAIL */}
          <div className="input-group">

            <label>Email</label>

            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              required
            />

          </div>

          {/* BOUTONS */}
          <div className="edit-buttons">

            <button
              type="button"
              className="cancel-btn"
              onClick={() => navigate("/profile")}
            >
              Annuler
            </button>

            <button
              type="submit"
              className="save-btn"
            >
              Enregistrer
            </button>

          </div>

        </form>

      </div>

    </div>
  );
}