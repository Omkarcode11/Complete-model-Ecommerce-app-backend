const Categories = require('../model/Category');
const Products = require('../model/Products');

const validateReqForCategoryName = (req, res, next) => {
  if (!req.body.name) {
    res.status(400).send({
      massage: 'Category name is required',
    });
  }
  next();
};

const validateReqForCategoryId = async (req, res, next) => {
  let categoryId = req.params.id;
  if (categoryId) {
    let category = await Categories.findByPk(categoryId);
    next();
    if (!category) {
      res.status(400).send({
        message: 'Category does not exist',
      });
      res.end();
      // next()
    }
  } else {
    res.status(400).send({ message: 'Category is messing' });
  }
};

let validateForId = async (req, res, next) => {
  let id = req.params.id;
  if (!id || id == []) {
    res.status(400).send({
      message: 'Category does not exits',
    });
    res.end();
  }
  if (id) {
    let data = await Products.findOne({
      where: {
        categoryId: id,
      },
    });
    if (data.length == 0) {
      res.status(400).send({
        message: 'Categories  does not exist',
      });
      res.end();
    }
  }
  next();
};
module.exports = { validateReqForCategoryName, validateReqForCategoryId, validateForId };
