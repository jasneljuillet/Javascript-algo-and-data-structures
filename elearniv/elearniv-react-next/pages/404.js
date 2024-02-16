import React from "react";
import Link from "next/link";

const Custom404 = () => {
  return <>
    <div className="error-area">
      <div className="d-table">
        <div className="d-table-cell">
          <div className="container">
            <div className="error-content">
              <img src="/images/error.png" alt="image" />
              <h3>Erreur 404 - Page non trouvée</h3>
              <p>
                La page que vous recherchez aurait pu être supprimée si elle
                le nom a changé ou est temporairement indisponible.
              </p>

              <div className="btn-box">
                <Link href="/" className="default-btn">

                  <i className="flaticon-history"></i>Retourner{" "}
                  <span></span>

                </Link>
                <Link href="/" className="default-btn">

                  <i className="flaticon-home"></i>Page d'Acceuil{" "}
                  <span></span>

                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </>;
};

export default Custom404;
