import React from "react";
import Link from "next/link";

const ViewAllCourses = () => {
  return <>
    <div className="view-all-courses-area ptb-100 bg-F6F1ED">
      <div className="container">
        <div className="row align-items-center">
          <div className="col-lg-6 col-md-12">
            <div className="view-all-courses-content">
              <span className="sub-title">Apprentissage à distance</span>
              <h2>
                Vous avez l'impression qu'il vous manque quelque chose ?
              </h2>
              <p>
                Les programmes de formation d'Hagn peuvent vous apporter une
                expérience super passionnante expérience d'apprentissage en
                ligne ! Tu n'en fais jamais face expérience négative tout en
                profitant virtuellement de vos cours en assis dans votre zone
                de confort. Notre apprentissage flexible initiatives vous
                aideront à apprendre mieux et plus rapidement que les méthodes
                traditionnelles d’apprentissage.
              </p>

              <Link href="/learning/wishlist/" className="default-btn">

                <i className="flaticon-agenda"></i>Consulter ma liste de
                                    souhaits<span></span>

              </Link>
            </div>
          </div>

          <div className="col-lg-6 col-md-12">
            <div className="view-all-courses-image">
              <img src="/images/man-with-laptop.png" alt="image" />
            </div>
          </div>
        </div>
      </div>

      <div className="shape1">
        <img src="/images/shape1.png" alt="image" />
      </div>
      <div className="shape9">
        <img src="/images/shape8.svg" alt="image" />
      </div>
    </div>
  </>;
};

export default ViewAllCourses;
