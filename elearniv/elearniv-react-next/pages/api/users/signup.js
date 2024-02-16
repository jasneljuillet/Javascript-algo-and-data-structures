import bcrypt from "bcrypt";
import { v4 as uuidv4 } from "uuid";
import jwt from "jsonwebtoken";
import isEmail from "validator/lib/isEmail";
import isLength from "validator/lib/isLength";

import User from "database/models/user";

import { confirmEmailAddress } from "email-templates/account-confirmation";

export default async function handler(req, res) {
  switch (req.method) {
    case "POST":
      await userSignup(req, res);
      break;
    default:
      res.status(405).json({
        message: `Method ${req.method} interdit`,
      });
  }
}

const userSignup = async (req, res) => {
  const confirmToken = uuidv4();
  let { first_name, last_name, email, password } = req.body;
  try {
    if (!isLength(first_name, { min: 3 })) {
      return res.status(422).json({
        message: "Le prénom doit comporter au minimum trois caractères",
      });
    } else if (!isLength(last_name, { min: 3 })) {
      return res.status(422).json({
        message: "Le nom de famille doit comporter au moins trois caractères",
      });
    } else if (!isEmail(email)) {
      return res
        .status(422)
        .json({ message: "L'e-mail doit être une adresse e-mail valide" });
    } else if (!isLength(password, { min: 6 })) {
      return res.status(422).json({
        message: "Le mot de passe doit comporter au moins six caractères",
      });
    }

    // Check if user with that email if already exists
    const user = await User.findOne({
      where: { email: email },
    });

    if (user) {
      return res.status(422).json({
        message: `L'utilisateur existe déjà avec une adresse e-mail ${email}`,
      });
    }

    // Encrypt password with bcrypt
    const passwordHash = await bcrypt.hash(password, 10);

    const newUser = await User.create({
      first_name,
      last_name,
      email,
      password: passwordHash,
      reset_password_token: confirmToken,
      reset_password_send_at: Date.now(),
    });

    confirmEmailAddress(newUser);

    const elarniv_users_token = jwt.sign(
      {
        userId: newUser.id,
        first_name: newUser.first_name,
        last_name: newUser.last_name,
        email: newUser.email,
        role: newUser.role,
        profile_photo: newUser.profile_photo,
      },
      process.env.JWT_SECRET,
      {
        expiresIn: "7d",
      }
    );

    res.status(200).json({
      message: "Inscription réussi!",
      elarniv_users_token,
    });
  } catch (e) {
    res.status(400).json({
      error_code: "create_user",
      message: e.message,
    });
  }
};
