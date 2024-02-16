import React, { useState } from "react";
import axios from "axios";
import baseUrl from "@/utils/baseUrl";
import LoadingSpinner from "@/utils/LoadingSpinner";
import toast from "react-hot-toast";
import { parseCookies } from "nookies";
import { useRouter } from "next/router";

const RegisterForm = ({
  user: {
    first_name,
    last_name,
    email,
    phone,
    instructor_request,
    email_confirmed,
  },
}) => {
  const INITIAL_REQUEST = {
    name: `${first_name} ${last_name}`,
    email: email,
    phone: phone,
    instructor_subject: "",
    instructor_description: "",
  };

  const router = useRouter();
  const { elarniv_users_token } = parseCookies();

  const [instructor, setInstructor] = useState(INITIAL_REQUEST);
  const [disabled, setDisabled] = React.useState(true);
  const [loading, setLoading] = React.useState(false);

  React.useEffect(() => {
    const isInstructor = Object.values(instructor).every((el) => Boolean(el));
    isInstructor ? setDisabled(false) : setDisabled(true);
  }, [instructor]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setInstructor((prevState) => ({ ...prevState, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const url = `${baseUrl}/api/instructor/new`;
      const payload = { ...instructor };
      const payloadAuth = {
        headers: { Authorization: elarniv_users_token },
      };
      const response = await axios.put(url, payload, payloadAuth);
      toast.success(response.data.message, {
        style: {
          border: "1px solid #b1b459",
          padding: "16px",
          color: "#b1b459",
        },
        iconTheme: {
          primary: "#b1b459",
          secondary: "#FFFAEE",
        },
      });

      router.push("/");
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
          primary: "#b1b459",
          secondary: "#FFFAEE",
        },
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="teacher-register-area ptb-100">
        <div className="container">
          <div className="row align-items-center">
            <div className="col-lg-6">
              <div className="d-none d-lg-block">
                <img src="/images/become-a-instructor.png" alt="instructor" />
              </div>
            </div>

            <div className="col-lg-6">
              <div className="teacher-register-box">
                {!email_confirmed && (
                  <div className="alert alert-danger" role="alert">
                    Veuillez d'abord confirmer votre e-mail.{" "}
                    <a href="/send-confirmation-email">
                      Vous n'avez pas reçu d'e-mail de confirmation ?
                    </a>
                  </div>
                )}

                {instructor_request && (
                  <div className="alert alert-danger" role="alert">
                    Vous avez déjà envoyé une demande, veuillez patienter.
                  </div>
                )}
                <h2>Inscrivez-vous pour devenir instructeur</h2>
                <p>
                  Votre adresse email ne sera pas publiée. Tous les champs sont
                  requis.
                </p>

                <form onSubmit={handleSubmit}>
                  <div className="row">
                    <div className="col-lg-6 col-md-6">
                      <div className="form-group">
                        <input
                          type="text"
                          name="name"
                          placeholder="Votre nom"
                          value={instructor.name}
                          onChange={handleChange}
                        />
                      </div>
                    </div>

                    <div className="col-lg-6 col-md-6">
                      <div className="form-group">
                        <input
                          type="text"
                          name="email"
                          placeholder="Votre adresse email"
                          value={instructor.email}
                          onChange={handleChange}
                        />
                      </div>
                    </div>

                    <div className="col-lg-12 col-md-6">
                      <div className="form-group">
                        <input
                          type="text"
                          name="phone"
                          placeholder="Votre numéro de téléphone"
                          value={instructor.phone}
                          onChange={handleChange}
                        />
                      </div>
                    </div>

                    <div className="col-lg-12 col-md-6">
                      <div className="form-group">
                        <input
                          type="text"
                          name="instructor_subject"
                          placeholder="Votre sujet"
                          value={instructor.instructor_subject}
                          onChange={handleChange}
                        />
                      </div>
                    </div>

                    <div className="col-lg-12 col-md-12">
                      <div className="form-group">
                        <textarea
                          name="instructor_description"
                          cols="30"
                          rows="5"
                          placeholder="Écrivez votre message..."
                          value={instructor.instructor_description}
                          onChange={handleChange}
                        />
                      </div>
                    </div>

                    <div className="col-lg-12 col-sm-12 text-center">
                      <button
                        type="submit"
                        className="default-btn"
                        disabled={
                          disabled || !email_confirmed || instructor_request
                        }
                      >
                        Envoyer la demande
                        {loading ? <LoadingSpinner /> : ""}
                      </button>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default RegisterForm;
