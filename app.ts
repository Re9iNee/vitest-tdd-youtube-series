import express from "express";
import prisma from "./database/prisma";

const app = express();

app.get("/", (req, res) => {
  res.send("Hello, World!");
});

app.get("/user", async (req, res) => {
  const users = await prisma.user.findMany();

  const result = await users.map((user) => ({ id: user.id, name: user.name }));

  res.send(result);
});

export default app;
