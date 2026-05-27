import NavBar from "../components/NavBar";
import "../styles/pages/StaffLogin.css";

function StaffLogin() {
  return (
    <>
      <NavBar cartCount={0} />
      <main className="staff-login container">
        <section className="staff-login__card">
          <h1 className="staff-login__title">Staff Login</h1>
          <p className="staff-login__subtitle">
            Enter your credentials to access the staff dashboard.
          </p>

          <label className="staff-login__label" htmlFor="staff-email">
            Email
          </label>
          <input
            id="staff-email"
            type="email"
            className="staff-login__input"
            placeholder="name@rollingcones.com"
          />

          <label className="staff-login__label" htmlFor="staff-password">
            Password
          </label>
          <input
            id="staff-password"
            type="password"
            className="staff-login__input"
            placeholder="Enter your password"
          />

          <button type="button" className="staff-login__button">
            Login
          </button>
        </section>
      </main>
    </>
  );
}

export default StaffLogin;