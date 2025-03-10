import request from "supertest";
import { describe, expect, it, vi } from "vitest";
import app from "../app";
import prisma from "../database/__mocks__/prisma";

vi.mock("../database/prisma");

describe("/User", () => {
  it("should return a list of users", async () => {
    const user = {
      id: "1",
      name: "Alice",
      email: "alice@bob.com",
      address: null,
    };

    const expectedUser = {
      id: "1",
      name: "Alice",
    };
    // Arrange
    prisma.user.findMany.mockResolvedValue([user]);
    // Act
    const response = await request(app).get("/user");
    // Assert
    expect(response.status).toBe(200);
    expect(response.body).toEqual([expectedUser]);
    expect(prisma.user.findMany).toHaveBeenCalled();
  });

  describe("post", () => {
    it("should get email", async () => {
      // Arrange
      const email = undefined;
      // Act
      const response = await request(app).post("/user").send({ email });
      // Assert
      expect(response.status).toBe(404);
      expect(response.body).toMatchObject({
        message: "Error",
        error: "email is required",
      });
    });

    it("should make a new user", async () => {
      const email = "example@something.com";
      const prismaResponse = {
        id: "1",
        email,
        name: null,
        address: null,
        posts: [],
      };

      prisma.user.create.mockResolvedValueOnce(prismaResponse);

      // ACT
      const response = await request(app).post("/user").send({ email });

      // Assertions
      expect(response.status).toBe(201);
      expect(response.body).toMatchObject({
        message: "OK",
        data: prismaResponse,
      });
    });
  });
});
