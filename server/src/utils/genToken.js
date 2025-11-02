import jwt from "jsonwebtoken";

const genToken = (userId, res) => {
  try {
    const token = jwt.sign({ id: userId }, process.env.JWT_SECRET_KEY, {
      expiresIn: "1d",
    });

    const isProd = process.env.NODE_ENV === "production";
    const cookieOptions = {
      maxAge: 1000 * 60 * 60 * 24,
      httpOnly: true,
      // When frontend and backend are on different origins (Netlify/Render),
      // the cookie must be Secure and SameSite=None to be sent cross-site.
      secure: isProd,
      sameSite: isProd ? "none" : "lax",
      // domain: process.env.COOKIE_DOMAIN || undefined, // optional: set in prod if needed
    };

    res.cookie("BhojanLoginKey", token, cookieOptions);
    return true;
  } catch (error) {
    return false;
  }
};

export default genToken;
