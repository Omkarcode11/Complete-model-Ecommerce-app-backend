const { mockResponseObject, mockRequestObject } = require('./../interceptor');
const productController = require('./../../../controller/products.controller');
const db = require('./../../../model/index');

describe('Product Controller', () => {
  let req, res;
  beforeEach(() => {
    req = mockRequestObject();
    res = mockResponseObject();
  });
  let allProducts = {
    done: 'al Product',
  };
  let singleProduct = {
    id: 2,
    name: 'Samsung S22 Ultra',
    price: 120000,
  };

  let updateProduct = 'Item added successfully';

  let contentType = {
    'Content-Type': 'application/json',
  };

  let deleteProduct = 'item was Deleted successfully';

  test('test getallProducts from product Controller', async () => {
    let spy = jest.spyOn(db.product, 'findAll').mockImplementation(() => {
      return new Promise((res, rej) => {
        res(allProducts);
      });
    });
    await productController.getAllProducts(req, res);

    expect(spy).toHaveBeenCalled();
    expect(res.status).toHaveBeenCalledWith(201);
    expect(res.json).toHaveBeenCalledWith(allProducts);
  });

  test('test getProductById productsController', async () => {
    let spy = jest.spyOn(db.product, 'findOne').mockImplementation(() => {
      return new Promise((res, rej) => {
        res(singleProduct);
      });
    });
    req.params.Id = 2;
    await productController.getProductById(req, res);

    expect(spy).toHaveBeenCalled();
    expect(res.writeHead).toHaveBeenCalledWith(200, contentType);
    expect(res.json).toHaveBeenCalledWith(singleProduct);
  });

  test('test addProduct from productsController', async () => {
    let spy = jest.spyOn(db.product, 'create').mockImplementation(() => {
      return new Promise((res, rej) => {
        res(singleProduct);
      });
    });
    req.body = singleProduct;
    await productController.addProduct(req, res);

    expect(spy).toHaveBeenCalled();
    expect(res.status).toHaveBeenCalledWith(201);
    expect(res.json).toHaveBeenCalledWith(singleProduct);
  });

  test('deleteProduct from productsController', async () => {
    let spy = jest.spyOn(db.product, 'destroy').mockImplementation(() => {
      return new Promise((res, rej) => {
        res(singleProduct);
      });
    });
    req.params.id = 2;
    await productController.deleteProduct(req, res);

    expect(spy).toHaveBeenCalled();
    expect(res.status).toHaveBeenCalledWith(204);
    expect(res.send).toHaveBeenCalledWith(deleteProduct);
  });

  test('updateProduct from productController', async () => {
    let spy = jest.spyOn(db.product, 'findByPk').mockImplementation(() => {
      return new Promise((res, rej) => {
        res(singleProduct);
      });
    });
    let spy2 = jest.spyOn(db.product, 'update').mockImplementation(() => {
      return new Promise((res, rej) => {
        res();
      });
    });
    req.params.id = 1;
    req.body.name = 'omkar';
    await productController.updateProduct(req, res);

    expect(spy).toHaveBeenCalled();
    expect(spy2).toHaveBeenCalled();
    // expect(req.body.name).toHaveBeenCalledWith("omkar")
    expect(res.status).toHaveBeenCalledWith(202);
    expect(res.send).toHaveBeenCalledWith(updateProduct);
  });

  test('getProductByCategoryId from productsController', async () => {
    let spy = jest.spyOn(db.product, 'findAll').mockImplementation(() => {
      return new Promise((res, rej) => {
        res(singleProduct);
      });
    });
    req.params.id = 1
    await productController.getProductByCategoryId(req,res)

    expect(spy).toHaveBeenCalled()
    expect(res.writeHead).toHaveBeenCalledWith(200,contentType)
    expect(res.json).toHaveBeenCalledWith(singleProduct)
  });
});
