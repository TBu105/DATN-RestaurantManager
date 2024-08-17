const { decode, verify } = require("jsonwebtoken");
const { BadRequest } = require("../core/error.response");
const userRepo = require("../models/repositories/user.repo");
const keyTokenRepo = require("../models/repositories/key.token.repo");

async function verifyToken(req, res, next) {
  const authorizationHeader = req.headers["authorization"];

  // console.log(
  //   "authorizationHeader:verify token middlware",
  //   authorizationHeader
  // );

  if (!authorizationHeader || !authorizationHeader.startsWith("Bearer ")) {
    return next(new BadRequest("No access token provided"));
  }

  const accessToken = authorizationHeader.split(" ")[1];

  // console.log("accessToken:verify token middlware", accessToken);

  // Verify and decode the token
  const decoded = decode(accessToken);

  console.log("decoded:verify token middlware", decoded);

  // Retrieve the user from the repository
  const user = await userRepo.getUserById(decoded.userId);

  console.log("user:verify token middlware", user);

  if (!user) {
    return next(new BadRequest("Invalid access token"));
  }

  const keyToken = await keyTokenRepo.getKeyTokenByFields({ userId: user._id });

  console.log("keyToken:verify token middlware", keyToken);

  try {
    const verifiedToken = verify(accessToken, keyToken.secretKey);

    console.log("verifiedToken:verify token middlware", verifiedToken);
  } catch (error) {
    console.log("error: ", error);

    if (error.name === "TokenExpiredError") {
      return next(new BadRequest("Access token is expired"));
    } else {
      return next(new BadRequest("Access token is invalid"));
    }
  }

  // Attach user information to request
  req.user = { userId: decoded.userId, role: decoded.role };

  console.log("req.user:verify token middlware", req.user);

  next();
}

module.exports = verifyToken;
