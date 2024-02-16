import React, { useState, useEffect } from "react";
import Link from "next/link";
import axios from "axios";
import baseUrl from "@/utils/baseUrl";
import CourseCard from "../Courses/CourseCard";
import { toast } from "react-hot-toast";

const PopularCourses = ({ user }) => {
  const [courses, setCourses] = useState([]);

  const fetchCourses = async () => {
    const payload = {
      params: {
        page: 1,
        limit: 3,
        short: "",
        search: "",
      },
    };

    const response = await axios.get(`${baseUrl}/api/all-courses`, payload);
    setCourses(response.data.courses);
    // console.log(response.data.courses);
  };
  useEffect(() => {
    fetchCourses();
  }, []);

  const handleFav = async (courseId, fav) => {
    if (!user) {
      toast.error("Need to login first.", {
        style: {
          border: "1px solid #ff0033",
          padding: "16px",
          color: "#ff0033",
        },
        iconTheme: {
          primary: "#ff0033",
          secondary: "#FFFAEE",
        },
      });
      return;
    }
    try {
      const payload = {
        userId: user.id,
        courseId: courseId,
        fav: fav,
      };
      const url = `${baseUrl}/api/favourites/new`;
      const response = await axios.post(url, payload);

      toast.success(response.data.message, {
        style: {
          border: "1px solid #42ba96",
          padding: "16px",
          color: "#42ba96",
        },
        iconTheme: {
          primary: "#42ba96",
          secondary: "#ffffff",
        },
      });
    } catch (err) {
      console.log(err.response);
    }
  };

  return <>
    <div className="courses-area ptb-100">
      <div className="container">
        <div className="section-title">
          <span className="sub-title">Apprenez à votre propre rythme</span>
          <h2>Cours populaires</h2>
          <p>
            Explorez tous nos cours et choisissez ceux qui vous conviennent
            pour vous inscrire et commencez à apprendre avec nous ! Nous
            garantissons que vous ne regretterez jamais il!
          </p>
        </div>

        <div className="row">
          {courses &&
            courses.map((course) => (
              <CourseCard
                key={course.id}
                {...course}
                onFav={() => handleFav(course.id, true)}
                onUnFav={() => handleFav(course.id, false)}
                userId={user && user.id}
              />
            ))}

          <div className="col-lg-12 col-md-12">
            <div className="courses-info">
              <p>
                Profitez des méthodes d'apprentissage de premier ordre et
                atteignez le niveau supérieur compétences! Vous êtes le
                créateur de votre propre carrière et nous vous guiderons tu as
                traversé ça.{" "}
                {!user && (
                  <Link href="/authentication">
                    Inscrivez-vous gratuitement maintenant !
                  </Link>
                )}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </>;
};

export default PopularCourses;
