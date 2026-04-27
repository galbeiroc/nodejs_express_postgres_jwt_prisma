import { Request, Response } from "express";

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
};

export { register };
