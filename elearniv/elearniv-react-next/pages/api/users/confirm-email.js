import validate from "uuid-validate";
import User from "database/models/user";

export default async (req, res) => {
  switch (req.method) {
    case "PUT":
      await userEmailConfirm(req, res);
      break;
    default:
      res.status(405).send(`Method ${req.method} interdit`);
  }
};

const userEmailConfirm = async (req, res) => {
  let { token, email } = req.body;
  const validUuid = validate(token);
  try {
    if (!token) {
      return res.status(422).json({
        message:
          "Le jeton attribué est manquant, essayez de cliquer sur le lien exact contenu dans l'e-mail",
      });
    } else if (!validUuid) {
      return res.status(422).json({ message: "Le jeton est incorrect" });
    }

    const user = await User.findOne({
      where: { email: email },
    });

    // console.log(user)

    if (!user) {
      return res.status(422).json({ message: `L'e-mail est incorrect` });
    } else if (user.email_confirmed) {
      return res
        .status(422)
        .send({ message: `L'adresse e-mail est déjà confirmée !` });
    }

    await User.update(
      {
        email_confirmed: true,
        email_confirmed_at: Date.now(),
      },
      {
        where: {
          id: user.id,
        },
      }
    );

    res.status(201).json({
      message: `Adresse e-mail confirmée avec succès. Merci`,
    });
  } catch (error) {
    // console.error(error)
    res.status(400).json({
      error_code: "email_confirmation",
      message: e.message,
    });
  }
};
