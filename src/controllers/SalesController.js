const SalesModel = require("../model/SalesModel");

// Create Sales
exports.createSales = async (req, res) => {
    try {
        const reqBody = req.body;
        const result = await SalesModel.create(reqBody);
        res.status(201).json({
            success: true,
            message: 'Data Inserted Successfully',
            data: result // Include the inserted data in the response
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            message: 'Failed to insert data',
            error: error.message // Include the error message in the response
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
            data: totalSaleByProductId // Include the inserted data in the response
        });

    } catch (error) {
        res.status(200).json({
            data: error
        });
    }
}

// Controller function to find and return the total quantity sold for each product
exports.getQuantityByProduct = async (req, res) => {
    try {
        const result = await SalesModel.aggregate([
            {
                $group: {
                    _id: '$_id',
                    totalQuantity: { $sum: '$quantity' },
                },
            },
        ]);

        if (result.length === 0) {
            return res.status(404).json({ message: 'No sales data found' });
        }
        res.status(200).json(result);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
};