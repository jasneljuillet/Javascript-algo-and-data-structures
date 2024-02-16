import React from "react";
import Link from "next/link";

const CoursesCard = ({
  id,
  title,
  slug,
  short_desc,
  image,
  latest_price,
  before_price,
  lessons,
  is_class,
  user: { first_name, last_name, profile_photo },
  enrolments = [],
  onDelete,
}) => {
  return (
    <div className="col-lg-4 col-md-6">
      <div className="single-courses-box">
        <div className="courses-image">
          {is_class ? (
            (<Link href={`/learning/course/class/${slug}`} className="d-block image">

              <img
                src={image ? image : "/images/courses/courses1.jpg"}
                alt="image"
              />

            </Link>)
          ) : (
            (<Link href={`/course/${slug}`} className="d-block image">

              <img
                src={image ? image : "/images/courses/courses1.jpg"}
                alt="image"
              />

            </Link>)
          )}

          <div className="dropdown action-dropdown">
            <div className="icon">
              <i className="bx bx-dots-vertical-rounded"></i>
            </div>
            <ul className="dropdown-menu">
              <li>
                <Link href={`/instructor/course/edit/${id}`} className="dropdown-item">

                  {" "}
                  <i className="bx bx-edit"></i>Modifier Cours
                </Link>
              </li>
              <li>
                <Link href={`/instructor/course/upload/${id}`} className="dropdown-item">

                  <i className="bx bx-cloud-upload"></i>Télécharger une video
                </Link>
              </li>
              <li>
                <Link href={`/instructor/course/uploads/${id}`} className="dropdown-item">

                  <i className="bx bx-video"></i>Supprimer la vidéo
                </Link>
              </li>
              <li>
                <Link href={`/instructor/course/assets/${id}`} className="dropdown-item">

                  <i className="bx bxs-file-plus"></i>Actifs
                </Link>
              </li>
              <li>
                <button
                  onClick={() => onDelete(id)}
                  type="button"
                  className="dropdown-item"
                >
                  <i className="bx bxs-trash"></i> Supprimer
                </button>
              </li>
            </ul>
          </div>

          <>
            {before_price > 0 && (
              <div className="price shadow discount-price">
                <del>${before_price}</del>
              </div>
            )}
            <div className="price shadow">
              ${latest_price > 0 ? latest_price : "Free"}
            </div>
          </>
        </div>
        <div className="courses-content">
          <div className="course-author d-flex align-items-center">
            <img
              src={profile_photo ? profile_photo : "/images/user1.jpg"}
              className="rounded-circle"
              alt={first_name}
            />
            <span>{`${first_name} ${last_name}`}</span>
          </div>

          <h3>
            {is_class ? (
              <Link href={`/learning/course/class/${slug}`}>
                {title}
              </Link>
            ) : (
              <Link href={`/course/${slug}`}>
                {title}
              </Link>
            )}
          </h3>

          <p>{short_desc}</p>
          <ul className="courses-box-footer d-flex justify-content-between align-items-center">
            <li>
              <i className="flaticon-agenda"></i> {lessons} Leçons
            </li>
            <li>
              <i className="flaticon-people"></i> {enrolments.length} Etudiants
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default CoursesCard;
