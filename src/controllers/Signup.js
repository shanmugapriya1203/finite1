import bcrypt from "bcryptjs";
import User from "../models/User.js";
import jwt from "jsonwebtoken";
import nodemailer from "nodemailer";

const signup = async (req, res) => {
  try {
    const {
      username,
      password,
      email,
      companyName,
      phoneNumber,
      f_name,
      l_name,
      userImage,
      address,
      GST,
      companyLogo,
    } = req.body;

    // Validate required fields
    if (!username || !password) {
      return res
        .status(400)
        .json({ error: "Username and password are required." });
    }

    // Check if email already exists
    const existingEmail = await User.findOne({ email });
    if (existingEmail) {
      return res.status(400).json({ error: "Email is already registered." });
    }

    // Check if phone number already exists
    const existingPhoneNumber = await User.findOne({ phoneNumber });
    if (existingPhoneNumber) {
      return res
        .status(400)
        .json({ error: "Phone number is already registered." });
    }

    // Check if company name already exists
    const existingCompanyName = await User.findOne({ companyName });
    if (existingCompanyName) {
      return res
        .status(400)
        .json({ error: "Company name is already registered." });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create new user with provided and default values
    const newUser = new User({
      username,
      password: hashedPassword,
      email,
      companyName,
      phoneNumber,
      role: "admin", // Default role
      createdAt: new Date(),
      userId: (await User.countDocuments()) + 1,
      f_name,
      l_name,
      userImage,
      defaultLanguage: "English",
      address,
      GST,
      companyLogo,
      verified: false,
    });

    // Save user to database
    const savedUser = await newUser.save();
    const token = jwt.sign({ userId: savedUser._id }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });
    console.log(`Verification Token for ${email}: ${token}`);
    // Send verification email
    const transporter = nodemailer.createTransport({
      service: "Gmail", // Or use your email service
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    const verificationLink = `${process.env.BASE_URL}/api/users/verify-email?token=${token}`;

    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: email,
      subject: "Verify Your Email",
      html: `<p>Please verify your email by clicking the following link:</p>
             <a href="${verificationLink}">Verify Email</a>`,
    };

    await transporter.sendMail(mailOptions);
    res.status(201).json({
      message:
        "User registered successfully. Please check your email to verify your account.",

      user: savedUser,
    });
  } catch (error) {
    console.error("Error in signup:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export default signup;
