import createWebService from "../../../../webService/app";
import User from "../../../../webService/api/user/userModel.js";
import request from "supertest";

const shouldResponse200Msg = "-> should response 200 (ok)";
const shouldResponse401Msg = "-> should response 401 (unauthorized)";
const shouldResponse400Msg = "-> should response 400 (bad request)";
const shouldResponse409Msg = "-> should response 409 (conflicts)";

// describe("POST /register", () => {
//   const url = "/register";
//   let user = { name: "testName", password: "testPassword", repeatPassword: "testPassword", tel: "0617389774", email: "papio111@gmail.com" };
//   let app;
//   beforeAll(async () => {
//     // create app
//     app = createWebService();
//   });

//   afterAll(async () => {
//     // delete all users
//     await Users.deleteMany({});
//     await app.close();
//   });

//   it(`1st time register ${shouldResponse200Msg}`, async () => {
//     const res = await request(app).post(url).set("Accept", "application/json").send(user);
//     expect(res.statusCode).toBe(200);
//   });
//   it(`2nd time register with same user's data ${shouldResponse409Msg}`, async () => {
//     const res = await request(app).post(url).set("Accept", "application/json").send(user);
//     expect(res.statusCode).toBe(409);
//   });
// });

describe("POST /login", () => {
  const url = "/login";
  let user = {
    name: "testName",
    password: "testPassword",
    repeatPassword: "testPassword",
    tel: "0617389774",
    email: "papio111@gmail.com",
  };
  let validFalseEmail = "papio333@gmail.com";
  let invalidEmail = "adsf_dkdlsaf";
  let validFalseTel = "0615247339";
  let invalidTel = "2h234234hfs";
  let falsePassword = "34242346525";
  let trueEmail = user.email;
  let truePassword = user.password;
  let trueTel = user.tel;


  //generate null cases




  
  let app;
  beforeAll(async () => {
    // create app
    app = createWebService();
    // register user
    await request(app).post("/register").set("Accept", "application/json").send(user);
  });

  afterAll(async () => {
    //delete all users
    await User.deleteMany({});
    await app.close();
  });

  const tests = [
    {
      // 1
      title: `email (true), password (true) ${shouldResponse200Msg}`,
      body: { email: user.email, password: user.password },
      expectHttpCode: 200,
    },
    {
      // 2
      title: `tel (true), password (true) ${shouldResponse200Msg}`,
      body: { tel: user.tel, password: user.password },
      expectHttpCode: 200,
    },
    {
      // 3
      title: `tel (null), password (null) ${shouldResponse400Msg}`,
      body: {},
      expectHttpCode: 400,
    },
    {
      // 4
      title: `tel (null), password (false password) ${shouldResponse400Msg}`,
      body: { password: falsePassword },
      expectHttpCode: 400,
    },
    {
      // 5
      title: `tel (null), password (true password) ${shouldResponse400Msg}`,
      body: { password: user.password },
      expectHttpCode: 400,
    },
    {
      // 6
      title: `tel (true), password (null) ${shouldResponse400Msg}`,
      body: { tel: user.tel },
      expectHttpCode: 400,
    },
    {
      // 7
      title: `email (true), password (null) ${shouldResponse400Msg}`,
      body: { email: user.email },
      expectHttpCode: 400,
    },
    {
      // 8
      title: `email (valid, false), password (null) ${shouldResponse400Msg}`,
      body: { email: validFalseEmail },
      expectHttpCode: 400,
    },
    {
      // 9
      title: `tel (valid, false), password (null) ${shouldResponse400Msg}`,
      body: { tel: validFalseTel },
      expectHttpCode: 400,
    },
    {
      // 10
      title: `email (invalid, false), password (null) ${shouldResponse400Msg}`,
      body: { email: invalidEmail },
      expectHttpCode: 400,
    },
    {
      // 11
      title: `email (invalid, false), password (false) ${shouldResponse400Msg}`,
      body: { email: invalidEmail, password: falsePassword },
      expectHttpCode: 400,
    },
    {
      // 12
      title: `email (invalid, false), password (true) ${shouldResponse400Msg}`,
      body: { email: invalidEmail, password: user.password },
      expectHttpCode: 400,
    },
    {
      // 13
      title: `tel (invalid, false), password (null) ${shouldResponse400Msg}`,
      body: { tel: invalidTel },
      expectHttpCode: 400,
    },
    {
      // 14
      title: `tel (invalid, false), password (false) ${shouldResponse400Msg}`,
      body: { tel: invalidTel, password: falsePassword },
      expectHttpCode: 400,
    },
    {
      // 15
      title: `tel (invalid, false), password (true) ${shouldResponse400Msg}`,
      body: { tel: invalidTel, password: user.password },
      expectHttpCode: 400,
    },
    {
      // 16
      title: `tel (true), password (false) ${shouldResponse401Msg}`,
      body: { tel: user.tel, password: falsePassword },
      expectHttpCode: 401,
    },
    {
      // 17
      title: `email (true), password (false) ${shouldResponse401Msg}`,
      body: { email: user.email, password: falsePassword },
      expectHttpCode: 401,
    },
    {
      // 18
      title: `email (valid, false), password (false) ${shouldResponse401Msg}`,
      body: { email: validFalseEmail, password: falsePassword },
      expectHttpCode: 401,
    },
    {
      // 19
      title: `email (valid, false), password (true) ${shouldResponse401Msg}`,
      body: { email: validFalseEmail, password: user.password },
      expectHttpCode: 401,
    },
    {
      // 20
      title: `tel (valid, false), password (false) ${shouldResponse401Msg}`,
      body: { tel: validFalseTel, password: falsePassword },
      expectHttpCode: 401,
    },
    {
      // 21
      title: `tel (valid, false), password (true) ${shouldResponse401Msg}`,
      body: { tel: validFalseTel, password: user.password },
      expectHttpCode: 401,
    },
  ];

  for (let test of tests) {
    const { title, body, expectHttpCode } = test;
    it(title, async () => {
      const res = await request(app).post(url).set("Accept", "application/json").send(body);
      expect(res.statusCode).toBe(expectHttpCode);
    });
  }
});
