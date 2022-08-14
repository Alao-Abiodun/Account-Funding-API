const request = require("supertest");
const app = require("../app");

describe("Account API", () => {
  it("should create a user account", async () => {
    const response = await request(app).post("/api/v1/users/account").send({
      type: "test",
      number: "test",
      balance: "test",
      user_id: "test",
    });

    expect(response.statusCode).toBe(201);
    expect(response.body.message).toBe("User Bank Account successfully");
  }).timeout(10000);

  it("authenticated user should be able to get all their bank account", async () => {
    const response = await request(app)
      .get("/api/v1/users/account")
      .set("Authorization", "Bearer " + token);

    expect(response.statusCode).toBe(200);
    expect(response.body.message).toBe(
      "User bank account retrieved successfully"
    );
  });

  it("authenticated user should be able to fund their bank account", async () => {
    const response = await request(app)
      .post("/api/v1/users/account/1/fund")
      .set("Authorization", "Bearer " + token)
      .send({
        amount: 100,
      });

    expect(response.statusCode).toBe(200);
    expect(response.body.message).toBe("User bank account funded successfully");
  }).timeout(10000);

  it("authenticated user should be able to transfer funds to another user", async () => {
    const response = await request(app)
      .post("/api/v1/users/account/1/transfer")
      .set("Authorization", "Bearer " + token)
      .send({
        amount: 100,
        to: 2,
      });

    expect(response.statusCode).toBe(200);
    expect(response.body.message).toBe(
      "User bank account transferred successfully"
    );
  }).timeout(10000);
});
