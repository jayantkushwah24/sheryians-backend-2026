import userModel from "../models/user.model.js";

export async function registerController(req, res) {
  const { email, phone, password } = req.body;

  let errors = [];

  if (!email) {
    errors.push({
      field: "email",
      message: "email is required",
    });
  }
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  if (!emailRegex.test(email)) {
    errors.push({
      field: "email",
      message: "Invalid email address",
    });
  }

  if (!phone) {
    errors.push({
      field: "phone",
      message: "phone is required",
    });
  }
  const phoneRegex = /^(\+91[\-\s]?)?[6-9]\d{9}$/;
  if (!phoneRegex.test(phone)) {
    errors.push({
      field: "phone",
      message: "Invalid phone number",
    });
  }

  if (!password && !password.trim()) {
    errors.push({
      field: "password",
      message: "password is required",
    });
  }
  if (password.trim().length() < 6) {
    errors.push({
      field: "password",
      message: "password must contain altleast 6 character",
    });
  }

  if (errors.length > 0) {
    return res.status(400).json({
      message: "Invalid request",
      errors,
    });
  }

  const user = await userModel.create({
    email,
    phone,
    passwordHash: password,
  });

  return res.status(201).json({
    message: "user registered successfully",
    data: {
      email,
      phone,
      id: user._id,
    },
  });
}
