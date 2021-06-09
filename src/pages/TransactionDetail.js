import React, { useEffect, useState } from "react";
import axios from "axios";

export const TransactionDetail = ({ match }) => {
  const fields = [
    { label: "Nombre Comprador", key: "payerName" },
    { label: "Estatus", key: "paymentStatus" },
    { label: "Referncia Externa", key: "externalReference" },
    { label: "Telefonó Comprador", key: "payerPhone" },
    { label: "Id Negocio", key: "businessId" },
    { label: "Referencia", key: "reference" },
    { label: "Email Comprador", key: "payerEmail" },
    { label: "Descripción", key: "description" },
    { label: "Valor", key: "value" },
    { label: "Comision", key: "realCommision" },
  ];

  const [transactionDetail, setTransactionDetail] = useState({});

  const getTransactionDetail = async () => {
    return new Promise((resolve, reject) => {
      const params = {
        paymentId: match.params.id,
      };

      axios
        .post(
          "https://core-ve74dbrnra-uc.a.run.app/read-payment-details",
          params
        )
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
    getTransactionDetail()
      .then((res) => {
        setTransactionDetail(res.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    <div className="container-fluid">
      <div className="row pt-3">
        <div className="col-12">
          <h3 className="mb-3">Detalle Transacción - {match.params.id}</h3>
          <ul className="list-group">
            {fields.map((field) => (
              <li className="list-group-item" key={field.key}>
                {`${field.label}: ${transactionDetail[field.key]}`}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};
