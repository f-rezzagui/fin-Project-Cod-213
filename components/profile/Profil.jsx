import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Profil.css";
import NavBar from "../NavBar/NavBar"
const API_URL = "http://localhost:3000";

export default function Profile() {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  // Déconnexion
  const logout = () => {
    localStorage.removeItem("token");
    navigate("/Login");
  };

  // Récupérer le profil
  useEffect(() => {
    const token = localStorage.getItem("token");

    fetch(`${API_URL}/profile`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        console.log("Profil :", data);
        setUser(data);
      })
      .catch((error) => {
        console.error("Erreur profil :", error);
      });
  }, []);

  if (!user) {
    return <h2 className="profile-loading">Chargement...</h2>;
  }

 return (
  <div className="profile-page">
    <NavBar/>
    <div className="profile-container">

      {/* Header */}
      <div className="profile-top">

        <div className="profile-avatar">
          {user.image ? (
            <img src={user.image} alt="Profil" />
          ) : (
            <span>
              {user.name?.charAt(0).toUpperCase()}
            </span>
          )}
        </div>

        <div className="profile-main-info">
          <h1>
            {user.name} {user.firstname}
          </h1>

          <p>{user.email}</p>
        </div>

      </div>

      {/* Informations */}
      <div className="profile-section">

        <div className="section-title">
          <div>
            <span className="section-label">MON COMPTE</span>
            <h2>Informations personnelles</h2>
          </div>
        </div>

        <div className="profile-info-grid">

          <div className="info-card">
            <span>Nom</span>
            <strong>{user.name || "Non renseigné"}</strong>
          </div>

          <div className="info-card">
            <span>Prénom</span>
            <strong>{user.firstname || "Non renseigné"}</strong>
          </div>

          <div className="info-card">
            <span>Email</span>
            <strong>{user.email}</strong>
          </div>

        </div>

        {/* Actions */}
        <div className="profile-actions">

          <button
            className="btn-edit"
            onClick={() => navigate("/profile/edit")}
          >
            Modifier mon profil
          </button>

          <button
            className="btn-logout"
            onClick={logout}
          >
            Déconnexion
          </button>

        </div>

      </div>


    </div>

  </div>
);
}