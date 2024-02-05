import User from "../models/user.model.js";
import bcrypt from "bcryptjs";
import generateTokenAndSetCookie from "../utils/generateToken.js";

export const signup = async (req, res) => {
  try {
    const { fullName, username, password, confirmPassword, gender } = req.body;
    if (!fullName || !username || !password || !confirmPassword || !gender) {
      return res.status(400).json({ error: "provide all data" });
    }

    if (password !== confirmPassword) {
      return res.status(400).json({ error: "passwords doesn't match" });
    }

    if (password.length < 6) {
      return res.status(400).json({ error: "password is too short" });
    }

    const userFound = await User.findOne({ username });
    if (userFound) {
      return res.status(400).json({ error: "username not available" });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = new User({
      fullName,
      username,
      password: hashedPassword,
      gender,
      profilePic: `https://avatar.iran.liara.run/public/${
        gender === "male" ? "boy" : "girl"
      }?username=${username}`,
    });

    await newUser.save();

    generateTokenAndSetCookie(newUser._id, res);

    return res.status(201).json({
      _id: newUser._id,
      fullName: newUser.fullName,
      username: newUser.username,
      profilePic: newUser.profilePic,
    });
  } catch (error) {}
};

export const login = (req, res) => {
  res.send("Login user");
};

export const logout = (req, res) => {
  res.send("logout user");
};
