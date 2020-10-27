import jwt from 'jsonwebtoken';
import config from './config';

const getToken = (user) => {
  return jwt.sign({
    _id: user._id,
    name: user.name,
    email: user.email,
    isAdmin: user.isAdmin
  }, config.JWT_SECRET, {
    expiresIn: '1h'
  });
}

const isAuth = (req, res, next) => {
  const token = req.headers.authorization;
  if (token) {
    const onlyToken = token.slice(7, token.length);
    jwt.verify(onlyToken, config.JWT_SECRET, (error, decode) => {
      if (error) return res.status(401).json({message: 'Invalid token'});

      req.user = decode;
      next();
      return
    })
  } else {
    return res.status(401).json({message: 'Token is not supplied'});
  }
}

const isAdmin = (req, res, next) => {
  if (req.user && req.user.isAdmin) return next();

  return res.status(401).json({message: 'Admin token is not valid'});
}

export { getToken, isAuth, isAdmin }