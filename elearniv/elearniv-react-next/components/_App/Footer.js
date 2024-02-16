import React from "react";
import Link from "next/link";

const Footer = () => {
  const currentYear = new Date().getFullYear();
  return <>
    <footer className="footer-area">
      <div className="container">
        <div className="row">
          <div className="col-lg-4 col-md-6 col-sm-6">
            <div className="single-footer-widget">
              {/* <Link href="/">
                <a className="logo">
                  <img src="/images/j.png" alt="logo" />
                </a>
              </Link> */}
              <h3 style={{ color: "#b1b459" }}>
                Haiti Adolescent Girls Network
              </h3>
              <p>
                Travaille à apporter des changements significatifs dans
                l'apprentissage en ligne en effectuant des recherches
                approfondies sur la préparation des programmes de cours,
                l'engagement des étudiants et en attendant avec impatience une
                éducation flexible !
              </p>

              <ul className="social-link">
                <li>
                  <a
                    href="https://www.facebook.com/haitiadolescentgirlsnetwork/"
                    className="d-block"
                    target="_blank"
                    rel="noreferrer"
                  >
                    <i className="bx bxl-facebook"></i>
                  </a>
                </li>
                <li>
                  <a
                    href="https://twitter.com/hagnnetwork?t=pThIefBYuZT8oKQ1rkSI0g&s=09/"
                    className="d-block"
                    target="_blank"
                    rel="noreferrer"
                  >
                    <i className="bx bxl-twitter"></i>
                  </a>
                </li>
                <li>
                  <a
                    href="https://www.instagram.com/hagn_haiti/"
                    className="d-block"
                    target="_blank"
                    rel="noreferrer"
                  >
                    <i className="bx bxl-instagram"></i>
                  </a>
                </li>
                <li>
                  <a
                    href="https://www.linkedin.com/in/haiti-adolescent-girls-network-hagn-105aa0299//"
                    className="d-block"
                    target="_blank"
                    rel="noreferrer"
                  >
                    <i className="bx bxl-linkedin"></i>
                  </a>
                </li>
              </ul>
            </div>
          </div>

          <div className="col-lg-2 col-md-6 col-sm-6 offset-lg-1">
            <div className="single-footer-widget">
              <h3>Explore</h3>
              <ul className="footer-links-list">
                <li>
                  <Link href="/">
                    Home
                  </Link>
                </li>
                <li>
                  <Link href="/about-us">
                    À propos de nous
                  </Link>
                </li>
                <li>
                  <Link href="/courses">
                    Cours
                  </Link>
                </li>
                <li>
                  <Link href="/contact-us">
                    Contactez-nous
                  </Link>
                </li>
                <li>
                  <Link href="/faq">
                    FAQ
                  </Link>
                </li>
              </ul>
            </div>
          </div>

          <div className="col-lg-4 col-md-6 col-sm-6">
            <div className="single-footer-widget">
              <h3>Address</h3>
              <ul className="footer-contact-info">
                <li style={{ color: "#606060" }}>
                  <i className="bx bx-map"></i>
                  Complexe Lafayette, Delmas 71, rue Serin No 1 Apt 10
                  Port-au-Prince, Haiti
                </li>
                <li>
                  <i
                    className="bx bx-phone-call"
                    style={{ color: "#606060" }}
                  ></i>
                  <a href="tel:+44587154756">+509 2811 8448</a>
                </li>
                <li>
                  <i
                    className="bx bx-envelope"
                    style={{ color: "#606060" }}
                  ></i>
                  <a href="mailto:haitigirlsnetwork.org">
                    onlinecours@haitigirlsnetwork.org
                  </a>
                </li>
                <li>
                  <i
                    className="bx bxs-inbox"
                    style={{ color: "#606060" }}
                  ></i>
                  <a href="tel:+557854578964">+509 3131-4093</a>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div className="footer-bottom-area">
          <div className="row align-items-center">
            <div className="col-lg-6 col-md-6">
              <p>
                <i
                  className="bx bx-copyright"
                  style={{ color: "#b1b459" }}
                ></i>
                {currentYear} Built with{" "}
                <i className="bx bxs-heart" style={{ color: "##ee4eb0" }}></i>{" "}
                {" by "}
                <a
                  target="_blank"
                  href="https://jasnel.dev/"
                  rel="noreferrer"
                >
                  Jasnel Juillet
                </a>
              </p>
            </div>

            <div className="col-lg-6 col-md-6">
              <ul>
                <li>
                  <Link href="/privacy-policy">
                    politique de confidentialité
                  </Link>
                </li>
                <li>
                  <Link href="/terms-conditions">
                    termes et conditions
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      <div className="lines">
        <div className="line"></div>
        <div className="line"></div>
        <div className="line"></div>
      </div>
    </footer>
  </>;
};

export default Footer;
