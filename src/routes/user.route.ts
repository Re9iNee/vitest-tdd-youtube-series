import Router from "express";
import prisma from "../database/prisma";

const router = Router();

router.get("/", async (req, res) => {
  const users = await prisma.user.findMany();

  const result = await users.map((user) => ({ id: user.id, name: user.name }));

  res.send(result);
});

export default router;
