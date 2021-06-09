import React, { useState, useEffect, useContext } from "react";

import axios from "axios";
import { AuthContext } from "../auth/AuthContext";
import { Alert } from "../components/Alert";

export const Login = ({ history }) => {
  // STATES
  const { setUser } = useContext(AuthContext);

  const [alertData, setAlertData] = useState({
    msg: "",
    variant: "",
  });

  const [activeTab, setActiveTab] = useState("login");

  const [formData, setFormData] = useState({
    name: "Andres",
    password: "bn$}@$Q6gD*4c_hS%V#+:",
  });

  const [isLoading, setIsLoading] = useState(false);

  // METHODS
  const handleChange = ({ target }) => {
    isValid(target);

    setFormData({
      ...formData,
      [target.name]: target.value,
    });
  };

  const handleTab = ({ target }) => {
    setActiveTab(target.dataset.tab);
  };

  const isValid = (el) => {
    const val = el.value;
    const name = el.name;

    const passRules = name === "password" && val.length < 8;

    if (val === "" || passRules) {
      el.classList.add("is-invalid");
      el.classList.remove("is-valid");
    } else {
      el.classList.add("is-valid");
      el.classList.remove("is-invalid");
    }
  };

  const [formIsValid, setFormIsValid] = useState(false);

  const handleFormState = () => {
    const nameVal = formData.name;
    const passVal = formData.password;

    const passRules = passVal !== "" && passVal.length >= 8;
    const isValid = nameVal !== "" && passRules ? true : false;

    setFormIsValid(isValid);
  };

  const handleSubmit = () => {
    if (!formIsValid) {
      return;
    }

    setIsLoading(true);

    getUser()
      .then((res) => {
        const user = res.data[0];

        if (
          user.name === formData.name &&
          user.paswword === formData.password
        ) {
          const userData = {
            name: formData.name,
            password: formData.password,
            isLogged: true,
          };
          localStorage.setItem("userData", JSON.stringify(userData));
          setUser(userData);

          history.push("/dashboard");
        } else {
          setAlertData({ msg: "Usuario no es correcto", variant: "danger" });
        }
      })
      .catch(() => {
        setAlertData({ msg: "Hubo un error", variant: "danger" });
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  const getUser = async () => {
    return new Promise((resolve, reject) => {
      axios
        .post(`https://core-ve74dbrnra-uc.a.run.app/read-users`)
        .then((res) => {
          resolve(res.data);
        })
        .catch((e) => {
          reject(e);
        });
    });
  };

  // EFFECTS
  useEffect(() => {
    handleFormState();
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
                    type="text"
                    className="form-control"
                    placeholder="Usuario"
                    value={formData.name}
                    name="name"
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
                    value={formData.password}
                    name="password"
                    onChange={handleChange}
                  />
                  <span className="invalid-feedback">
                    ¡Este campo es requerido!
                  </span>
                </div>
                {alertData.msg && (
                  <div className="mt-3">
                    <Alert msg={alertData.msg} variant={alertData.variant} />
                  </div>
                )}
              </form>
            )}
            {activeTab === "register" && <h2>Registro</h2>}
            <div className="d-flex justify-content-end mb-5">
              <button
                type="button"
                className="btn btn-denim"
                disabled={!formIsValid || isLoading}
                onClick={handleSubmit}
              >
                {isLoading ? (
                  <span className="spinner-border spinner-border-sm"></span>
                ) : (
                  <>
                    {activeTab === "login" && "Ingresar"}
                    {activeTab === "register" && "Registro"}
                  </>
                )}
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
