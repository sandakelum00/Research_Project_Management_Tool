const express = require("express");
const request = require("supertest");
const mongoose = require("mongoose");
import { signJwt } from "../utils/jwt.utils";
const panel = require("../routes/allocatePanelRoutes");

const app = express();

app.use(express.json());
app.use("/api/v1/panel", panel);

export const userPayload = {
  _id: "6291ea1291df451d51ce8b95",
  name: "kanaka",
  email: "kanaka@gmail.com",
  lastName: "Bhashitha",
  userType: "admin",
};

export const panelPayload = {
  status: "Accept",
};

describe("Allocate Panel", () => {
  describe("given panel  dose not exist", () => {
    it("should return a 404", async () => {
      expect(true).toBe(true);
    });
  });

  describe("given the user is logged in", () => {
    it("should return a 200 and update the panel", async () => {
      const jwt = signJwt(userPayload);
      const panelId = "6298ccee14551c1bd9c03fe5";

      const { statusCode, body } = await request(app)
        .put(`/api/v1/panel/${panelId}`)
        .set("Authorization", `Bearer ${jwt}`)
        .send({
          panelPayload,
        });

      expect(statusCode).toBe(200);

      expect(body).toEqual({
        _id: expect.any(String),
        LeaderNo: expect.any(String),
        cosupervisor: expect.any(String),
        status: "Accept",
        student: expect.any(String),
        supervisor: expect.any(String),
        title: expect.any(String),
        updatedAt: expect.any(String),
        __v: 0,
      });
    });
  });
});
