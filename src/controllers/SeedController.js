const { SaleData } = require("../data"); // Adjust the path to your data file
const { SalesModel } = require('../model/SalesModel'); // Adjust the path to your model file

const seedSales = async (req, res) => {
    try {
       // await SalesModel.deleteMany({});
        const seedSale = await SalesModel.insertMany(SaleData); // Await the insertMany function

        res.status(200).json({
            success: true,
            message: 'Data Inserted Successfully',
            data: seedSale, // Optionally, you can include the inserted data in the response
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            message: 'Failed to insert data',
        });
    }
};

module.exports = seedSales;
