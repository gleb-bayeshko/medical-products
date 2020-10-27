import { Router } from "express";
import User from "../models/userModel";
import bcrypt from "bcrypt";
import { check, validationResult } from "express-validator";
import { getToken } from "../util";

const router = Router();

router.post(
  "/register",
  [
    check("email", "Invalid email").isEmail(),
    check(
      "password",
      "Invalid password: the minimum password length is 8 characters"
    ).isLength({ min: 8 }),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        errors: errors.array(),
        message: "Invalid data",
      });
    }

    const { name, email, password } = req.body;

    const dupEmail = await User.findOne({ email });

    if (dupEmail) {
      return res
        .status(400)
        .json({ message: "An account with this email already exists!" });
    }

    const hashPassword = await bcrypt.hash(password, 10);

    const user = new User({
      name,
      email,
      password: hashPassword,
      isAdmin: false,
    });

    const newUser = await user.save();

    if (newUser) {
      res.send({
        _id: newUser.id,
        name: newUser.name,
        email: newUser.email,
        isAdmin: newUser.isAdmin,
        token: getToken(newUser),
      });
    } else {
      res.status(401).json({ message: "Invalid data" });
    }
  }
);

router.post(
  "/signin",
  [
    check("email", "Enter valid email").isEmail(),
    check("password", "Enter password").exists(),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(401).json({
        errors: errors.array(),
        message: "Invalid data",
      });
    }

    const { email, password } = req.body;

    if (password === '') {
      return res.status(401).json({ message: "Enter password" });
    }

    const signInUser = await User.findOne({ email });
    let isPasswordsMatch = false;

    if (signInUser) {
      isPasswordsMatch = await bcrypt.compare(password, signInUser.password);
    }

    if (!signInUser || !isPasswordsMatch) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    res.send({
      _id: signInUser.id,
      name: signInUser.name,
      email: signInUser.email,
      isAdmin: signInUser.isAdmin,
      token: getToken(signInUser),
    });
  }
);

router.get("/admincreate", async (req, res) => {
  try {
    const hashPassword = await bcrypt.hash('12345', 10);

    const user = new User({
      name: "Gleb Bayeshko",
      email: "bayeshko_gleb@mail.ru",
      password: hashPassword,
      isAdmin: true,
    });
    const newUser = await user.save();
    res.send(newUser);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

export default router;
