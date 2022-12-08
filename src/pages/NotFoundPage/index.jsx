import React from "react";
import "./style.css";
import nameLogo from "../../assets/queplanta-text-dark.svg";
import leafLogo from "../../assets/logo-queplanta.png";

export function NotFoundPage() {
  return (
    <div className="container">
      <div className="logoContainer">
        <img src={leafLogo} alt="" width={"80px"} />
        <img src={nameLogo} alt="" />
      </div>
      <div className="messageContainer">
        <h1>404</h1>
        <p>Pagina não encontrada</p>
      </div>
      <div className="buttonContainer">
        <button>Voltar para a página inicial</button>
      </div>
    </div>
  );
}
