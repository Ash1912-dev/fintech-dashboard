import { NavLink } from "react-router-dom";

export default function Navbar() {
  return (
    <nav className="navbar" id="navbar">
      <span className="navbar__brand">FinFlow</span>
      <ul className="navbar__links">
        <li>
          <NavLink
            to="/"
            end
            className={({ isActive }) =>
              `navbar__link${isActive ? " active" : ""}`
            }
            id="nav-dashboard"
          >
            Dashboard
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/transactions"
            className={({ isActive }) =>
              `navbar__link${isActive ? " active" : ""}`
            }
            id="nav-transactions"
          >
            Transactions
          </NavLink>
        </li>
      </ul>
    </nav>
  );
}
