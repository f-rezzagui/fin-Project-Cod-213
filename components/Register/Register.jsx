
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { MdEmail } from "react-icons/md";
import { RiLockPasswordFill } from "react-icons/ri";
import { IoPersonSharp } from "react-icons/io5";
import NavBar from "../NavBar/NavBar";
import "./Register.css";

export default function Register() {
  const [name, setName] = useState("");
  const [firstname, setFirstname] = useState("");
  const [email, setEmail] = useState("");
  const [passeword, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const navigate = useNavigate();

  const loginUser = async (e) => {
    e.preventDefault();

    // Vérifier les mots de passe
    if (passeword !== confirmPassword) {
      alert("Les mots de passe ne correspondent pas.");
      return;
    }

    try {
      const res = await fetch("http://localhost:3000/Regin", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          firstname,
          email,
          passeword,
        }),
      });

      const data = await res.json();

      console.log(data);

      if (res.ok && data.user?.email) {
        alert("Compte créé avec succès !");

        // Redirection vers Login
        navigate("/Login");
      } else {
        alert(data.message || "Erreur lors de la création du compte.");
      }
    } catch (error) {
      console.error(error);
      alert("Impossible de contacter le serveur.");
    }
  };

  return (
    <div>
      <NavBar />

      <div className="wrappers">
        <div className="form-box login">

          <h1>Register</h1>

          <form onSubmit={loginUser}>

            {/* NAME */}
            <div className="input-boxx">
              <span className="icons">
                <IoPersonSharp />
              </span>

              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />

              <label>Name</label>
            </div>

            {/* FIRST NAME */}
            <div className="input-boxx">
              <span className="icons">
                <IoPersonSharp />
              </span>

              <input
                type="text"
                value={firstname}
                onChange={(e) => setFirstname(e.target.value)}
                required
              />

              <label>First name</label>
            </div>

            {/* EMAIL */}
            <div className="input-boxx">
              <span className="icons">
                <MdEmail />
              </span>

              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />

              <label>Email</label>
            </div>

            {/* PASSWORD */}
            <div className="input-boxx">
              <span className="icons">
                <RiLockPasswordFill />
              </span>

              <input
                type="password"
                value={passeword}
                onChange={(e) => setPassword(e.target.value)}
                required
              />

              <label>Password</label>
            </div>

            {/* CONFIRM PASSWORD */}
            <div className="input-boxx">
              <span className="icons">
                <RiLockPasswordFill />
              </span>

              <input
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
              />

              <label>Confirm Password</label>
            </div>

            {/* TERMS */}
            <div className="remember-forgots">
              <label>
                <input type="checkbox" required />

                <span>
                  I have read and agree to Terms of Use and understand
                </span>
              </label>
            </div>

            {/* BUTTON */}
            <button type="submit" className="btns">
              CREATE ACCOUNT
            </button>

            {/* CONDITIONS */}
            <div className="login-registers">
              <p>
                By creating an account you agree to our
                <a href="#" className="register-link">
                  Conditions
                </a>
              </p>
            </div>

          </form>
        </div>
      </div>
    </div>
  );
}
