import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "../components/Login/Login";
import Register from "../components/Register/Register";
import Home from "../pages/Home/Home";
import Addprodact from "../components/addProduct/addprodact";
import Products from "../components/products/Products";
import ProductDetails from "../components/products/productDetails";
import { CartProvider } from "../components/Carts/CartContext";
import Profil from "../components/profile/Profil";
import EditProfile from "../components/profile/EditProfile";
import AchatCommande from "../components/achats/AchatCommande";
import ProtectedRoute from "../components/ProtectedRoute/ProtectedRoute";
import Cart from "../components/Carts/Cart";
import EditProduct from "../components/products/EditProduct";
import Admin from "../components/admin/Admin";
import AdminDashboard from "../components/admin/AdminDashboard";
import AdminRoute from "../components/admin/AdminRoute";

import "./App.css";


function App() {

  return (

    <div className="body">

      <CartProvider>

        <BrowserRouter>

          <Routes>

            {/* =========================
                UTILISATEURS
            ========================== */}

            <Route
              path="/Register"
              element={<Register />}
            />

            <Route
              path="/Login"
              element={<Login />}
            />

            <Route
              path="/Home"
              element={<Home />}
            />

            <Route
              path="/pordact"
              element={<Products />}
            />

            <Route
              path="/product/:id"
              element={<ProductDetails />}
            />

            <Route
              path="/cart"
              element={<Cart />}
            />


            {/* =========================
                PRODUITS
            ========================== */}

            <Route
              path="/addproduct"
              element={
                <ProtectedRoute>
                  <Addprodact />
                </ProtectedRoute>
              }
            />

            <Route
              path="/products/edit/:id"
              element={
                <ProtectedRoute>
                  <EditProduct />
                </ProtectedRoute>
              }
            />


            {/* =========================
                ACHAT
            ========================== */}

            <Route
              path="/Achat"
              element={<Products />}
            />

            <Route
              path="/commande"
              element={<AchatCommande />}
            />


            {/* =========================
                PROFIL
            ========================== */}

            <Route
              path="/profile"
              element={
                <ProtectedRoute>
                  <Profil />
                </ProtectedRoute>
              }
            />

            <Route
              path="/profile/edit"
              element={
                <ProtectedRoute>
                  <EditProfile />
                </ProtectedRoute>
              }
            />


            {/* =========================
                ADMIN
            ========================== */}

            <Route
              path="/admin"
              element={
                <AdminRoute>
                  <AdminDashboard />
                </AdminRoute>
              }
            />

            <Route
              path="/admin/dashboard"
              element={
                <AdminRoute>
                  <AdminDashboard />
                </AdminRoute>
              }
            />

            <Route
              path="/admin/old"
              element={
                <AdminRoute>
                  <Admin />
                </AdminRoute>
              }
            />

          </Routes>

        </BrowserRouter>

      </CartProvider>

    </div>
  );
}

export default App;