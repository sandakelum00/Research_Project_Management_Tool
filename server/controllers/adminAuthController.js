const Admin = require("../models/Admin.js");
const { BadRequestError, UnauthenticatedError } = require("../errors/index.js");

const register = async (req, res, next) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    const err = new BadRequestError("Please provide all values");
    next(err);
  }

  const userAlreadyExists = await Admin.findOne({ email });

  if (userAlreadyExists) {
    const err = new BadRequestError("Email is already exists");
    next(err);
  }

  try {
    const admin = await Admin.create(req.body);
    const token = admin.createJWT();

    res.status(201).json({
      admin: {
        name: admin.name,
        lastName: admin.lastName,
        email: admin.email,
        userType: admin.userType,
      },
      token,
    });
  } catch (error) {
    next(error);
  }
};

const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      throw new BadRequestError("Please provide all values");
    }

    const admin = await Admin.findOne({ email }).select("+password");

    if (!admin) {
      throw new UnauthenticatedError("Invalid Credentials");
    }

    const isPasswordCorrect = await admin.comparePassword(password);

    if (!isPasswordCorrect) {
      throw new UnauthenticatedError("Invalid Credentials");
    }

    const token = admin.createJWT();
    admin.password = undefined;

    res.status(200).json({ admin, token });
  } catch (error) {
    next(error);
  }
};

const updateUser = async (req, res, next) => {
  try {
    const { email, name, lastName } = req.body;

    if (!email || !name || !lastName) {
      throw new BadRequestError("Please provide all values");
    }

    const admin = await Admin.findOne({ _id: req.admin.adminId });

    admin.email = email;
    admin.name = name;
    admin.lastName = lastName;

    await admin.save();

    const token = admin.createJWT();

    res.status(200).json({ admin, token });
  } catch (error) {
    next(error);
  }
};

module.exports = { register, login, updateUser };
