import request from "supertest";
import { describe, expect, it, vi } from "vitest";
import app from "./app";
import prisma from "./database/__mocks__/prisma";

vi.mock("./database/prisma");

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
});
