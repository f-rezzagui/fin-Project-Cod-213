import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { MdEmail } from "react-icons/md";
import { RiLockPasswordFill } from "react-icons/ri";
import NavBar from "../NavBar/NavBar";
import "./Login.css";

export default function Login() {
  const [email, setEmail] = useState("");
  const [passeword, setPassword] = useState("");

  const navigate = useNavigate();

  const loginUser = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch("http://localhost:3000/Ligen", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          passeword,
        }),
      });

      const data = await res.json();

      console.log("Réponse login :", data);

      if (data.token) {

       
        localStorage.setItem("token", data.token);

        localStorage.setItem(
          "user",
          JSON.stringify(data.user)
        );

        console.log("Utilisateur connecté :", data.user);
        console.log("Role :", data.user?.role);

       
        if (data.user?.role === "admin") {
          navigate("/admin");
        } else {
          
          navigate("/Home");
        }

        window.location.reload();
      } else {
        alert(data.message || "Erreur de connexion");
      }

    } catch (error) {
      console.error("Erreur login :", error);
      alert("Impossible de contacter le serveur");
    }
  };

  return (
    <div>

      <NavBar />

      <div className="wrapper">

        <div className="form-box login">

          <h1>login</h1>

          <form onSubmit={loginUser}>

            {/* EMAIL */}

            <div className="input-box">

              <span className="icon">
                <MdEmail />
              </span>

              <input
                type="email"
                value={email}
                onChange={(e) =>
                  setEmail(e.target.value)
                }
                required
              />

              <label>Email</label>

            </div>


            {/* PASSWORD */}

            <div className="input-box">

              <span className="icon">
                <RiLockPasswordFill />
              </span>

              <input
                type="password"
                value={passeword}
                onChange={(e) =>
                  setPassword(e.target.value)
                }
                required
              />

              <label>Password</label>

            </div>


            {/* REMEMBER */}

            <div className="remember-forgot">

              <label>
                <input type="checkbox" />
                Remember me
              </label>

              <a href="#">
                Forgot password?
              </a>

            </div>


            {/* LOGIN */}

            <button
              type="submit"
              className="btn"
            >
              login
            </button>


            {/* REGISTER */}

            <div className="login-register">

              <p>
                Don't have an account?{" "}

                <Link
                  to="/Register"
                  className="register-link"
                >
                  Register
                </Link>

              </p>

            </div>

          </form>

        </div>

      </div>

    </div>
  );
}