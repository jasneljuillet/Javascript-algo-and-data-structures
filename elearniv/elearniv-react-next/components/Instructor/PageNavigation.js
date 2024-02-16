import React, { useState, useEffect } from "react";
import Link from "next/link";
import axios from "axios";
import { parseCookies } from "nookies";
import baseUrl from "@/utils/baseUrl";

const PageNavigation = ({ courseId, activeClassname }) => {
  const { elarniv_users_token } = parseCookies();
  const [course, setCourse] = useState({ title: "" });

  useEffect(() => {
    const fetchCourse = async () => {
      const payload = {
        headers: { Authorization: elarniv_users_token },
      };
      const url = `${baseUrl}/api/courses/course/${courseId}`;
      const response = await axios.get(url, payload);
      setCourse({ title: response.data.course.title });
    };

    fetchCourse();
  }, []);

  return <>
    <h2 className="fw-bold mb-4">Title: {course && course.title}</h2>

    <ul className="nav-style1">
      <li>
        <Link href="/instructor/courses/">
          Cours
        </Link>
      </li>
      <li>
        <Link href="/instructor/course/create/">
          Créer un cours
        </Link>
      </li>
      <li>
        <Link
          href={`/instructor/course/edit/${courseId}`}
          className={activeClassname == "edit" ? "active" : ""}>
          
            Modifier le cours
          
        </Link>
      </li>
      <li>
        <Link
          href={`/instructor/course/upload/${courseId}`}
          className={activeClassname == "upload" ? "active" : ""}>
          
            Télécharger une video
          
        </Link>
      </li>
      <li>
        <Link
          href={`/instructor/course/uploads/${courseId}`}
          className={activeClassname == "uploads" ? "active" : ""}>
          
            Vidéos
          
        </Link>
      </li>
      <li>
        <Link
          href={`/instructor/course/assets/${courseId}`}
          className={activeClassname == "assets" ? "active" : ""}>
          
            Actifs
          
        </Link>
      </li>
    </ul>
  </>;
};

export default PageNavigation;
