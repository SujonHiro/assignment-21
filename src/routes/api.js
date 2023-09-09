const express = require('express');
const seedSales = require("../controllers/SeedController");
const {createSales} = require("../controllers/SalesController");
const router = express.Router();

router.post('/seedSale',seedSales);
router.post('/createSale',createSales);


module.exports = router;