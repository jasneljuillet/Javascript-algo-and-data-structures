import React from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { handleLogin } from "@/utils/auth";
import LoadingSpinner from "@/utils/LoadingSpinner";
import baseUrl from "@/utils/baseUrl";
import { useRouter } from "next/router";
import { motion } from "framer-motion";

const INITIAL_USER = {
  first_name: "",
  last_name: "",
  email: "",
  password: "",
};

const RegisterForm = () => {
  const [user, setUser] = React.useState(INITIAL_USER);
  const [disabled, setDisabled] = React.useState(true);
  const [loading, setLoading] = React.useState(false);
  const router = useRouter();

  React.useEffect(() => {
    const isUser = Object.values(user).every((el) => Boolean(el));
    isUser ? setDisabled(false) : setDisabled(true);
  }, [user]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser((prevState) => ({ ...prevState, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const url = `${baseUrl}/api/users/signup`;
      const payload = { ...user };
      const response = await axios.post(url, payload);
      handleLogin(response.data.elarniv_users_token, router);
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
    <>
      <div className="register-form">
        <h2>Enregistrer</h2>

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Prénom</label>
            <input
              type="text"
              className="form-control"
              placeholder="First Name"
              name="first_name"
              value={user.first_name}
              onChange={handleChange}
            />
          </div>
          <div className="form-group">
            <label>Nom</label>
            <input
              type="text"
              className="form-control"
              placeholder="Last Name"
              name="last_name"
              value={user.last_name}
              onChange={handleChange}
            />
          </div>

          <div className="form-group">
            <label>Email</label>
            <input
              type="email"
              className="form-control"
              placeholder="Email"
              name="email"
              value={user.email}
              onChange={handleChange}
            />
          </div>

          <div className="form-group">
            <label>Mot de passe</label>
            <input
              type="password"
              className="form-control"
              placeholder="Password"
              name="password"
              value={user.password}
              onChange={handleChange}
            />
          </div>

          <p className="description">
            Le mot de passe doit comporter au moins huit caractères. Pour le
            faire plus fort, utilisez des lettres majuscules et minuscules, des
            chiffres et des symboles comme ? $ % ^ & )
          </p>

          <motion.button
            type="submit"
            disabled={disabled}
            whileTap={{ scale: 0.9 }}
          >
            Enregistrer
            {loading ? <LoadingSpinner /> : ""}
          </motion.button>
        </form>
      </div>
    </>
  );
};

export default RegisterForm;
