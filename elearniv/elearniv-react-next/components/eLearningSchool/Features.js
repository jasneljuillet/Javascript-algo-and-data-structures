import React from "react";
import Link from "next/link";

const Features = () => {
  return (
    <>
      <div className="features-area pt-100 pb-70">
        <div className="container">
          <div className="section-title">
            <span className="sub-title">Une éducation pour tous</span>
            <h2>Cours en ligne abordables et opportunités d'apprentissage​</h2>
            <p>
              Trouver votre propre espace et utiliser de meilleures options
              d'apprentissage peut résultat plus rapide que les méthodes
              traditionnelles. Profitez de la beauté avec HAGN!
            </p>
          </div>

          <div className="row justify-content-center">
            <div className="col-lg-4 col-sm-6 col-md-6">
              <div className="single-features-box">
                <div className="icon">
                  <i className="flaticon-brain-process"></i>
                </div>
                <h3>Apprenez les dernières compétences</h3>
                <p>
                  L'acquisition des meilleures compétences peut apporter un
                  résultat extraordinaire dans un carrière.
                </p>
              </div>
            </div>

            <div className="col-lg-4 col-sm-6 col-md-6">
              <div className="single-features-box">
                <div className="icon">
                  <i className="flaticon-computer"></i>
                </div>
                <h3>Apprenez à votre rythme</h3>
                <p>
                  Chacun préfère apprendre à son rythme et cela donne un
                  excellent résultat.
                </p>
              </div>
            </div>

            <div className="col-lg-4 col-sm-6 col-md-6">
              <div className="single-features-box">
                <div className="icon">
                  <i className="flaticon-shield-1"></i>
                </div>
                <h3>Apprenez des experts du secteur</h3>
                <p>
                  Les enseignants expérimentés peuvent vous aider à apprendre
                  plus rapidement avec leur meilleures approches!
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Features;
