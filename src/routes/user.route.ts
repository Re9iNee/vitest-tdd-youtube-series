import { Request, Response, Router } from "express";
import prisma from "../database/prisma";

const router = Router();

router.get("/", async (req, res) => {
  const users = await prisma.user.findMany();

  const result = await users.map((user) => ({ id: user.id, name: user.name }));

  res.send(result);
});

router.post("/", async (req: Request, res: Response) => {
  try {
    const { email } = req.body;
    if (!email) {
      throw new Error("email is required");
    }

    const user = await prisma.user.create({ data: { email } });

    res.status(201).json({ data: user, message: "OK" });
  } catch (err) {
    res.status(404).json({ message: "Error", error: "email is required" });
  }
});

export default router;
