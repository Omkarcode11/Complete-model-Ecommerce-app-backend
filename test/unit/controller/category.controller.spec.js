const { mockResponseObject, mockRequestObject } = require('./../interceptor');
const db = require('./../../../model/index');
const categoryController = require('./../../../controller/categories.controller');

describe('Category Controller', () => {
  let req, res;
  beforeEach(() => {
    req = mockRequestObject();
    res = mockResponseObject();
  });

  let allCategories = [
    { id: 1, name: 'Fashion' },
    { id: 2, name: 'Books' },
  ];

  let singleCategory = {
    id: 1,
    name: 'Fashion',
  };
  let error = "internal Error"

  let categoryCreated = 'Category added Successfully';
  let deleteCategory = 'item was deleted';
  let categoryUpdate = 'Item Updated Successfully';

  it('should test the getAllCategories Method', async () => {
    let spy = jest.spyOn(db.category, 'findAll').mockImplementation(() => {
      return new Promise((resolve, reject) => {
        resolve(allCategories);
        // reject(error)
      });
    });
    await categoryController.getAllCategories(req, res);

    expect(spy).toHaveBeenCalled();
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith((allCategories));
  });

  xit('should test getCategoryId', async () => {
    let spy = jest.spyOn(db.category, 'findOne').mockImplementation(() => {
      return new Promise((resolve, reject) => {
        resolve(singleCategory);
      });
    });
    req.params.categoryId = 1;
    await categoryController.getCategoriesById(req, res);

    expect(spy).toHaveBeenCalled();
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.send).toHaveBeenCalledWith(singleCategory);
  });
  xtest('should test addValue ', async () => {
    let spy = jest.spyOn(db.category, 'create').mockImplementation(() => {
      return new Promise((resolve, reject) => {
        resolve(categoryCreated);
      });
    });
    req.body = { name: 'Sports' };
    await categoryController.addValue(req, res);
    expect(spy).toHaveBeenCalled();
    expect(res.status).toHaveBeenCalledWith(201);
    expect(res.send).toHaveBeenCalledWith(categoryCreated);
  });
  xtest('should test deleteCategory ', async () => {
    let spy = jest.spyOn(db.category, 'destroy').mockImplementation(() => {
      return new Promise((res, rej) => {
        res(deleteCategory);
      });
    });
    req.params.id = 2;
    await categoryController.deletecategory(req, res);

    expect(spy).toHaveBeenCalled();
    expect(res.status).toHaveBeenCalledWith(204);
    expect(res.send).toHaveBeenCalledWith(deleteCategory);
  });
  xtest('test a UpdateCategory ', async () => {
    let spy = jest.spyOn(db.category, 'update').mockImplementation(() => {
      return new Promise((res, rej) => {
        res(categoryUpdate);
      });
    });
    req.params.CatId = 2;
    req.body.name = 'omkar';
    await categoryController.updateCategory(req, res);

    expect(spy).toHaveBeenCalled();
    expect(res.status).toHaveBeenCalledWith(202);
    expect(res.send).toHaveBeenCalledWith(categoryUpdate);
  });
});
