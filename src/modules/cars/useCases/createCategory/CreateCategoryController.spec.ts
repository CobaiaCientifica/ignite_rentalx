import { hash } from "bcryptjs";
import request from "supertest";
import { Connection } from "typeorm";
import { v4 } from "uuid";

import { app } from "@shared/infra/http/app";
import createConnection from "@shared/infra/typeorm";

let connection: Connection;

describe("Create Category Controller", () => {
    beforeAll(async () => {
        connection = await createConnection();
        await connection.runMigrations();
        const id = v4();
        const password = await hash("admin", 8);
        await connection.query(
            `INSERT INTO
            USERS(id, name, email, password, "isAdmin", created_at, driver_license)
            VALUES('${id}', 'admin', 'admin@rentalx.com.br', '${password}', true, 'now()', 'XXXXXX')`
        );
    });
    afterAll(async () => {
        await connection.dropDatabase();
        await connection.close();
    });
    it("should be able to create a new category", async () => {
        const responseToken = await request(app)
            .post("/sessions")
            .send({ email: "admin@rentalx.com.br", password: "admin" });
        const { refresh_token } = responseToken.body;
        const response = await request(app)
            .post("/categories")
            .send({
                name: "Category supertest",
                description: "Category supertest",
            })
            .set({ Authorization: `Bearer ${refresh_token}` });

        expect(response.status).toBe(201);
    });
    it("should not be able to create a new category if the name is already in use", async () => {
        const responseToken = await request(app)
            .post("/sessions")
            .send({ email: "admin@rentalx.com.br", password: "admin" });
        const { refresh_token } = responseToken.body;
        const response = await request(app)
            .post("/categories")
            .send({
                name: "Category supertest",
                description: "Category supertest",
            })
            .set({ Authorization: `Bearer ${refresh_token}` });

        expect(response.status).toBe(400);
    });
});
