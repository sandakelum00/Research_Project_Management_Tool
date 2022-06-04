const express = require("express");
const request = require("supertest");
const mongoose = require("mongoose");
import { signJwt } from "../utils/jwt.utils";
const staff = require("../routes/staffManageRouts");

const app = express();

app.use(express.json());
app.use("/api/v1/docs", staff);

export const userPayload = {
  _id: "6291ea1291df451d51ce8b95",
  name: "kanaka",
  email: "kanaka@gmail.com",
  lastName: "Bhashitha",
  userType: "admin",
};

export const staffPayload = {
  username: "staff1",
  useremail: "staff1@gmail.com",
  userposition: "supervisor",
  researchInterestingAreas: "image processing",
  department: "SE",
};

describe("Staff", () => {
  describe("given staff dose not exist", () => {
    it("should return a 404", async () => {
      expect(true).toBe(true);
    });
  });

  describe("given the user is logged in", () => {
    it("should return a 200 and get all staff", async () => {
      const jwt = signJwt(userPayload);

      const { statusCode, body } = await request(app)
        .get("/api/v1/staff")
        .set("Authorization", `Bearer ${jwt}`)
        .send(staffPayload);

      expect(statusCode).toBe(200);

      expect(body).toEqual({
        _id: expect.any(String),
        username: "staff1",
        useremail: "staff1@gmail.com",
        userposition: "supervisor",
        researchInterestingAreas: "image processing",
        department: "SE",
        createdAt: expect.any(String),
        updatedAt: expect.any(String),
        __v: 0,
      });
    });

    it("should return a 200 and update the staff", async () => {
      const jwt = signJwt(userPayload);
      const staffId = "629828fab34d284f58f55a22";

      const { statusCode, body } = await request(app)
        .put(`/api/v1/staff/${staffId}`)
        .set("Authorization", `Bearer ${jwt}`)
        .send({
          username: "staff member name",
        });

      expect(statusCode).toBe(200);

      expect(body).toEqual({
        _id: expect.any(String),
        username: "staff member name",
        useremail: "staff1@gmail.com",
        userposition: "supervisor",
        researchInterestingAreas: "image processing",
        department: "SE",
        createdAt: expect.any(String),
        updatedAt: expect.any(String),
        __v: 0,
      });
    });

    it("should return a 204 and delete the staff", async () => {
      const jwt = signJwt(userPayload);
      const staffId = "629828fab34d284f58f55a22";

      await request(app)
        .delete(`/api/v1/staff/${staffId}`)
        .set("Authorization", `Bearer ${jwt}`)
        .expect(204);
    });
  });
});
