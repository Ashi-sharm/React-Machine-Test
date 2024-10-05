import User from "../models/user.model.js";
import bcryptjs from "bcryptjs";
import { errorHandler } from "../utils/error.js";
import jwt from "jsonwebtoken";

export const signup = async (req, res, next) => {
  const { name, email, password, dob } = req.body;

  if (
    !email ||
    !password ||
    email === "" ||
    password === "" ||
    !name ||
    name === "" ||
    !dob ||
    dob === ""
  ) {
    return next(errorHandler(400, "All fields are required"));
  } else {
    try {
      // Hash the password
      const salt = bcryptjs.genSaltSync(10);
      const hashedPassword = bcryptjs.hashSync(password, salt);
      const newUser = new User({
        name,
        email,
        password: hashedPassword,
        dob,
      });
      await newUser.save();
      res.json("Signup successful");
    } catch (error) {
      next(error);
    }
  }
};

export const signin = async (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password || email === "" || password === "") {
    next(errorHandler(400, "All fields are required"));
  }
  try {
    const validUser = await User.findOne({ email });
    if (!validUser) {
      return next(errorHandler(404, "User not found"));
    }
    const validPassword = bcryptjs.compareSync(password, validUser.password);
    if (!validPassword) {
      return next(errorHandler(400, "Invalid password"));
    }
    const token = jwt.sign({ id: validUser._id }, "Ashi1821");
    const { password: pass, ...rest } = validUser._doc;

    res
      .status(200)
      .cookie("access_token", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production", 
        sameSite: "Strict", 
      })
      .json({ ...rest, token });
  } catch (error) {
    next(error);
  }
};
