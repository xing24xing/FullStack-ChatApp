import { configDotenv } from "dotenv";
import { User } from "../model/userModel.js";
import bcrypt from 'bcryptjs'
import jwt from "jsonwebtoken";

export const register = async (req, res) => {
    try {
      const { fullName, username, password, confirmpass, gender } = req.body;
  
      // Validation
      if (!fullName || !username || !password || !gender || !confirmpass) {
        return res.status(400).json({
          message: "All Fields are required",
          success: false,
        });
      }
  
      if (password !== confirmpass) {
        return res.status(400).json({
          message: "Passwords do not match",
          success: false,
        });
      }
  
      // Check for existing user
      const userExists = await User.findOne({ username });
      if (userExists) {
        return res.status(400).json({
          message: "Username already exists, please choose another",
          success: false,
        });
      }
  
      // Hash password
      const hashedPassword = await bcrypt.hash(password, 10);
  
      // Profile photo URLs based on gender
      const profilePhoto = gender === 'male'
        ? `https://avatar.iran.liara.run/public/boy?username=${username}`
        : `https://avatar.iran.liara.run/public/girl?username=${username}`;
  
      // Create the user
      await User.create({
        fullName,
        username,
        password: hashedPassword,
        profilePhoto,
        gender,
      });
  
      return res.status(201).json({
        message: "Account created successfully",
        success: true,
      });
  
    } catch (error) {
      console.error(error);
      return res.status(500).json({
        message: "Server error. Please try again later.",
        success: false,
      });
    }
  };
  

export const login = async(req, res) => {
    try {
        const { username, password } = req.body;

        // Check for missing fields
        if (!username || !password) {
            return res.status(400).json({
                message: "All fields are required",
                success: false
            });
        }

        // Find user in the database
        const user = await User.findOne({ username });
        if (!user) {
            return res.status(400).json({
                message: "Invalid username or password",
                success: false
            });
        }

        // Check if password matches
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({
                message: "Invalid username or password",
                success: false
            });
        }

        // Generate JWT token
        const token = jwt.sign({ userId: user._id }, process.env.TOKEN_SECRET, { expiresIn: "1d" });

        // Set token in a cookie
        res.cookie("token", token, { httpOnly: true, maxAge: 24 * 60 * 60 * 1000 });  // 1 day

        return res.status(200).json({
            message: "Login successful",
            success: true,
            user: {
                _id: user._id,
                username: user.username,
                fullName: user.fullName,
                profilePhoto: user.profilePhoto
            }
        });

    } catch (error) {
        console.error(error);
        return res.status(500).json({
            message: "Server error. Please try again later.",
            success: false
        });
    }
};

export const logout = (req, res) => {
    res.cookie("token", "", { maxAge: 0 });
    return res.json({
        message: "Logged out successfully",
        success: true
    });
};


export const getOtherUsers = async (req, res) => {
    try {
        const loggedUserId = req.id;  // Get the logged-in user ID from the request
        const otherUsers = await User.find({ _id: { $ne: loggedUserId } }).select("-password");
        return res.status(200).json(otherUsers);
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            message: "Server error. Please try again later.",
            success: false
        });
    }
};
