import jwt from "jsonwebtoken";

export const genForgetPassToken = (email, res) => {
  try {
    const token = jwt.sign({ key: email }, process.env.JWT_SECRET_KEY, {
      expiresIn: "10m",
    });
    const isProd = process.env.NODE_ENV === "production";
    const cookieOptions = {
      maxAge: 1000 * 60 * 10,
      httpOnly: true,
      secure: isProd,
      sameSite: isProd ? "none" : "lax",
      // domain: process.env.COOKIE_DOMAIN || undefined,
    };

    res.cookie("BhojanFp", token, cookieOptions);
    return true;
  } catch (error) {
     return false;
  }
};
