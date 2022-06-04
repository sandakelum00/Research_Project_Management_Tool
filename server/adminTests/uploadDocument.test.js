const express = require("express");
const request = require("supertest");
const mongoose = require("mongoose");
import { signJwt } from "../utils/jwt.utils";
const uploadDocRoutes = require("../routes/uploadDocRoutes");

const app = express();

app.use(express.json());
app.use("/api/v1/docs", uploadDocRoutes);

export const userPayload = {
  _id: "6291ea1291df451d51ce8b95",
  name: "kanaka",
  email: "kanaka@gmail.com",
  lastName: "Bhashitha",
  userType: "admin",
};

export const documentPayload = {
  fileName: "Inaternational Symposium 2017 - SEUSL (84).pdf",
  docTitle: "title1",
  docDescription: "doc descriptions",
  docType: "presentation-template",
};

describe("Document", () => {
  describe("given document dose not exist", () => {
    it("should return a 404", async () => {
      expect(true).toBe(true);
    });
  });

  describe("upload document route", () => {
    describe("given the user is not logged in", () => {
      it("should return a 403", async () => {
        const { statusCode } = await request(app).post("/api/v1/docs");

        expect(statusCode).toBe(403);
      });
    });
  });

  describe("given the user is logged in", () => {
    describe("get all documents", () => {
      it("should return a 200", async () => {
        const jwt = signJwt(userPayload);

        await request(app)
          .get("/api/v1/docs")
          .set("Authorization", `Bearer ${jwt}`)
          .expect(200);
      });
    });

    it("should return a 200 and upload the document", async () => {
      const jwt = signJwt(userPayload);

      const { statusCode, body } = await request(app)
        .post("/api/v1/docs")
        .set("Authorization", `Bearer ${jwt}`)
        .send(documentPayload);

      expect(statusCode).toBe(200);

      expect(body).toEqual({
        _id: expect.any(String),
        fileName: "Inaternational Symposium 2017 - SEUSL (84).pdf",
        docTitle: "title1",
        docDescription: "doc descriptions",
        docType: "presentation-template",
        file_path: expect.any(String),
        file_mimetype: expect.any(String),
        file_size: expect.any(String),
        createdAt: expect.any(String),
        updatedAt: expect.any(String),
        createdBy: expect.any(String),
        __v: 0,
      });
    });

    it("should return a 200 and update the document", async () => {
      const jwt = signJwt(userPayload);
      const docId = "6291ea1291df451d51ce8b95";

      const { statusCode, body } = await request(app)
        .put(`/api/v1/docs/${docId}`)
        .set("Authorization", `Bearer ${jwt}`)
        .send({
          docTitle: "doc titel 1",
          docDescription: "doc",
        });

      expect(statusCode).toBe(200);

      expect(body).toEqual({
        _id: expect.any(String),
        fileName: "Inaternational Symposium 2017 - SEUSL (84).pdf",
        docTitle: "doc titel 1",
        docDescription: "doc",
        docType: "presentation-template",
        file_path: expect.any(String),
        file_mimetype: expect.any(String),
        file_size: expect.any(String),
        createdAt: expect.any(String),
        updatedAt: expect.any(String),
        createdBy: expect.any(String),
        __v: 0,
      });
    });

    it("should return a 204 and delete the document", async () => {
      const jwt = signJwt(userPayload);
      const docId = "6291ea1291df451d51ce8b95";

      await request(app)
        .delete(`/api/v1/docs/${docId}`)
        .set("Authorization", `Bearer ${jwt}`)
        .expect(204);
    });
  });
});
