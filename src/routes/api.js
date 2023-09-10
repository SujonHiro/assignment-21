const express = require('express');
//const seedSales = require("../controllers/SeedController");
const {createSales, allData, getTotalRevenue, totalSelByProductId, getQuantityByProduct, salesTopProducts,
    saleAvaragePrice
} = require("../controllers/SalesController");
const router = express.Router();

//router.post('/seedSale',seedSales);
router.post('/createSale',createSales);
router.get('/allData',allData);
router.get('/getTotalRevenue',getTotalRevenue);
router.get('/totalSelByProductId',totalSelByProductId);
router.get('/getQuantityByProduct',getQuantityByProduct);
router.get('/salesTopProducts',salesTopProducts);
router.get('/saleAvaragePrice',saleAvaragePrice);



module.exports = router;