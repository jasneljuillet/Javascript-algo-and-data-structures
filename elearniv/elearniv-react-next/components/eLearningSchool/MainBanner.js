import React, { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import BannerCourses from "./BannerCourses";

const MainBanner = ({ user, courses }) => {
  return <>
    <div className="main-banner">
      <div className="container-fluid">
        <div className="row align-items-center">
          <div className="col-lg-6 col-md-12">
            <div className="main-banner-content">
              <h1>Le leader d'Haïti de l'enseignement à distance.</h1>
              <p>
                Des opportunités d'apprentissage flexibles et faciles d'accès
                peuvent apporter un changement significatif dans la façon dont
                les individus préfèrent apprendre !
              </p>

              <motion.div whileTap={{ scale: 0.9 }}>
                {user ? (
                  (<Link href="/courses" className="default-btn">

                    <i className="flaticon-user"></i>Parcourir les cours{" "}
                    <span></span>

                  </Link>)
                ) : (
                  (<Link href="/authentication" className="default-btn">

                    <i className="flaticon-user"></i>Rejoignez gratuitement{" "}
                    <span></span>

                  </Link>)
                )}
              </motion.div>
            </div>
          </div>

          <div className="col-lg-6 col-md-12">
            <div className="main-banner-courses-list">
              <div className="row">
                {courses &&
                  courses.map((course) => (
                    <BannerCourses key={course.id} {...course} />
                  ))}
              </div>

              <div className="banner-shape1">
                <img src="/images/banner-shape1.png" alt="image" />
              </div>
              <div className="banner-shape2">
                <img src="/images/banner-shape2.png" alt="image" />
              </div>
              <div className="banner-shape3">
                <img src="/images/banner-shape3.png" alt="image" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </>;
};

export default MainBanner;
