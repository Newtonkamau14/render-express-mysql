import { Request, RequestHandler, Response } from "express";
import { User } from "../models/user";

const getAllUsers: RequestHandler = async (req: Request, res: Response) => {
  try {
    const users = await User.findAll({
      attributes: ["firstName", "lastName", "email", "password"],
    });

    if (!users) {
      return res.status(404).json({ message: "No users found" });
    }

    return res.status(200).json({ users });
  } catch (error) {
    console.error("Error in getting users", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

const getUserById: RequestHandler = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const user = await User.findByPk(id, {
      attributes: ["firstName", "lastName", "email", "password"],
    });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    return res.status(200).json({ user });
  } catch (error) {
    console.error("Error in getting user by ID", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

const addUser: RequestHandler = async (req: Request, res: Response) => {
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
    console.error("Error in adding user", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

const updateUser: RequestHandler = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { firstName, lastName, email, password } = req.body;

    const userExists = await User.findByPk(id);

    if (!userExists) {
      return res.status(404).json({ message: "User not found" });
    }

    if(firstName !== undefined) {
      userExists.firstName = firstName
    }
    if(lastName !== undefined){
      userExists.lastName = lastName
    }
    if(email !== undefined ){
      userExists.email = email
    }

    if(password !== undefined) {
      userExists.password = password
    }

    //Save for updated user
    await userExists.save();

    return res.status(200).json({ message: "User updated", userExists });
  } catch (error) {
    console.error("Error in updating user", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

const deleteUser: RequestHandler = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const user = await User.findByPk(id);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    await user.destroy();

    return res.status(200).json({ message: "User deleted" });
  } catch (error) {
    console.error("Error in deleting user", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

export default { getAllUsers, getUserById, addUser, updateUser, deleteUser };