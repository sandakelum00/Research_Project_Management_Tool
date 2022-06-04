const express = require("express");
const request = require("supertest");
const mongoose = require("mongoose");
import { signJwt } from "../utils/jwt.utils";
const adminAuth = require("../routes/adminAuthRoutes");

const app = express();

app.use(express.json());
app.use("/api/v1/admin-auth/register", adminAuth);

const userPayload = {
  _id: adminId,
  name: "kanaka",
  email: "kanaka@gmail.com",
  lastName: "bhashitha",
  userType: "admin",
};

const userInput = {
  name: "kanaka",
  email: "kanaka@gmail.com",
  password: "Password123",
  lastName: "bhashitha",
};

describe("admin", () => {
  describe("admin registration", () => {
    describe("given the username and password are valid", () => {
      it("should return the user payload", async () => {
        const createUserServiceMock = jest.mockReturnValueOnce(userPayload);

        const { statusCode, body } = await request(app)
          .post("/api/v1/admin-auth/register")
          .send(userInput);

        expect(statusCode).toBe(200);

        expect(body).toEqual(userPayload);

        expect(createUserServiceMock).toHaveBeenCalledWith(userInput);
      });
    });
  });
});
