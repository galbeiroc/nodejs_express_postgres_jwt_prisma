import { Request, Response } from "express";
import bcrypt from "bcrypt";

import { prisma } from "../config/db";

type IUser = {
  name: string;
  email: string;
  password: string;
};

type ILoginUser = Omit<IUser, "name">;

const register = async (req: Request, res: Response) => {
  const { name, email, password } = req.body as IUser;

  // Check if the user already exists
  const userExists = await prisma.user.findUnique({
    where: { email },
  });

  if (userExists) {
    return res.status(400).json({ message: "User already exists" });
  }

  // Hash password
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  // Create user
  const user = await prisma.user.create({
    data: {
      name,
      email,
      password: hashedPassword,
    },
  });

  return res.status(201).json({
    status: "success",
    data: {
      user: {
        id: user.id,
        name,
        email,
      },
    },
  });
};

const login = async (req: Request, res: Response) => {
  const { email, password } = req.body as ILoginUser;

  // Check if user email exists in the table
  const user = await prisma.user.findUnique({
    where: {
      email,
    },
  });

  if (!user) {
    return res.status(401).json({
      message: "Invalid email or password",
    });
  }

  // Verify password
  const isValidPassword = await bcrypt.compare(password, user.password);

  if (!isValidPassword) {
    return res.status(401).json({
      message: "Invalid email or password",
    });
  }

  return res.status(201).json({
    status: "success",
    data: {
      user: {
        id: user.id,
        email,
      },
    },
  });
};

export { login, register };
