import jwt from "jsonwebtoken";

const verifyToken = async (req, res, next) => {
  try {
    const token =
      request.cookies.accessToken ||
      request?.headers?.authorization?.split(" ")[1];

    if (!token) {
      return res.status(401).json({
        message: "unauthorized access",
      });
    }

    const decode = jwt.verify(token, process.env.JWT_SECRET);

    if (!decode) {
      return res.status(401).json({
        message: "unauthorized access",
      });
    }

    request.userId = decode.id;

    next();
  } catch (error) {
    return res.status(500).json({
      message: "You have not login",
    });
  }
};

export default verifyToken;
