import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useCart } from "../Carts/CartContext";
import "./achat.css";

const API_URL = "http://localhost:3000";

export default function Achat() {
  const { id } = useParams();

  const { addToCart, cart } = useCart();

  const [product, setProduct] = useState(null);

  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [phone, setPhone] = useState("");

  const [paint, setPaint] = useState(null);
  const [quantity, setQuantity] = useState(1);

  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);


  const prixUnitaire = product
    ? Number( product.prix || 0)
    : 0;

  const totalPrix = prixUnitaire * quantity;


  useEffect(() => {
    const getProduct = async () => {
      try {
        const res = await fetch(
          `${API_URL}/prodact/${id}`
        );

        const data = await res.json();

        if (!res.ok) {
          throw new Error(
            data.message || "Produit introuvable"
          );
        }

        setProduct(data);

      } catch (error) {
        console.log(error);

        setMessage(
          "Impossible de récupérer le produit."
        );
      }
    };

    getProduct();
  }, [id]);



  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) return;

    const getProfile = async () => {
      try {
        const res = await fetch(
          `${API_URL}/profile`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        const data = await res.json();

        if (!res.ok) {
          throw new Error(
            data.message || "Erreur profil"
          );
        }

        setName(data.name || "");
        setAddress(data.address || "");
        setPhone(data.phone || "");

      } catch (error) {
        console.log(error);
      }
    };

    getProfile();
  }, []);


  const handleSubmit = async (e) => {
    e.preventDefault();

    setMessage("");

    const token = localStorage.getItem("token");

  
    if (!paint) {
      setMessage(
        "Veuillez choisir une pointure."
      );
      return;
    }

   
    if (
      !name.trim() ||
      !address.trim() ||
      !phone.trim()
    ) {
      setMessage(
        "Veuillez compléter vos informations."
      );
      return;
    }

    const data = {
      productId: id,
      quantity: quantity,
      pointure: paint,

      nameAchat: name.trim(),
      address: address.trim(),
      phone: phone.trim(),
    };

    try {
      setLoading(true);

      const headers = {
        "Content-Type": "application/json",
      };

   
      if (token) {
        headers.Authorization =
          `Bearer ${token}`;
      }

      const res = await fetch(
        `${API_URL}/achat`,
        {
          method: "POST",
          headers,
          body: JSON.stringify(data),
        }
      );

      const result = await res.json();

      console.log(
        "Réponse serveur :",
        result
      );

     

      if (res.ok) {

        
        const alreadyInCart = cart.some(
          (item) => item._id === product._id
        );

       
        if (!alreadyInCart) {
          addToCart(product);
        }

        setMessage(
          "Achat effectué avec succès ! Produit ajouté au panier."
        );

        setPaint(null);
        setQuantity(1);

      } else {

        setMessage(
          result.message ||
          "Une erreur est survenue."
        );

      }

    } catch (error) {

      console.log(error);

      setMessage(
        "Erreur de connexion au serveur."
      );

    } finally {

      setLoading(false);

    }
  };

  if (!product) {
    return (
      <div className="achat-container">
        <h2>Chargement...</h2>
      </div>
    );
  }

  return (
    <div className="achat-container">


      <div className="product-info">

        <h2 className="product-name">
          {product.name}
        </h2>

        <p className="product-price">
          Prix :{" "}
          {product.prix || product.price} DA
        </p>


        <div className="counter">

          <button
            type="button"
            onClick={() => {
              if (quantity > 1) {
                setQuantity(quantity - 1);
              }
            }}
          >
            -
          </button>

          <span>
            {quantity}
          </span>

          <button
            type="button"
            onClick={() =>
              setQuantity(quantity + 1)
            }
          >
            +
          </button>

        </div>

        <h2 className="total">
          Total : {totalPrix} DA
        </h2>

      </div>


  

      <div className="user-info">

        <h3>
          Informations de livraison
        </h3>

        <label>Nom</label>

        <input
          type="text"
          value={name}
          onChange={(e) =>
            setName(e.target.value)
          }
          placeholder="Votre nom"
          required
        />


        <label>Adresse</label>

        <input
          type="text"
          value={address}
          onChange={(e) =>
            setAddress(e.target.value)
          }
          placeholder="Votre adresse"
          required
        />


        <label>Téléphone</label>

        <input
          type="tel"
          value={phone}
          onChange={(e) =>
            setPhone(e.target.value)
          }
          placeholder="0550123456"
          required
        />

      </div>


     

      {message && (
        <div className="message">
          {message}
        </div>
      )}


  

      <form
        className="achat-form"
        onSubmit={handleSubmit}
      >

        <h3>
          Choisir la pointure
        </h3>




        <div className="pointure">

          {[38, 39, 40, 41, 42].map(
            (size) => (
              <button
                key={size}
                type="button"
                className={
                  paint === size
                    ? "active"
                    : ""
                }
                onClick={() =>
                  setPaint(size)
                }
              >
                {size}
              </button>
            )
          )}

        </div>


        <p className="selected-size">
          Pointure :{" "}
          {paint || "Aucune"}
        </p>


        {/* VALIDER */}

        <button
          className="submit-btn"
          type="submit"
          disabled={loading}
        >
          {loading
            ? "Traitement..."
            : "Valider l'achat"}
        </button>

      </form>

    </div>
  );
}