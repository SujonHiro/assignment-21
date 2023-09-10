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
