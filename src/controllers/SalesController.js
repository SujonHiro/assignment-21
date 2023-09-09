const SaleModel=require("../model/SalesModel")

//create Sales
exports.createSales = async (req, res) => {
    try {
        const reqBody = req.body;
        const result =await SaleModel.create(reqBody)
        res.status(200).json({
            success: true,
            message: 'Data Inserted Successfully',
            data: result // Optionally, you can include the inserted data in the response
        });

    } catch (error) {
        res.status(200).json({
            success: true,
            message: 'Data Inserted Successfully',
            data: error, // Optionally, you can include the inserted data in the response
        });
    }
}