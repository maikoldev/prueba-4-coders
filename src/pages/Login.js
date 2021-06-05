import React, { useState, useEffect } from "react";

import axios from "axios";

export const Login = ({ history }) => {
  const [activeTab, setActiveTab] = useState("login");
  const [users, setUsers] = useState([]);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [formIsValid, setFormIsValid] = useState(false);

  const { email, password } = formData;

  const handleTab = ({ target }) => {
    setActiveTab(target.dataset.tab);
  };

  const handleChange = ({ target }) => {
    isValid(target);

    setFormData({
      ...formData,
      [target.name]: target.value,
    });
  };

  const isValid = (el) => {
    const val = el.value;
    const name = el.name;

    const emailRules = name === "email" && !val.includes("@");
    const passRules = name === "password" && val.length < 8;

    if (val === "" || passRules || emailRules) {
      el.classList.add("is-invalid");
      el.classList.remove("is-valid");
    } else {
      el.classList.add("is-valid");
      el.classList.remove("is-invalid");
    }
  };

  const hanldeFormSate = () => {
    const emailVal = formData.email;
    const passVal = formData.password;

    const emailRules = emailVal != "" && emailVal.includes("@");
    const passRules = passVal != "" && passVal.length >= 8;

    const isValid = passRules & emailRules ? true : false;
    setFormIsValid(isValid);
  };

  const handleSubmit = () => {
    if (!formIsValid) {
      return;
    }

    history.push("/home");
  };

  const getUsers = () => {
    axios
      .post(`https://core-ve74dbrnra-uc.a.run.app/read-users`)
      .then((res) => {
        const users = res.data;
        setUsers(users);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  useEffect(() => {
    // getUsers();
  }, []);

  useEffect(() => {
    hanldeFormSate();
  });

  return (
    <>
      <div className="container-fluid" id="login">
        <div className="card">
          <div className="card-body">
            <div className="custom-switch-btn mb-3">
              <span
                className={`me-2 ${activeTab === "login" ? "active" : null}`}
                onClick={handleTab}
                data-tab="login"
              >
                Iniciar sesión
              </span>
              <span
                className={`${activeTab === "register" ? "active" : null}`}
                onClick={handleTab}
                data-tab="register"
              >
                Registrarse
              </span>
            </div>

            <div className="text-center">
              <img src="images/LogoHorizontal.png" alt="Logo" width="210px" />
            </div>
            {activeTab === "login" && (
              <form className="mb-5">
                <div className="mb-3">
                  <input
                    type="email"
                    className="form-control"
                    placeholder="Correo Electronico"
                    value={email}
                    name="email"
                    onChange={handleChange}
                  />
                  <span className="invalid-feedback">
                    ¡Este campo es requerido!
                  </span>
                </div>
                <div>
                  <input
                    type="password"
                    className="form-control"
                    placeholder="Contraseña"
                    value={password}
                    name="password"
                    onChange={handleChange}
                  />
                  <span className="invalid-feedback">
                    ¡Este campo es requerido!
                  </span>
                </div>
              </form>
            )}
            {activeTab === "register" && <h2>Registro</h2>}
            <div className="d-flex justify-content-end mb-5">
              <button
                type="button"
                className="btn btn-denim"
                disabled={!formIsValid}
                onClick={handleSubmit}
              >
                {activeTab === "login" && "Ingresar"}
                {activeTab === "register" && "Registro"}
              </button>
            </div>
            <div className="text-center">
              <a href="/" className="fw-light">
                ¿Olvidaste tu contraseña?
              </a>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
