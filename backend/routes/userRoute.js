import { Router } from "express";
import User from "../models/userModel";
import bcrypt from "bcrypt";
import { check, validationResult } from "express-validator";
import { getToken, isAuth } from "../util";

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
      return res.status(401).send(
        errors
          .array()
          .map((current) => current.msg)
          .join("/n")
      );
    }

    const { name, email, password } = req.body;

    if (!name) {
      return res.status(400).send("Name field is required");
    }

    const dupEmail = await User.findOne({ email });

    if (dupEmail) {
      return res.status(400).send("An account with this email already exists");
    }

    const hashPassword = await bcrypt.hash(password, 10);

    const user = new User({
      name,
      email,
      password: hashPassword,
      avatar: "/uploads/profile-img-empty.png",
      isAdmin: false,
    });

    const newUser = await user.save();

    if (newUser) {
      res.send({
        _id: newUser.id,
        name: newUser.name,
        secondName: newUser.secondName || "",
        country: newUser.country || "",
        city: newUser.city || "",
        sex: newUser.sex || "",
        avatar: newUser.avatar || "",
        email: newUser.email,
        isAdmin: newUser.isAdmin,
        cart: newUser.cart || [],
        token: getToken(newUser),
      });
    } else {
      res.status(401).send("Invalid data");
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
      return res.status(401).send(
        errors
          .array()
          .map((current) => current.msg)
          .join("/n")
      );
    }

    const { email, password } = req.body;

    if (password === "") {
      return res.status(401).send("Enter password");
    }

    const signInUser = await User.findOne({ email });
    let isPasswordsMatch = false;

    if (signInUser) {
      isPasswordsMatch = await bcrypt.compare(password, signInUser.password);
    }

    if (!signInUser || !isPasswordsMatch) {
      return res.status(401).send("Invalid email or password");
    }

    res.send({
      _id: signInUser.id,
      name: signInUser.name,
      secondName: signInUser.secondName || "",
      country: signInUser.country || "",
      city: signInUser.city || "",
      sex: signInUser.sex || "",
      avatar: signInUser.avatar || "",
      email: signInUser.email,
      isAdmin: signInUser.isAdmin,
      cart: signInUser.cart || [],
      token: getToken(signInUser),
    });
  }
);

router.post("/update-user-cart", isAuth, async (req, res) => {
  try {
    const userId = req.user._id;
    const { currentCart, userCart } = req.body;

    if (!userCart) {
      const user = await User.findById(userId);

      if (!user) {
        return res.status(404).send("User is not found");
      } else {
        user.cart = currentCart;
      }

      const updatedUser = await user.save();

      return res.status(200).send("User cart is updated successfully");
    }

    const updatedCart = [
      ...userCart.filter((product) => {
        const currId = currentCart.map((curr) => curr._id);

        for (let id of currId) {
          if (id === product._id) {
            return false;
          }
        }

        return true;
      }),
      ...currentCart,
    ];

    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).send("User is not found");
    } else {
      user.cart = updatedCart;
    }

    const updatedUser = await user.save();

    res.send(updatedCart);
  } catch (error) {
    console.log(error);
    res.status(400).send("Error while updating user cart");
  }
});

router.post("/update-info", isAuth, async (req, res) => {
  try {
    const { name, secondName, country, city, sex } = req.body;
    const user = await User.findById(req.user._id);

    if (!name) return res.status(400).send("Name field must be filled");

    if (user) {
      user.name = name || user.name;
      user.secondName = secondName || user.secondName;
      user.country = country || user.country;
      user.city = city || user.city;
      user.sex = sex || user.sex;
    } else {
      return res.status(404).send("Server error: user is not found");
    }

    const userUpdated = await user.save();

    res.send({
      name: name || user.name,
      secondName: secondName || user.secondName,
      country: country || user.country,
      city: city || user.city,
      sex: sex || user.sex,
    });
  } catch (error) {
    return res.status(400).send("Server error: unable to update user data");
  }
});

router.post("/update-password", isAuth, async (req, res) => {
  try {
    const { passwordPrev, passwordNew } = req.body;
    if (passwordNew.length < 8) {
      return res
        .status(400)
        .send(
          "Invalid new password: the minimum password length is 8 characters"
        );
    }

    const user = await User.findById(req.user._id);

    const isPrevPasswordsMatch = await bcrypt.compare(
      passwordPrev,
      user.password
    );
    if (!isPrevPasswordsMatch) {
      return res.status(400).send("Invalid current password");
    }

    const newPassword = await bcrypt.hash(passwordNew, 10);
    user.password = newPassword;
    const userUpdated = await user.save();

    return res.status(200).send("Password was updated successfully");
  } catch (error) {
    return res.status(400).send("Server error: unable to update password");
  }
});

router.post("/update-avatar", isAuth, async (req, res) => {
  try {
    const {
      avatar: { avatar },
    } = req.body;
    const user = await User.findById(req.user._id);

    if (user) {
      user.avatar = avatar || user.avatar;
    } else {
      return res.status(404).send("Server error: user is not found");
    }

    const userUpdated = await user.save();

    res.send({
      avatar: avatar || user.avatar,
    });
  } catch (error) {
    return res.status(400).send("Server error: unable to update avatar");
  }
});

export default router;
