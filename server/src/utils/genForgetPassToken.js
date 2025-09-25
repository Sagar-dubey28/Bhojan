import jwt from "jsonwebtoken";

export const genForgetPassToken = (email, res) => {
  try {
    const token = jwt.sign({ key: email }, process.env.JWT_SECRET_KEY, {
      expiresIn: "10m",
    });
    res.cookie("BhojanFp",token,{
        maxAge:1000*60*10,
        httpOnly:true,
        sameSite:"lax",
        secure:false, //production  main true kr lena.
    })
    return true;
  } catch (error) {
     return false;
  }
};
