import { describe, expect, it } from "vitest";
import request from "supertest";
import app from "./app";

describe("app", () => {
  it("should run the api server", async () => {
    const response = await request(app).get("/");

    expect(response.status).toBe(200);
    expect(response.text).toBe("Hello, World!");
  });
});
