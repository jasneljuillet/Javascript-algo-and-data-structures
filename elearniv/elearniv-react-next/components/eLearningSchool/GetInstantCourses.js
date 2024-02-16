import React from "react";
import Link from "next/link";

const GetInstantCourses = ({ user }) => {
  return <>
    <div className="get-instant-courses-area ptb-100">
      <div className="container">
        <div className="get-instant-courses-inner-area">
          <div className="row align-items-center">
            <div className="col-lg-8 col-md-12">
              <div className="get-instant-courses-content">
                <span className="sub-title">
                  Obtenez un accès instantané au gratuit
                </span>
                <h2>Cours de développement personnel</h2>
                <p>
                  Le cours de développement personnel Hagn peut vous aider à
                  apporter les changements significatifs dans la compréhension
                  personnelle et remodeler la confiance pour tirer le meilleur
                  parti de votre carrière! Nous sommes convaincus que
                  l'apprentissage doit être agréable et seulement cela peut
                  apporter des changements substantiels !
                </p>

                {user ? (
                  (<Link href="/learning/my-courses/" className="default-btn">

                    <i className="flaticon-user"></i>Mes cours{" "}
                    <span></span>

                  </Link>)
                ) : (
                  (<Link href="/authentication" className="default-btn">

                    <i className="flaticon-user"></i>Commencez gratuitement{" "}
                    <span></span>

                  </Link>)
                )}
              </div>
            </div>

            <div className="col-lg-4 col-md-12">
              <div className="get-instant-courses-image">
                <img src="/images/hagn4.jpeg" alt="image" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </>;
};

export default GetInstantCourses;
