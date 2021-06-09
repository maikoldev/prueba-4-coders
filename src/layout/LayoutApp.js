import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../auth/AuthContext";

export const LayoutApp = ({ children }) => {
  const { user, setUser } = useContext(AuthContext);
  const [toggleSidebar, setToggleSidebar] = useState(false);

  const logOut = () => {
    localStorage.setItem("userData", JSON.stringify({ isLogged: false }));
    setUser({ isLogged: false });
  };

  const handleSidebarToggled = () => {
    setToggleSidebar(!toggleSidebar);
    document.querySelector("body").classList.toggle("sidebar-toggled");
  };

  return (
    <div className="layout-wrap">
      {toggleSidebar && (
        <div className="overlay" onClick={handleSidebarToggled}></div>
      )}
      <div className={`sidebar ${toggleSidebar ? "toggled" : ""}`}>
        <div className="text-center">
          <Link to="/">
            <img
              src="/images/LogoHorizontal.png"
              alt="Logo"
              className="w-auto"
            />
          </Link>
        </div>
        <ul className="nav flex-column">
          <li className="nav-item">
            <a className="nav-link active" aria-current="page" href="/">
              <img
                src="/images/icon-overview.svg"
                width="40"
                alt=""
                className="me-3"
              />
              Vista General
            </a>
          </li>
          <li className="nav-item">
            <a className="nav-link" href="/">
              <img
                src="/images/icon-out-money.svg"
                width="40"
                alt=""
                className="me-3"
              />
              Retirar Dinero
            </a>
          </li>
          <li className="nav-item">
            <a className="nav-link" href="/">
              <img
                src="/images/icon-account.svg"
                width="40"
                alt=""
                className="me-3"
              />
              Mi Cuenta
            </a>
          </li>
          <li className="nav-item">
            <a className="nav-link" href="/">
              <img
                src="/images/icon-settings.svg"
                width="40"
                alt=""
                className="me-3"
              />
              Ajustes
            </a>
          </li>
        </ul>
      </div>
      <div className="content">
        <div className="topbar py-3">
          <button
            className="btn-menu"
            type="button"
            onClick={handleSidebarToggled}
          >
            <svg
              width="25px"
              viewBox="0 -53 384 384"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="m368 154.667969h-352c-8.832031 0-16-7.167969-16-16s7.167969-16 16-16h352c8.832031 0 16 7.167969 16 16s-7.167969 16-16 16zm0 0" />
              <path d="m368 32h-352c-8.832031 0-16-7.167969-16-16s7.167969-16 16-16h352c8.832031 0 16 7.167969 16 16s-7.167969 16-16 16zm0 0" />
              <path d="m368 277.332031h-352c-8.832031 0-16-7.167969-16-16s7.167969-16 16-16h352c8.832031 0 16 7.167969 16 16s-7.167969 16-16 16zm0 0" />
            </svg>
          </button>
          <h1 className="title d-none d-md-block">Vista General</h1>
          <div className="user-options">
            <img
              src="/images/icon-avatar.svg"
              alt="Icono Avatar"
              width="35px"
              className="me-2"
            />
            <div className="user-info">
              <span className="user-name">{user.name}</span>
              <span className="user-email">correo@correo.com</span>
              <a className="logout" role="button" onClick={logOut}>
                Cerrar Sesión
              </a>
            </div>
          </div>
        </div>
        {children}
      </div>
    </div>
  );
};
