import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import NavBar from "../NavBar/NavBar";

const API_URL = "http://localhost:3000";

function Order() {
  const [order, setOrder] = useState(null);

  useEffect(() => {
    console.log()
    fetch(`${API_URL}/achats`)
      .then((res) => res.json())
      .then((data) => setOrder(data))
      .catch((err) => console.log(err));
  }, []);

  if (!order) return <h2>Chargement...</h2>;

  return (
    <div>
      <NavBar />

      <div>
        <img
          src={order.productID.image}
          alt={order.productID.name}
          width="300"
        />

        <h1>{order.productID.name}</h1>
        <p>Catégorie : {order.productID.category}</p>
        <p>Prix : {order.productID.prix} DA</p>
        <p>{order.productID.description}</p>
      </div>

      <div>
        <h2>Acheteur</h2>
        <p>Nom : {order.achatID.nameAchat}</p>
        <p>Téléphone : {order.achatID.phone}</p>
        <p>Adresse : {order.achatID.address}</p>
        <p>Pointure : {order.achatID.pointure}</p>
        <p>Statut : {order.status}</p>
      </div>
    </div>
  );
}

export default Order;