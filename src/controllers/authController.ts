import { Request, Response } from "express";
import bcrypt from "bcrypt";

import { prisma } from "../config/db";

interface IRegister {
  name: string;
  email: string;
  password: string;
}

const register = async (req: Request, res: Response) => {
  const { name, email, password } = req.body as IRegister;

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

export { register };
