const express = require('express');
const router = express.Router();
const CategoryService = require('../service/category.service');
const categoryController = require('../controller/category.controller');
const { route } = require('../middlewaves/app-middlewares');
const tokenValidation = require('../middlewaves/token.validation')

const categoryService = new CategoryService();

// router.use(tokenValidation);
router.get('/', (req, res, next) => categoryController.getCategoryList(req, res, categoryService));
router.post('/', (req, res, next) => categoryController.createCategory(req, res, categoryService));
router.delete('/', (req, res, next) => categoryController.deleteCategory(req, res, categoryService));
router.put('/', (req, res, next) => categoryController.updateCategory(req, res, categoryService));

module.exports = router;