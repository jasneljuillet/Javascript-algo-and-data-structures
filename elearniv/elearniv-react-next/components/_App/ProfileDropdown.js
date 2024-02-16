import React, { useEffect, useState } from "react";
import Link from "@/utils/ActiveLink";
import { handleLogout } from "@/utils/auth";
import { useRouter } from "next/router";

const ProfileDropdown = ({
  userId,
  first_name,
  last_name,
  email,
  role,
  profile_photo,
}) => {
  const isAdmin = role === "admin";
  const isInstructor = role === "instructor";
  const isStudent = role === "student";

  const [currentPath, setCurrentPath] = useState("");
  const router = useRouter();
  // console.log(router.asPath)

  useEffect(() => {
    setCurrentPath(router.asPath);
  }, [router]);

  return (
    <>
      <div className="dropdown profile-dropdown">
        <div className="img ptb-15">
          {profile_photo ? (
            <img src={profile_photo} alt={first_name} />
          ) : (
            <img src="/images/avatar.jpg" alt={first_name} />
          )}
        </div>

        <ul className="dropdown-menu">
          <li>
            <Link href="/profile/basic-information/">
              <a className="dropdown-item author-dropdown-item">
                <div className="d-flex align-items-center">
                  <div className="img">
                    {profile_photo ? (
                      <img src={profile_photo} alt={first_name} />
                    ) : (
                      <img src="/images/avatar.jpg" alt={first_name} />
                    )}
                  </div>

                  <span className="ps-3">
                    <span className="fw-semibold fs-16 mb-1 d-block">
                      {first_name} {""}
                      {last_name}
                    </span>
                    <span className="d-block fs-13 mt-minus-2">{email}</span>
                  </span>
                </div>
              </a>
            </Link>
          </li>

          <li>
            <hr className="dropdown-divider" />
          </li>

          {isInstructor && (
            <>
              <li>
                <Link href="/instructor/courses/">
                  <a
                    className={`dropdown-item ${
                      currentPath == "/instructor/courses/" && "active"
                    }`}
                  >
                    <i className="bx bx-book"></i>
                    Mes cours
                  </a>
                </Link>
              </li>

              <li>
                <Link href="/instructor/course/create/">
                  <a
                    className={`dropdown-item ${
                      currentPath == "/instructor/course/create/" && "active"
                    }`}
                  >
                    <i className="bx bx-folder-plus"></i> Créer un nouveau cours
                  </a>
                </Link>
              </li>
            </>
          )}

          {isAdmin && (
            <li>
              <Link href="/admin/">
                <a
                  className={`dropdown-item ${
                    currentPath == "/admin/" && "active"
                  }`}
                >
                  <i className="bx bxs-dashboard"></i> Mon tableau de bord
                </a>
              </Link>
            </li>
          )}

          <li>
            <Link href="/learning/my-courses/">
              <a
                className={`dropdown-item ${
                  currentPath == "/learning/my-courses/" && "active"
                }`}
              >
                <i className="bx bx-book"></i>
                Mon apprentissage
              </a>
            </Link>
          </li>

          <li>
            <Link href="/learning/my-purchase-history/">
              <a
                className={`dropdown-item ${
                  currentPath == "/learning/my-purchase-history/" && "active"
                }`}
              >
                <i className="bx bx-credit-card-front"></i>
                Mes achats
              </a>
            </Link>
          </li>

          <li>
            <Link href="/learning/wishlist/">
              <a
                className={`dropdown-item ${
                  currentPath == "/learning/wishlist/" && "active"
                }`}
              >
                <i className="bx bxs-heart"></i>
                Liste de souhaits
              </a>
            </Link>
          </li>

          <li>
            <Link href="/profile/basic-information/">
              <a
                className={`dropdown-item ${
                  currentPath == "/profile/basic-information/" && "active"
                }`}
              >
                <i className="bx bxs-user-account"></i> Paramètres du compte
              </a>
            </Link>
          </li>

          <li>
            <hr className="dropdown-divider" />
          </li>

          <li>
            <button
              type="submit"
              onClick={handleLogout}
              className="dropdown-item"
            >
              <i className="bx bx-log-out"></i> Se déconnecter
            </button>
          </li>
        </ul>
      </div>
    </>
  );
};

export default ProfileDropdown;
