import Link from "next/link";
import { FaUserAlt, FaLock } from "react-icons/fa";
import "./page.css";

export default function loginPage() {
  return (
    <>
      <h1 className="font-bold">LOGIN PAGE</h1>
      <br></br>
      <Link href="/">Return Home page</Link>
      <br></br>
      <br></br>
      <div className="login-form">
        {/* onSubmit={""} */}
        <form>
          <h1>Movie Island</h1>

          <div className="input-box">
            <input
              type="email"
              id="email"
              placeholder="Email"
              autoComplete="email"
              //onChange={(e) => setEmail(e.target.value)}
              value={"test@gmail.com"}
              //className={errors?.email ? "input-error" : ""}
              required
            />

            <FaUserAlt className="icon" />

            {/* {errors?.email && (
              <span className="error-message">{errors.email}</span>
            )} */}
          </div>

          <div className="input-box">
            <input
              type="password"
              id="password"
              placeholder="Mot de passe"
              autoComplete="current-password"
              //onChange={(e) => setPassword(e.target.value)}
              value={123}
              //className={errors?.password ? "input-error" : ""}
              required
            />

            <FaLock className="icon" />

            {/* {errors?.password && (
              <span className="error-message">{errors.password}</span>
            )} */}
          </div>

          <button type="submit">Se connecter</button>

          <div className="register-link">
            <br></br>
            <hr />
            <br></br>
            <p>
              Pas de compte ?&nbsp;<a href="/registrer">Inscrivez-vous ici</a>
            </p>
            <p>
              Mot de passe oublié ?&nbsp;
              <a href="/resetPassword">Réinitialiser</a>
            </p>
          </div>
        </form>
      </div>
      ;
    </>
  );
}
