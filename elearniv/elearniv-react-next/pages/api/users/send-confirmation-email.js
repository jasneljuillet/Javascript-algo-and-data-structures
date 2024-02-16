import isEmail from "validator/lib/isEmail";
import User from "database/models/user";
import { confirmEmailAddress } from "email-templates/account-confirmation";

export default async function handler(req, res) {
  switch (req.method) {
    case "POST":
      await userConfirmationEmailSend(req, res);
      break;
    default:
      res.status(405).json({
        message: `Method ${req.method} interdit`,
      });
  }
}

const userConfirmationEmailSend = async (req, res) => {
  let { email } = req.body;
  try {
    if (!isEmail(email)) {
      return res.status(422).json({
        message: "L'e-mail doit être une adresse e-mail valide",
      });
    }

    // Check if user with that email if already exists
    const user = await User.findOne({
      where: { email: email },
    });

    if (user) {
      confirmEmailAddress(user);

      res.status(200).json({
        message: "Veuillez vérifier votre courrier électronique et confirmer.",
      });
    } else {
      res.status(422).json({
        message:
          "L'email n'existe pas ! Veuillez vérifier à nouveau si l'e-mail est correct",
      });
    }
  } catch (e) {
    res.status(400).json({
      error_code: "confirm_email",
      message: e.message,
    });
  }
};
