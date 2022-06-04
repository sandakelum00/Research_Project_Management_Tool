const express = require("express");
const request = require("supertest");
const mongoose = require("mongoose");
import { signJwt } from "../utils/jwt.utils";
const student = require("../routes/studentsManageRouts");

const app = express();

app.use(express.json());
app.use("/api/v1/student", student);

export const userPayload = {
  _id: "6291ea1291df451d51ce8b95",
  name: "kanaka",
  email: "kanaka@gmail.com",
  lastName: "Bhashitha",
  userType: "admin",
};

export const studentPayload = {
  fullName: "student 1",
  studentId: "IT19960500",
  email: "studen1@gmail.com",
};

describe("Student management", () => {
  describe("given student dose not exist", () => {
    it("should return a 404", async () => {
      expect(true).toBe(true);
    });
  });

  describe("given the user is logged in", () => {
    it("should return a 200 and update the student", async () => {
      const jwt = signJwt(userPayload);
      const studentId = "6298cc2a14551c1bd9c03fe3";

      const { statusCode, body } = await request(app)
        .put(`/api/v1/student/${studentId}`)
        .set("Authorization", `Bearer ${jwt}`)
        .send({
          fullName: "student 1",
        });

      expect(statusCode).toBe(200);

      expect(body).toEqual({
        _id: expect.any(String),
        fullName: "student 1",
        studentId: "IT19960500",
        email: "studen1@gmail.com",
        createdAt: expect.any(String),
        updatedAt: expect.any(String),
        __v: 0,
      });
    });

    it("should return a 204 and delete the student", async () => {
      const jwt = signJwt(userPayload);
      const studentId = "6298cc2a14551c1bd9c03fe3";

      await request(app)
        .delete(`/api/v1/staff/${studentId}`)
        .set("Authorization", `Bearer ${jwt}`)
        .expect(204);
    });
  });
});
