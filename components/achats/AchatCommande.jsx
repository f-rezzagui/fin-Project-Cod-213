import { useState, useEffect } from "react";
import NavBar from "../NavBar/NavBar";
import "./AchatCommande.css";

const API_URL = "http://localhost:3000";

export default function AchatCommande() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`${API_URL}/achats`)
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setOrders(data);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <>
        <NavBar />
        <h2>Chargement...</h2>
      </>
    );
  }

  const handleDelete = async (id) => {
    try {
      const res = await fetch(`${API_URL}/achats/${id}`, {
        method: "DELETE",
      });

      const data = await res.json();

      if (res.ok) {
        alert(data.message);

        setOrders(orders.filter((order) => order._id !== id));
      } else {
        alert(data.message);
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
  <>
    <NavBar />

    <div className="orders-container">

  <h1 className="orders-title">
    Toutes les commandes
  </h1>

  <div className="orders-grid">

    {orders
      .filter(order => order.ProdactId)
      .map((order) => (

        <div className="order-card" key={order._id}>

          <div className="order-image">
            <img
              src={order.ProdactId.image}
              alt={order.ProdactId.name}
            />
          </div>

          <div className="order-details">

            <h2>{order.ProdactId.name}</h2>

            <p><strong>Catégorie :</strong> {order.ProdactId.category}</p>

            <p className="price">
              {order.ProdactId.prix} DA
            </p>

            <p>{order.ProdactId.description}</p>

            <hr />

            <p><strong>Nom :</strong> {order.nameAchat}</p>
            <p><strong>Téléphone :</strong> {order.phone}</p>
            <p><strong>Adresse :</strong> {order.address}</p>
            <p><strong>Pointure :</strong> {order.pointure}</p>
            <p><strong>Quantité :</strong> {order.quantity}</p>

            <button
              className="delete-btn"
              onClick={() => handleDelete(order._id)}
            >
              Supprimer
            </button>

          </div>

        </div>

      ))}
  </div>

</div>

  </>
);
}
