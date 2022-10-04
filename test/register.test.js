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

    it.todo("test register user - invalid user -> empty object");

    it.todo("test register user - invalid user -> null");

    it.todo("test register user - invalid user -> email only");

    it.todo("test register user - invalid user -> password only");

    it.todo("test register user - invalid user -> roles only");

    it.todo("test register user - valid user -> email + password + roles");
});