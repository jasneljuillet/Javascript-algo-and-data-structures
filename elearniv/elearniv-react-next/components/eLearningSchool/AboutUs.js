import React from "react";
import Link from "next/link";

const AboutUs = () => {
  return <>
    <div className="about-area bg-fef8ef ptb-100">
      <div className="container">
        <div className="row align-items-center">
          <div className="col-lg-6 col-md-12">
            <div className="about-image">
              <img src="/images/hagn1.jpg" alt="About" />
            </div>
          </div>

          <div className="col-lg-6 col-md-12">
            <div className="about-content">
              <span className="sub-title">Apprentissage en ligne</span>
              <h2>
                Développez vos compétences, apprenez quelque chose de nouveau
                et développez vos compétences De n'importe où en Haïti!
              </h2>
              <p>
                Nous comprenons mieux que l'apprentissage en ligne peut un
                changement significatif pour toucher des étudiants du monde
                entier ! Donner des options pour mieux apprendre peut toujours
                offrir le meilleur résultats!
              </p>

              <ul className="features-list">
                <li>
                  <span>
                    <i className="flaticon-experience"></i> Formateurs experts
                  </span>
                </li>
                <li>
                  <span>
                    <i className="flaticon-time-left"></i> Accès à vie
                  </span>
                </li>
                <li>
                  <span>
                    <i className="flaticon-tutorials"></i> Apprentissage à
                    distance
                  </span>
                </li>
                <li>
                  <span>
                    <i className="flaticon-self-growth"></i> Développement
                    personnel
                  </span>
                </li>
              </ul>

              <Link href="/courses" className="default-btn">

                <i className="flaticon-user"></i>Voir tous les cours{" "}
                <span></span>

              </Link>
            </div>
          </div>
        </div>
      </div>

      <div className="shape1">
        <img src="/images/shape1.png" alt="image" />
      </div>
      <div className="shape4">
        <img src="/images/shape4.png" alt="image" />
      </div>
    </div>
  </>;
};

export default AboutUs;
