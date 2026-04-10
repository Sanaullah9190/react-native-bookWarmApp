import jwt from 'jsonwebtoken'
import User from '../models/User.js'



// const protectRoute =async(req ,res, next)=>{

//     try {
//     // get token
//     const token = req.header("Authorization").replace("Bearer ","");
//     if (!token) return res.status(401).json({ message: "No authentication token, access denied" });

//     // verify token
//     const decoded = jwt.verify(token, process.env.SECRETE_KEY);

//     // find user
//     const user = await User.findById(decoded.userid).select("-password");
//     if (!user) return res.status(401).json({ message: "Token is not valid" });

//     req.user = user;
//     next();

//   } catch (error) {
//     console.error("Authentication error:", error.message);
//     res.status(401).json({ message: "Token is not valid" });
//   }
// }

const protectRoute = async (req, res, next) => {
  try {
    const authHeader = req.header("Authorization");

    if (!authHeader) {
      return res.status(401).json({ message: "No authentication token" });
    }

    // Extract token safely
    const token = authHeader.startsWith("Bearer ")
      ? authHeader.split(" ")[1]
      : authHeader;

    // console.log("TOKEN RECEIVED:", token);

    // verify token
    const decoded = jwt.verify(token, process.env.SECRETE_KEY);

    const userId = decoded.userid || decoded.userId || decoded.id;

    const user = await User.findById(userId).select("-password");

    if (!user) {
      return res.status(401).json({ message: "User not found (invalid token)" });
    }


    req.user = user;
    next();

  } catch (error) {
    console.error("Authentication error:", error.message);
    res.status(401).json({ message: "Token is not valid" });
  }
};

export default protectRoute