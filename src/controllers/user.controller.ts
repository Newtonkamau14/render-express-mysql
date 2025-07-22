import { NextFunction, Request, RequestHandler, Response } from "express";
import QRCode from "qrcode";
import { User } from "../models/user";

const getAllUsers: RequestHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const users = await User.findAll({
      attributes: ["id", "firstName", "lastName", "email", "password"],
    });

    if (!users) {
      res.status(404);
      throw new Error("No users found");
    }

    return res.status(200).json({ users });
  } catch (error) {
    next(error);
  }
};

const getUserById: RequestHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;
    const user = await User.findByPk(id, {
      attributes: ["id", "firstName", "lastName", "email", "password"],
    });

    if (!user) {
      res.status(404);

      throw new Error("User not found");
    }

    return res.status(200).json({ user });
  } catch (error) {
    next(error);
  }
};

const addUser: RequestHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { firstName, lastName, email, password } = req.body;

    const newUser = await User.create({
      firstName,
      lastName,
      email,
      password,
    });

    return res.status(201).json({ message: "User created", user: newUser });
  } catch (error) {
    next(error);
  }
};

const updateUser: RequestHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;
    const { firstName, lastName, email, password } = req.body;

    const userExists = await User.findByPk(id);

    if (!userExists) {
      res.status(404);
      throw new Error("User not found");
    }

    if (firstName !== undefined) {
      userExists.firstName = firstName;
    }
    if (lastName !== undefined) {
      userExists.lastName = lastName;
    }
    if (email !== undefined) {
      userExists.email = email;
    }

    if (password !== undefined) {
      userExists.password = password;
    }

    //Save for updated user
    await userExists.save();

    return res.status(200).json({ message: "User updated", userExists });
  } catch (error) {
    next(error);
  }
};

const deleteUser: RequestHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;

    const user = await User.findByPk(id);

    if (!user) {
      res.status(404);
      throw new Error("User not found");
    }

    await user.destroy();

    return res.status(200).json({ message: "User deleted" });
  } catch (error) {
    next(error);
  }
};

const createUserQRCode: RequestHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;

    const userExists = await User.findByPk(id, {
      attributes: ["id", "email", "qrCode"],
    });

    if (!userExists) {
      res.status(404);
      throw new Error("No user found");
    }

    if (userExists.qrCode) {
      res.status(409);
      throw new Error("QR Code already exists");
    }

    const qrCodeImage = await QRCode.toDataURL(userExists.email);

    userExists.qrCode = qrCodeImage;
    await userExists.save();

    return res.status(200).json({
      message: "QR Code created successfully",
    });
  } catch (error) {
    next(error);
  }
};

const getUserQRCode: RequestHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;

    const qrCode = await User.findByPk(id, {
      attributes: ["qrCode"],
    });
    if (!qrCode) {
      res.status(404);
      throw new Error("No QR code found");
    }

    return res.status(200).json(qrCode);
  } catch (error) {
    next(error);
  }
};

export default {
  getAllUsers,
  getUserById,
  addUser,
  updateUser,
  deleteUser,
  createUserQRCode,
  getUserQRCode,
};
