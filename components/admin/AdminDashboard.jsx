import React from "react";

import AdminNavBar from "../NavBar/AdminNavBar";

import "./AdminDashboard.css";

export default function AdminDashboard() {

  return (

    <>

      <AdminNavBar />

      <main className="admin-dashboard">

        <h1>
          Dashboard Administrateur
        </h1>

        <p>
          Bienvenue dans votre espace administrateur.
        </p>


        <div className="admin-cards">

          <div className="admin-card">

            <h2>📦</h2>

            <h3>Produits</h3>

            <p>
              Gestion des produits
            </p>

          </div>


          <div className="admin-card">

            <h2>🛒</h2>

            <h3>Commandes</h3>

            <p>
              Gestion des commandes
            </p>

          </div>


          <div className="admin-card">

            <h2>👥</h2>

            <h3>Utilisateurs</h3>

            <p>
              Gestion des utilisateurs
            </p>

          </div>

        </div>

      </main>

    </>

  );
}