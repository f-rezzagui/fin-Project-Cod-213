import AdminNavBar from "../NavBar/AdminNavBar";

export default function Admin() {
  return (
    <>
      <AdminNavBar />

      <div className="admin-container">

        <h1>Dashboard Administrateur</h1>

        <p>
          Bienvenue dans votre espace d'administration.
        </p>

      </div>
    </>
  );
}