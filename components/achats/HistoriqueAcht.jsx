import React, { useEffect, useState } from "react";
import "./HistoriqueAcht.css";

const API_URL = "http://localhost:3000";

export default function HistoriqueAcht() {
  const [user, setUser] = useState(null);
  const [achats, setAchats] = useState([]);
  const [loading, setLoading] = useState(true);

  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Récupérer le profil
        const profileResponse = await fetch(`${API_URL}/profile`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const profileData = await profileResponse.json();
        setUser(profileData);

        // Récupérer l'historique
        const achatsResponse = await fetch(`${API_URL}/Myachat`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

       const achatsData = await achatsResponse.json();

console.log("Historique reçu :", achatsData);

setAchats(achatsData);
      } catch (error) {
        console.error("Erreur :", error);
      } finally {
        setLoading(false);
      }
    };

    if (token) {
      fetchData();
    }
  }, [token]);

  if (loading) {
    return <p>Chargement...</p>;
  }

  return (
    <div className="profil-container">

      <div className="profil-info">
        <h1>Mon profil</h1>

        {user && (
          <>
            <p><strong>Nom :</strong> {user.name}</p>
            <p><strong>Email :</strong> {user.email}</p>
          </>
        )}
      </div>

      <div className="historique">
        <h2>Historique de mes achats</h2>

        {achats.length === 0 ? (
          <p>Vous n'avez encore effectué aucun achat.</p>
        ) : (
          <div className="achats-list">

            {achats.map((achat) => (
  <div className="achat-card" key={achat._id}>

    <img
      src={achat.ProdactId?.image}
      alt={achat.ProdactId?.name}
    />

    <div>
      <h3>{achat.ProdactId?.name}</h3>

      <p>Quantité : {achat.quantity}</p>

      <p>Pointure : {achat.pointure}</p>

      <p>Téléphone : {achat.phone}</p>

      <p>Adresse : {achat.address}</p>

      <p>Total : {achat.totalPrice} DA</p>
    </div>

  </div>
))}

          </div>
        )}
      </div>

    </div>
  );
}