const db = require('../../../model/index');
const authController = require('../../../controller/auth.controller');
const { mockRequestObject, mockResponseObject } = require('./../interceptor');
const bcrypt = require('bcryptjs');

describe('test Auth Controller', () => {
  let req, res;
  beforeEach(() => {
    req = mockRequestObject();
    res = mockResponseObject();
  });
  let client = {
    username: 'omkar',
    email: 'Omkar@gmail.com',
    password: 'omkar1234',
    roles: ['user'],
  };
  let successfulMassage = 'User Added Successfully with role User';
  let registerMassage = {
    message: 'User Registered Successfully With Role',
  };
  test('signup in auth Controller', async () => {
    let spy = jest.spyOn(db.user, 'create').mockImplementation(() => {
      return new Promise((res, rej) => {
        res(client);
      });
    });
    // let spy2 = jest.spyOn(db.user, 'setRoles').mockImplementation(() => {
    //   return new Promise((res, rej) => {
    //     res(successfulMassage);
    //   });
    // });
    let spy3 = jest.spyOn(db.roles, 'findAll').mockImplementation(() => {
      return new Promise((res, rej) => {
        res(registerMassage);
      });
    });
    req.body = client;
    await authController.signup(req, res);

    expect(spy).toHaveBeenCalled();
    // expect(spy2).toHaveBeenCalled();
    expect(spy3).toHaveBeenCalled();
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith(registerMassage);
  });

  test('signin auth in auth controller ', async () => {
    let spy = jest.spyOn(db.user, 'findOne').mockImplementation(() => {
      return new Promise((res, rej) => {
        res(client);
      });
    });
    let spy2 = jest.spyOn(bcrypt, 'compareSync').mockImplementation(() => {
      return new Promise((res, rej) => {
        res(true);
      });
    });
    req.body.username = "omkar"
    // req.body = client
  await authController.signin(req,res)

  expect(spy).toHaveBeenCalled()
//   expect(spy2).toHaveBeenCalled()
  expect(res.status).toHaveBeenCalledWith(200)
  expect(res.send).toHaveBeenCalledWith(client);
  });
});
