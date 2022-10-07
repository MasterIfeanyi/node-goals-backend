const { default: axios } = require("axios");

// test globals
const baseUrl = "http://localhost:5000";

describe("api_test - register", () => {

    it("test register user - invalid user -> undefined", async () => {
        await axios.post(`${baseUrl}/register`, undefined)
            .then(_ => { })
            .catch(error => {
                expect(error.response.status).toEqual(400);
                expect(error.response.data).toBeDefined();
                expect(error.response.data.message).toEqual("Username and password are required.");
            });
    });

    it("test register user - invalid user -> empty object", async () => {
        await axios.post(`${baseUrl}/register`, {})
            .then(_ => { })
            .catch(error => {
                expect(error.response.status).toEqual(400);
                expect(error.response.data).toBeDefined();
                expect(error.response.data.message).toEqual("Username and password are required.");
            });
    });

    it("test register user - invalid user -> null", async () => {
        await axios.post(`${baseUrl}/register`, null)
            .then(_ => { })
            .catch(error => {
                expect(error.response.status).toEqual(400);
                expect(error.response.data).toBeDefined();
                expect(error.response.data.message).toEqual("Username and password are required.");
            });
    });

    it("test register user - invalid user -> username only", async () => {
        await axios.post(`${baseUrl}/register`, { user: "user@users.com" })
            .then(_ => { })
            .catch(error => {
                expect(error.response.status).toEqual(400);
                expect(error.response.data).toBeDefined();
                expect(error.response.data.message).toEqual("Username and password are required.");
            });
    });

    it("test register user - invalid user -> password only", async () => {
        await axios.post(`${baseUrl}/register`, { pwd: "userpassword" })
            .then(_ => { })
            .catch(error => {
                expect(error.response.status).toEqual(400);
                expect(error.response.data).toBeDefined();
                expect(error.response.data.message).toEqual("Username and password are required.");
            });
    });

    it("test register user - invalid user -> roles only", async () => {
        await axios.post(`${baseUrl}/register`, { roles: null })
            .then(_ => { })
            .catch(error => {
                expect(error.response.status).toEqual(400);
                expect(error.response.data).toBeDefined();
                expect(error.response.data.message).toEqual("Username and password are required.");
            });
    });

    it("test register user - valid user -> email + password", async () => {
        await axios.post(`${baseUrl}/register`, { user: "testername", pwd: "testerpassword" })
            .then(response => {
                expect(response.data.status).toEqual(201);
                expect(response.data).toBeDefined();
                expect(response.data.accessToken).toBeDefined();
                expect(response.data.roles).toBeDefined();
                expect(Array.isArray(response.data.roles)).toBe(true);
                expect(response.data.roles.length > 0).toBe(true);
            })
            .catch(_ => { });
    });
});