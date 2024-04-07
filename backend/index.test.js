const app = require("./index.js")
const request = require("supertest")

// describe("GET /users", () => {
//     describe("given a username and password", () => {

//         test("should respond with a 200 status code", async () => {
//         //     const response = await request(app).get("/user")
//         //     expect(response.statusCode).toBe(200)
//             expect(true).toBe(true);
//         })

//         // Return codes
//         // Body format
//         test("should specify json in the content type header", async () => {
//             const response = await request(app).post("/user").send({
//                 username: "username",
//                 password: "password",
//             });
//             expect(response.headers["content-type"]).toEqual(
//                 expect.stringContaining("json")
//             );
//         });

//     })
// })

describe("GET /api/getUserProfile", () => {
    describe("given a username and password", () => {

        test("should respond with a 200 status code", async () => {
            const response = await request(app).get("/user").set("authorization", "abcd")
            expect(response.statusCode).toBe(200)
            expect(true).toBe(true);
        })

        // Return codes
        // Body format
        // test("should specify json in the content type header", async () => {
        //     const response = await request(app).post("/user").send({
        //         username: "username",
        //         password: "password",
        //     });
        //     expect(response.headers["content-type"]).toEqual(
        //         expect.stringContaining("json")
        //     );
        // });

    })
})