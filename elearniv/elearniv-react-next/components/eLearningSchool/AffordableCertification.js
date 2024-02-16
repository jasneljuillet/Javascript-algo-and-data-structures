import React from "react";
import Link from "next/link";

const AffordableCertification = () => {
  return <>
    <div className="premium-access-area ptb-100">
      <div className="container">
        <div className="premium-access-content">
          <span className="sub-title">Certification abordable</span>
          <h2>
            Obtenez votre certificat de compétences qualité grâce à un examen
            en ligne
          </h2>
          <p>
            Des tarifs null pour les étudiants pour les programmes de
            certificat aident aux particuliers d'obtenir leur certificat de
            compétence plus facilement que jamais !
          </p>

          <Link href="#" className="default-btn">

            <i className="flaticon-user"></i>{" "}
            <span>Commencez maintenant</span>

          </Link>
        </div>
      </div>

      <div className="shape3">
        <img src="/images/shape3.png" alt="image" />
      </div>
      <div className="shape4">
        <img src="/images/shape4.png" alt="image" />
      </div>
      <div className="shape8">
        <img src="/images/shape7.png" alt="image" />
      </div>
    </div>
  </>;
};

export default AffordableCertification;
