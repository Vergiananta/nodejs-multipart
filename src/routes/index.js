const express = require('express');
const router = express.Router();

const categoryRoutes = require('./category.route');
const productRoutes = require('./produk.route')
const authRoutes = require('./auth.route')
const noRoute = require('./no.route');
const logRoute = require('./log.route');
const swaggerUi = require('swagger-ui-express');
const swaggerDocuments = require('../../swagger.json')

router.use(logRoute);
router.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocuments))
router.use('/auth', authRoutes);
router.use('/category', categoryRoutes);
router.use('/product', productRoutes)
router.use(noRoute);

module.exports = router;