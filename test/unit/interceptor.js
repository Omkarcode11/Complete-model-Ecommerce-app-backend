module.exports = {
  mockRequestObject: () => {
    const req = {};
    req.body = jest.fn().mockReturnValue(req);
    req.params = jest.fn().mockReturnValue(req);
    req.query = jest.fn().mockReturnValue(req);
    return req;
  },
  mockResponseObject: () => {
    const res = {};
    res.status = jest.fn().mockReturnValue(res);
    res.write = jest.fn().mockReturnValue(res);
    res.json  = jest.fn().mockReturnValue(res)
    res.send = jest.fn().mockReturnValue(res);
    res.end = jest.fn();
    res.writeHead = jest.fn().mockReturnValue(res)
    return res;
  },
};
