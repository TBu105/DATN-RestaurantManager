const { Created, Ok } = require("../core/success.response");
const authService = require("../services/auth.service");

class AuthController {
  async createUser(req, res) {
    new Created({
      message: "Create new user successfully",
      metadata: await authService.register(req.body),
    }).send(res);
  }

  async login(req, res) {
    const token = await authService.login(req.body);

    res.cookie("refreshToken", token.refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "prod",
      sameSite: "Strict",
    });

    new Ok({
      message: "Login successfully",
      metadata: token,
    }).send(res);
  }

  async refreshAccessToken(req, res) {
    const refreshToken = req.cookies["refreshToken"];

    const token = await authService.refreshAccessToken(refreshToken);

    res.cookie("refreshToken", token.refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "prod",
      sameSite: "Strict",
    });

    new Ok({
      message: "Refresh AccessToken successfully",
      metadata: token,
    }).send(res);
  }

  async logout(req, res) {
    const refreshToken = req.cookies["refreshToken"];

    const message = await authService.logout(refreshToken);

    // Clear the refresh token cookie
    res.clearCookie("refreshToken", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "prod",
      sameSite: "Strict",
    });

    new Ok({
      message: "Logout successfully",
      metadata: message,
    }).send(res);
  }
}

module.exports = new AuthController();
