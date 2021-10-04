const request = require("supertest");
const index = require("../server");

describe("GET /index", () => {
    it("responds with dm2buy", (done) => {
        request(index).get("/").expect("dm2buy", done);
    })
});