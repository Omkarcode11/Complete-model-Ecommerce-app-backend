let sequelizeCon = require('../config/db.config');
let db = require('./../model/index');

let getAllCategories = async (req, res, next) => {
  try {
    let allCategories = await db.category.findAll();
    // res.writeHead(200, { 'Content-Type': 'application/json' });
    res.status(200);
    res.json(allCategories);
  } catch (err) {
    res.status(400);
    res.json('internal Error');
  }
};
let getCategoriesById = async (req, res, next) => {
  let category = await db.category.findOne({
    where: {
      id: req.params.id,
    },
  });
  console.log(category)
  res.status(200).send(category);
  return;
};
let addValue = async (req, res, next) => {
  try {
    let data = req.body.name;
    await db.category.create({ name: data });
    res.status(201).send('Category added Successfully');
    res.end();
  } catch (err) {
    res.status(400).send("Not Working ");
  }
};

let deletecategory = async (req, res, next) => {
  try {
    await db.category.destroy({
      where: {
        id: req.params.id,
      },
    });
    res.send('item was deleted').status(204);
    res.end();
  } catch (err) {
    res.status(400).send('NO such Id Valid in this id in there ');
  }
};

let updateCategory = async (req, res, next) => {
  try {
    let ids = req.params.CatId;
    let categoryUpdate = {
      name: req.body.name,
    };
    await db.category.update(categoryUpdate, { where: { id: ids } });
    res.send('Item Updated Successfully').status(202);
    res.end();
  } catch (err) {
    next(err);
  }
};

let all = { getAllCategories, getCategoriesById, addValue, deletecategory, updateCategory };
module.exports = all;
