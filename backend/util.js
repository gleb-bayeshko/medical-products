import jwt from "jsonwebtoken";
import config from "./config";

const getToken = (user) => {
  return jwt.sign(
    {
      _id: user._id,
      name: user.name,
      secondName: user.secondName || "",
      country: user.country || "",
      city: user.city || "",
      sex: user.sex || "",
      avatar: user.avatar || "",
      email: user.email,
      isAdmin: user.isAdmin,
      cart: user.cart || [],
    },
    config.JWT_SECRET,
    {
      expiresIn: "24h",
    }
  );
};

const isAuth = (req, res, next) => {
  const token = req.headers.authorization;
  if (token) {
    const onlyToken = token.slice(7, token.length);
    jwt.verify(onlyToken, config.JWT_SECRET, (error, decode) => {
      if (error) return res.status(401).json({ message: "Invalid token" });

      req.user = decode;
      next();
      return;
    });
  } else {
    return res.status(401).json({ message: "Token is not supplied" });
  }
};

const isAdmin = (req, res, next) => {
  if (req.user && req.user.isAdmin) return next();

  return res.status(401).json({ message: "Admin token is not valid" });
};

export { getToken, isAuth, isAdmin };
