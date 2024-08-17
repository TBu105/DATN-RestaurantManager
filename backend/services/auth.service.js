const { BadRequest, InternalServerError } = require("../core/error.response");
const {
  hashPassword,
  comparePassword,
} = require("../utils/check.password.util");
const {
  generateSecretKey,
  generateToken,
} = require("../utils/generate.jwt.key.util");
const { decode, verify } = require("jsonwebtoken");
const userRepo = require("../models/repositories/user.repo");
const keyTokenService = require("../services/key.token.service");

class AuthenticationService {
  async register(userData) {
    // userData = {username, password}

    const user = await userRepo.findUserByFields({
      username: userData.username,
    });

    if (user) {
      throw new BadRequest("User already exist hehe");
    }

    const hashedPassword = await hashPassword(userData.password);

    const data = { ...userData, password: hashedPassword };

    console.log("data:", data);

    const newUser = await userRepo.createUser(data);

    if (!newUser) {
      throw new InternalServerError("Fail to create new user");
    }

    const secretKey = generateSecretKey();

    const keyToken = await keyTokenService.createKeyToken({
      userId: newUser._id,
      secretKey,
    });

    console.log("keyToken: authService", keyToken);

    return newUser;
  }

  async login({ username, password }) {
    const user = await userRepo.findUserByFields({ username });

    console.log("user:auth service", user);

    if (!user) {
      throw new BadRequest("There is no user exits under this username");
    }

    const checkPassword = await comparePassword(password, user.password);

    if (!checkPassword) {
      throw new BadRequest("Invalid password");
    }

    const keyToken = await keyTokenService.getKeyTokenByFields({
      userId: user._id,
    });

    const accessToken = generateToken(
      { userId: user._id, role: user.role },
      keyToken.secretKey,
      "1h"
    );
    const refreshToken = generateToken(
      { userId: user._id, role: user.role },
      keyToken.secretKey,
      "7d"
    );

    const updateKeyToken = await keyTokenService.updateKeyTokenByUserId(
      user._id,
      refreshToken
    );

    console.log("updateKeyToken:auth service", updateKeyToken);

    if (!updateKeyToken) {
      throw new BadRequest("Failed to update key token");
    }

    const token = {
      accessToken,
      refreshToken: updateKeyToken.refreshToken,
    };

    return token;
  }

  async refreshAccessToken(refreshToken) {
    //refreshToken send down from controller, controller take it from cookies

    if (!refreshToken) throw new BadRequest("Refresh token is required");

    const decoded = decode(refreshToken); // Decode without verification to get userId

    const keyToken = await keyTokenService.getKeyTokenByFields({
      userId: decoded.userId,
    });

    if (!keyToken || keyToken.refreshToken !== refreshToken) {
      throw new BadRequest("Invalid refresh token");
    }

    try {
      const verifiedToken = verify(refreshToken, keyToken.secretKey);

      console.log("verifiedToken:auth service", verifiedToken);
    } catch (error) {
      console.log("error: ", error);

      if (error.name === "TokenExpiredError") {
        throw new BadRequest("Refresh token is expired");
      } else {
        throw new BadRequest("Refresh token is invalid");
      }
    }

    // console.log("decoded.userId:auth service", decoded.userId);

    const newAccessToken = generateToken(
      { userId: decoded.userId, role: decoded.role },
      keyToken.secretKey,
      "1h"
    );

    const newRefreshToken = generateToken(
      { userId: decoded.userId, role: decoded.role },
      keyToken.secretKey,
      "7d"
    );

    const updatedKeyToken = await keyTokenService.updateKeyTokenByUserId(
      decoded.userId,
      {
        refreshToken: newRefreshToken,
        $push: { refreshUsed: refreshToken },
      }
    );

    const token = {
      newAccessToken,
      refreshToken: updatedKeyToken.refreshToken,
    };

    return token;
  }

  async logout(refreshToken) {
    //refreshToken send down from controller, controller take it from cookies

    if (!refreshToken) throw new BadRequest("Refresh token is required");

    const decoded = decode(refreshToken); // Decode without verification to get userId

    const keyToken = await keyTokenService.getKeyTokenByFields({
      userId: decoded.userId,
    });

    if (!keyToken || keyToken.refreshToken !== refreshToken) {
      throw new BadRequest("Invalid refresh token");
    }

    await keyTokenService.updateKeyTokenByUserId(decoded.userId, {
      refreshToken: "",
      $push: { refreshUsed: refreshToken },
    });

    return "Logout successfully";
  }
}

module.exports = new AuthenticationService();
