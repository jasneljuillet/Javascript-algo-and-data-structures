import React, { useEffect, useState } from "react";
import axios from "axios";
import { parseCookies } from "nookies";
import baseUrl from "@/utils/baseUrl";
import LoadingSpinner from "@/utils/LoadingSpinner";
import toast from "react-hot-toast";
import { useRouter } from "next/router";

const INITIAL_VALUE = {
  group_name: "",
  title: "",
  thumb: "",
  video: "",
  video_length: 0.0,
  is_preview: false,
  short_id: 0,
  courseId: "",
};

const UploadVideoForm = ({ courseId }) => {
  const { elarniv_users_token } = parseCookies();
  const [video, setVideo] = useState(INITIAL_VALUE);
  const [disabled, setDisabled] = React.useState(true);
  const [loading, setLoading] = React.useState(false);
  const [thumbPreview, setThumbPreview] = React.useState("");
  const router = useRouter();

  useEffect(() => {
    setVideo((prevState) => ({ ...prevState, courseId }));
  }, []);

  useEffect(() => {
    let { group_name, title, video: video_url, courseId } = video;
    const isVideo = Object.values({
      group_name,
      title,
      video_url,
      courseId,
    }).every((el) => Boolean(el));
    isVideo ? setDisabled(false) : setDisabled(true);
  }, [video]);

  const handleChange = (e) => {
    const { name, value, files } = e.target;

    let fileSize;
    if (name === "thumb") {
      fileSize = files[0].size / 1024 / 1024;
      if (fileSize > 2) {
        toast.error(
          "La taille du pouce est supérieure à 2 Mo. Assurez-vous que moins de 2 Mo.",
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
      setVideo((prevState) => ({
        ...prevState,
        thumb: files[0],
      }));
      setThumbPreview(window.URL.createObjectURL(files[0]));
    } else if (name === "video") {
      fileSize = files[0].size / 1024 / 1024;
      if (fileSize > 5) {
        toast.error(
          "La taille de la vidéo est supérieure à 5 Mo. Assurez-vous que moins de 5 Mo.",
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

      let media = new Audio(window.URL.createObjectURL(files[0]));
      media.onloadedmetadata = function () {
        setVideo((prevState) => ({
          ...prevState,
          video: files[0],
          video_length: media.duration,
        }));
      };
    } else {
      setVideo((prevState) => ({ ...prevState, [name]: value }));
    }
  };

  const handleVideoUpload = async () => {
    const data = new FormData();
    data.append("file", video.video);
    data.append("upload_preset", process.env.UPLOAD_PRESETS);
    data.append("cloud_name", process.env.CLOUD_NAME);
    let response;
    if (video.video) {
      response = await axios.post(process.env.CLOUDINARY_VIDEO_URL, data);
    }

    const mediaUrl = response.data.url;
    return mediaUrl;
  };

  const handleThumbUpload = async () => {
    const data = new FormData();
    data.append("file", video.thumb);
    data.append("upload_preset", process.env.UPLOAD_PRESETS);
    data.append("cloud_name", process.env.CLOUD_NAME);
    let response;
    if (video.thumb) {
      response = await axios.post(process.env.CLOUDINARY_URL, data);
    }

    const imageUrl = response.data.url;

    return imageUrl;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      let videoUrl = "";
      let thumbUrl = "";
      if (video.video) {
        const videoUpload = await handleVideoUpload();
        videoUrl = videoUpload.replace(/^http:\/\//i, "https://");
        const thumbUpload = await handleThumbUpload();
        thumbUrl = thumbUpload.replace(/^http:\/\//i, "https://");
      }

      const {
        group_name,
        title,
        video_length,
        is_preview,
        short_id,
        courseId,
      } = video;

      const payloadData = {
        group_name,
        title,
        thumb: thumbUrl,
        video: videoUrl,
        video_length,
        is_preview,
        short_id,
        courseId,
      };
      const url = `${baseUrl}/api/courses/course/upload/new`;
      const payloadHeader = {
        headers: { Authorization: elarniv_users_token },
      };

      const response = await axios.post(url, payloadData, payloadHeader);

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

      setLoading(false);

      router.push(`/instructor/course/uploads/${courseId}`);
    } catch (err) {
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
            <label className="form-label fw-semibold">
              Titre du groupe vidéo
            </label>
            <input
              type="text"
              className="form-control"
              placeholder="Titre du groupe vidéo"
              name="group_name"
              value={video.group_name}
              onChange={handleChange}
            />
          </div>
        </div>
        <div className="col-md-6">
          <div className="form-group">
            <label className="form-label fw-semibold">Titre de la vidéo</label>
            <input
              type="text"
              className="form-control"
              placeholder="Titre de la vidéo"
              name="title"
              value={video.title}
              onChange={handleChange}
            />
          </div>
        </div>

        <div className="col-md-6">
          <div className="form-group">
            <label className="form-label fw-semibold">
              Sélectionnez une image miniature
            </label>
            <input
              type="file"
              className="form-control file-control"
              name="thumb"
              onChange={handleChange}
              required={true}
            />
            <div className="form-text">
              Téléchargez l'image en taille 1280x720 !
            </div>

            <div className="mt-2">
              <img
                src={
                  thumbPreview ? thumbPreview : "/images/courses/courses15.jpg"
                }
                alt="image"
                className="img-thumbnail w-100px me-2"
              />
            </div>
          </div>
        </div>

        <div className="col-md-6">
          <div className="form-group">
            <label className="form-label fw-semibold">
              Sélectionnez la vidéo
            </label>
            <input
              type="file"
              className="form-control file-control"
              name="video"
              onChange={handleChange}
            />
          </div>
        </div>
        <div className="col-md-6">
          <div className="form-group">
            <label className="form-label fw-semibold">
              Numéro de commande vidéo (croissant)
            </label>
            <input
              type="number"
              className="form-control"
              placeholder="Titre du groupe"
              name="short_id"
              value={video.short_id}
              onChange={handleChange}
            />
          </div>
        </div>
        <div className="col-md-6">
          <div className="form-group">
            <input
              type="checkbox"
              className="form-check-input"
              id="is_preview"
              defaultChecked={video.is_preview}
              onChange={(e) =>
                setVideo((prevState) => ({
                  ...prevState,
                  is_preview: !video.is_preview,
                }))
              }
            />{" "}
            <label className="form-check-label" htmlFor="is_preview">
              Preview Video?
            </label>
          </div>
        </div>

        <div className="col-12">
          <button
            type="submit"
            className="default-btn"
            disabled={loading || disabled}
          >
            <i className="flaticon-right-arrow"></i>
            Télécharger une video <span></span>
            {loading && <LoadingSpinner />}
          </button>
        </div>
      </div>
    </form>
  );
};

export default UploadVideoForm;
