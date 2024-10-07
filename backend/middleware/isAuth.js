import jwt from "jsonwebtoken";


const isAuth = async (req, res, next) => {
  try {
      const token = req.cookies.token;
      if (!token) {
          return res.status(401).json({ message: "User not authenticated." });
      }

      // Verify the token
      const decoded = jwt.verify(token, process.env.TOKEN_SECRET);
      if (!decoded) {
          return res.status(401).json({ message: "Invalid token" });
      }

      // Attach user ID to req.id
      req.id = decoded.userId;  // Using req.id is fine if this is how you want it

      next();
  } catch (error) {
      console.log(error);
      return res.status(500).json({ message: "Internal server error" });
  }
};


export default isAuth;

