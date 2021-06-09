import React, { useEffect, useState } from "react";
import axios from "axios";

import { Link, useHistory } from "react-router-dom";

export const Dashboard = () => {
  const history = useHistory();

  const [transactions, setTransactions] = useState([]);
  const [totalAmount, setTotalAmount] = useState("");

  const [formData, setFormData] = useState({
    email: "qcristianesteban@gmail.com",
    description: "Pesas de 20Kg.",
    value: "$65.000",
  });

  const months = [
    "Ene",
    "Feb",
    "Mar",
    "Abr",
    "May",
    "Jun",
    "Jul",
    "Ago",
    "Sep",
    "Oct",
    "Nov",
    "Dic",
  ];

  // METHODS
  const handleChange = ({ target }) => {
    setFormData({
      ...formData,
      [target.name]: target.value,
    });
  };

  const getTransactions = async () => {
    return new Promise((resolve, reject) => {
      axios
        .post(`https://core-ve74dbrnra-uc.a.run.app/read-payments`)
        .then((res) => {
          resolve(res.data);
        })
        .catch((e) => {
          reject(e);
        });
    });
  };

  const getTotalAmount = (trans) => {
    let total = 0;

    for (const item of trans) {
      total += item.value;
    }

    const formatTotal = new Intl.NumberFormat("es-CO", {
      style: "currency",
      currency: "COP",
      maximumSignificantDigits: 1,
    }).format(total);

    setTotalAmount(formatTotal);
  };

  const dateColum = (timestamp) => {
    const date = new Date(timestamp._seconds * 1000);
    return `${date.getDate()} ${months[date.getMonth()]} ${date.getFullYear()}`;
  };

  const formatCurrency = (amount) => {
    const formatAmount = new Intl.NumberFormat("es-CO", {
      style: "currency",
      currency: "COP",
      maximumSignificantDigits: 1,
    }).format(amount);
    return formatAmount;
  };

  // EFFECTS
  useEffect(() => {
    getTransactions()
      .then((res) => {
        setTransactions(res.data);
        getTotalAmount(res.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    <div id="overview" className="container-fluid">
      <div className="row pt-3 mb-5">
        <div className="col-12">
          <div className="row">
            <div className="col-12 col-lg-5">
              <div className="balance ">
                <span className="text">Saldo Disponible Actual</span>
                <span className="amount">{totalAmount}</span>
              </div>
            </div>
            <div className="col-12 col-md-8 col-lg-5 col-xxl-4 pt-3 pt-md-0">
              <div className="send-money card">
                <div className="card-body">
                  <h5 className="title">Envíar Dinero</h5>
                  <form>
                    <div>
                      <label className="form-label">Correo Electrónico</label>
                      <input
                        type="email"
                        className="form-control"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                      />
                    </div>
                    <div>
                      <label className="form-label">Descripción</label>
                      <input
                        type="text"
                        className="form-control"
                        name="description"
                        value={formData.description}
                        onChange={handleChange}
                      />
                    </div>
                    <div className="row gx-3">
                      <div className="col-6">
                        <label className="form-label">Valor</label>
                        <input
                          type="text"
                          className="form-control amount"
                          name="value"
                          value={formData.value}
                          onChange={handleChange}
                        />
                      </div>
                      <div className="col-6 d-flex align-items-end">
                        <button type="button" className="btn btn-golden-tainoi">
                          Envíar Ahora!
                        </button>
                      </div>
                    </div>
                  </form>
                </div>
              </div>
            </div>
            <div className="col-12 col-md-4 col-lg-2 col-xxl-3 ps-xxl-5 pt-3 pt-md-0">
              <div className="find-more">
                <a href="https://seti.dev">Descubre más en https://seti.dev</a>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="row">
        <div className="col-12">
          <div className="card">
            <div className="card-body p-4">
              <h5 className="title">Últimas Transacciones</h5>
              <div className="table-responsive">
                <table className="table table-hover">
                  <thead>
                    <tr>
                      <th scope="col">ID</th>
                      <th scope="col">Operación</th>
                      <th scope="col">Origen / Destino</th>
                      <th scope="col">Fecha</th>
                      <th scope="col">Monto</th>
                    </tr>
                  </thead>
                  <tbody>
                    {transactions.map((item) => {
                      return (
                        <tr
                          key={item.id}
                          onClick={() =>
                            history.push(`/transaction/${item.id}`)
                          }
                        >
                          <td>
                            <Link to={`/transacion/${item.id}`}>{item.id}</Link>
                          </td>
                          <td className="description">
                            <img src={item.photoUrl} alt="" width="50" />
                            {item.description}
                          </td>
                          <td>{item.payerEmail}</td>
                          <td>{dateColum(item.timestamp)}</td>
                          <td
                            className={`amount ${
                              item.paymentStatus === "APPROVED"
                                ? "aproved"
                                : "rejected"
                            }`}
                          >
                            <span className="me-1">
                              {item.paymentStatus === "APPROVED" ? "+" : "-"}
                            </span>
                            {formatCurrency(item.value)}
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
