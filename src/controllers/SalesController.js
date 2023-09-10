const SalesModel = require("../model/SalesModel");

// Create Sales
exports.createSales = async (req, res) => {
    try {
        const reqBody = req.body;
        const result = await SalesModel.create(reqBody);
        res.status(201).json({
            success: true,
            message: 'Data Inserted Successfully',
            data: result
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            message: 'Failed to insert data',
            error: error.message
        });
    }
};
//all products
exports.allData = async (req, res) => {
    try {
        const data = await SalesModel.find();
        res.json(data);
    } catch (error) {
        res.status(201).json({
            data: error
        });
    }
};
//Total Revenue
exports.getTotalRevenue = async (req, res) => {
    try {
        const result = await SalesModel.aggregate([
            {
                $group: {
                    _id: null,
                    totalRevenue: { $sum: { $multiply: ['$quantity', '$price'] } },
                },
            },
        ]);

        if (result.length === 0) {
            return res.status(404).json({ message: 'No sales data found' });
        }

        res.status(200).json({ totalRevenue: result[0].totalRevenue });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

// total Sale By Product id
exports.totalSelByProductId = async(req,res) => {
    try {
        const totalSaleByProductId = await SalesModel.aggregate([
            {
                $group : {
                    _id : "$product",
                    totalSaleById : {$sum : "$quantity"}
                }
            }
        ])
        res.status(200).json({
            success: true,
            data: totalSaleByProductId
        });

    } catch (error) {
        res.status(200).json({
            data: error
        });
    }
}

// Get Quantity By Product
exports.getQuantityByProduct = async (req, res) => {
    try {
        const result = await SalesModel.aggregate([
            {
                $group: {
                    _id: { _id: '$_id', product: '$product' },
                    totalQuantity: { $sum: '$quantity' },
                },
            },
        ]);

        if (result.length === 0) {
            return res.status(404).json({ message: 'No sales data found' });
        }
        const formattedResult = result.map((item) => ({
            _id: item._id._id,
            product: item._id.product,
            totalQuantity: item.totalQuantity,
        }));

        res.status(200).json(formattedResult);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

// sales with top-products
exports.salesTopProducts = async(req, res) => {
    try {
        const topProductSales = await SalesModel.aggregate([
            {
                $group : {
                    _id: { _id: '$_id', product: '$product' },
                    totalRevenue : {$sum : {$multiply : ["$quantity", "$price"]}}
                }
            },
            {
                $sort: { totalRevenue: -1 },
            },
            {
                $limit: 5,
            },

        ]);
        const formattedResult = topProductSales.map((item) => ({
            _id: item._id._id,
            product: item._id.product,
            totalRevenue: item.totalRevenue,
        }));

        res.status(200).json(formattedResult);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
}
//Get Average Price
exports.saleAvaragePrice = async (req, res) => {
    try {
        const saleAvgPrice = await SalesModel.aggregate([
            {
                $group : {
                    _id :null,
                    averagePrice : {$avg : "$price"}
                }
            }
        ])
        res.status(200).json({ saleAvgPrice:saleAvgPrice })
    } catch (error) {
        res.status(200).json({
            success: false,
            data: error
        });
    }
}