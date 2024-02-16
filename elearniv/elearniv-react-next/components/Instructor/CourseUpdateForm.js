import React, { useState, useEffect } from "react";
import controls from "@/utils/RTEControl";
import dynamic from "next/dynamic";
const RichTextEditor = dynamic(() => import("@mantine/rte"), {
  ssr: false,
  loading: () => null,
});

import axios from "axios";
import { parseCookies } from "nookies";
import baseUrl from "@/utils/baseUrl";
import LoadingSpinner from "@/utils/LoadingSpinner";
import toast from "react-hot-toast";
import { useRouter } from "next/router";

const INITIAL_VALUE = {
  title: "",
  short_desc: "",
  overview: "",
  latest_price: "",
  before_price: "",
  lessons: "",
  duration: "",
  image: "",
  access_time: "",
  requirements: "",
  what_you_will_learn: "",
  who_is_this_course_for: "",
  catId: "",
};

const CourseUpdateForm = ({ courseData }) => {
  const { elarniv_users_token } = parseCookies();
  const [course, setCourse] = useState(INITIAL_VALUE);
  const [disabled, setDisabled] = React.useState(true);
  const [loading, setLoading] = React.useState(false);
  const [categories, setCategories] = useState([]);
  const [imagePreview, setImagePreview] = React.useState("");
  const router = useRouter();

  useEffect(() => {
    const {
      title,
      short_desc,
      overview,
      latest_price,
      before_price,
      lessons,
      duration,
      image,
      access_time,
      requirements,
      what_you_will_learn,
      who_is_this_course_for,
      catId,
    } = courseData;
    setCourse({
      title,
      short_desc,
      overview,
      latest_price,
      before_price,
      lessons,
      duration,
      image,
      access_time,
      requirements,
      what_you_will_learn,
      who_is_this_course_for,
      catId,
    });
    // console.log(courseData);
  }, [courseData]);

  useEffect(() => {
    const isCourse = Object.values(course).every((el) => Boolean(el));
    isCourse ? setDisabled(false) : setDisabled(true);
  }, [course]);

  useEffect(() => {
    const fetchData = async () => {
      const payload = {
        headers: { Authorization: elarniv_users_token },
      };
      const response = await axios.get(`${baseUrl}/api/categories`, payload);
      setCategories(response.data.categories);
    };
    fetchData();
  }, []);

  const handleChange = (e) => {
    const { name, value, files } = e.target;

    if (name === "image") {
      const image = files[0].size / 1024 / 1024;
      if (image > 2) {
        toast.error(
          "La taille de la photo est supérieure à 2 Mo. Assurez-vous que moins de 2 Mo.",
          {
            style: {
              border: "1px solid #ff0033",
              padding: "16px",
              color: "#ff0033",
            },
            iconTheme: {
              primary: "#ff0033",
              secondary: "#FFFAEE",
            },
          }
        );
        e.target.value = null;
        return;
      }
      setCourse((prevState) => ({
        ...prevState,
        image: files[0],
      }));
      setImagePreview(window.URL.createObjectURL(files[0]));
    } else {
      setCourse((prevState) => ({ ...prevState, [name]: value }));
    }
  };

  const handleImageUpload = async () => {
    const data = new FormData();
    data.append("file", course.image);
    data.append("upload_preset", process.env.UPLOAD_PRESETS);
    data.append("cloud_name", process.env.CLOUD_NAME);
    let response;
    if (course.image) {
      response = await axios.post(process.env.CLOUDINARY_URL, data);
    }
    const imageUrl = response.data.url;

    return imageUrl;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      let photo;
      if (course.image) {
        photo = await handleImageUpload();

        photo = photo.replace(/^http:\/\//i, "https://");
      }

      const {
        title,
        short_desc,
        overview,
        latest_price,
        before_price,
        lessons,
        duration,
        access_time,
        requirements,
        what_you_will_learn,
        who_is_this_course_for,
        catId,
      } = course;
      const payloadData = {
        title,
        short_desc,
        overview,
        latest_price,
        before_price,
        lessons,
        duration,
        image: photo,
        access_time,
        requirements,
        what_you_will_learn,
        who_is_this_course_for,
        catId,
      };

      const payloadHeader = {
        headers: { Authorization: elarniv_users_token },
      };

      const url = `${baseUrl}/api/courses/course/${courseData.id}`;
      const response = await axios.put(url, payloadData, payloadHeader);
      setLoading(false);

      toast.success(response.data.message, {
        style: {
          border: "1px solid #4BB543",
          padding: "16px",
          color: "#4BB543",
        },
        iconTheme: {
          primary: "#4BB543",
          secondary: "#FFFAEE",
        },
      });

      router.push(`/instructor/courses`);
    } catch (err) {
      // console.log(err);
      let {
        response: {
          data: { message },
        },
      } = err;
      toast.error(message, {
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
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="row">
        <div className="col-md-6">
          <div className="form-group">
            <label className="form-label fw-semibold">Titre de cours</label>
            <input
              type="text"
              className="form-control"
              placeholder="Titre de cours"
              name="title"
              value={course.title}
              onChange={handleChange}
            />
          </div>
        </div>

        <div className="col-md-6">
          <div className="form-group">
            <label className="form-label fw-semibold">Leçons</label>
            <input
              type="number"
              className="form-control"
              placeholder="5"
              name="lessons"
              value={course.lessons}
              onChange={handleChange}
            />
          </div>
        </div>

        <div className="col-md-6">
          <div className="form-group">
            <label className="form-label fw-semibold">Dernier prix</label>
            <input
              type="number"
              className="form-control"
              placeholder="29.99"
              aria-describedby="latest_price_help"
              name="latest_price"
              value={course.latest_price}
              onChange={handleChange}
            />
            <div id="latest_price_help" className="form-text">
              Le dernier prix s'affichera comme prix du cours.
            </div>
          </div>
        </div>

        <div className="col-md-6">
          <div className="form-group">
            <label className="form-label fw-semibold">Prix ​​habituel</label>
            <input
              type="number"
              className="form-control"
              placeholder="49.99"
              aria-describedby="before_price_help"
              name="before_price"
              value={course.before_price}
              onChange={handleChange}
            />
            <div id="before_price_help" className="form-text">
              Le prix régulier s'affichera comme ceci <del>49.99</del>.
            </div>
          </div>
        </div>

        <div className="col-md-6">
          <div className="form-group">
            <label className="form-label fw-semibold">Durée</label>
            <input
              type="text"
              className="form-control"
              placeholder="4 Heures ou 2 semaines"
              name="duration"
              value={course.duration}
              onChange={handleChange}
            />
          </div>
        </div>

        <div className="col-md-6">
          <div className="form-group">
            <label className="form-label fw-semibold">Temps d'accès</label>
            <select
              className="form-select"
              name="access_time"
              value={course.access_time}
              onChange={handleChange}
            >
              <option value="">Sélectionner</option>
              <option value="Lifetime">Garantie à vie</option>
              <option value="Three Months">Trois Mois</option>
              <option value="Six Months">Six Mois</option>
              <option value="1 Year">1 an</option>
            </select>
          </div>
        </div>

        <div className="col-md-6">
          <div className="form-group">
            <label className="form-label fw-semibold">Image du cours</label>
            <input
              type="file"
              className="form-control file-control"
              name="image"
              onChange={handleChange}
            />
            <div className="form-text">
              Téléchargez l'image au format 750x500 !
            </div>

            <div className="mt-2">
              <img
                src={imagePreview ? imagePreview : course.image}
                alt="image"
                className="img-thumbnail w-100px me-2"
              />
            </div>
          </div>
        </div>

        <div className="col-md-6">
          <div className="form-group">
            <label className="form-label fw-semibold">Catégorie de cours</label>
            <select
              className="form-select"
              name="catId"
              value={course.catId}
              onChange={handleChange}
            >
              <option value="">Select</option>
              {categories.length > 0 &&
                categories.map((cat) => (
                  <option key={cat.id} value={cat.id}>
                    {cat.name}
                  </option>
                ))}
            </select>
          </div>
        </div>

        <div className="col-md-12">
          <div className="form-group">
            <label className="form-label fw-semibold">Brève description</label>
            <textarea
              className="form-control"
              name="short_desc"
              value={course.short_desc}
              onChange={handleChange}
            />
            <div className="form-text">
              La description mettra en évidence toutes les zones disponibles.
            </div>
          </div>
        </div>

        <div className="col-md-6">
          <div className="form-group">
            <label className="form-label fw-semibold">Aperçu</label>
            <RichTextEditor
              controls={controls}
              value={course.overview}
              onChange={(e) =>
                setCourse((prevState) => ({
                  ...prevState,
                  overview: e,
                }))
              }
            />
          </div>
        </div>
        <div className="col-md-6">
          <div className="form-group">
            <label className="form-label fw-semibold">Exigences</label>
            <RichTextEditor
              controls={controls}
              value={course.requirements}
              onChange={(e) =>
                setCourse((prevState) => ({
                  ...prevState,
                  requirements: e,
                }))
              }
            />
          </div>
        </div>
        <div className="col-md-6">
          <div className="form-group">
            <label className="form-label fw-semibold">
              Ce que vous apprendrez
            </label>
            <RichTextEditor
              controls={controls}
              value={course.what_you_will_learn}
              onChange={(e) =>
                setCourse((prevState) => ({
                  ...prevState,
                  what_you_will_learn: e,
                }))
              }
            />
          </div>
        </div>
        <div className="col-md-6">
          <div className="form-group">
            <label className="form-label fw-semibold">
              A qui est destiné ce cours?
            </label>
            <RichTextEditor
              controls={controls}
              value={course.who_is_this_course_for}
              onChange={(e) =>
                setCourse((prevState) => ({
                  ...prevState,
                  who_is_this_course_for: e,
                }))
              }
            />
          </div>
        </div>

        <div className="col-12">
          <button type="submit" className="default-btn" disabled={disabled}>
            <i className="flaticon-right-arrow"></i>
            Créer un cours <span></span>
            {loading ? <LoadingSpinner /> : ""}
          </button>
        </div>
      </div>
    </form>
  );
};

export default CourseUpdateForm;
