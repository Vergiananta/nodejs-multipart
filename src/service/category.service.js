const connection = require('../../dbConn');
const errorType = require('../constant/error-event.constant');
//                  DENGAN SEQUELIZE
const Product = require('../models/product.model');
const Category = require('../models/category.model');
const logEvent = require('../event/myEmitter')

class CategoryService {
    async getAllCategory(){
        //             TANPA SEQUELIZE
        // const categoryList = new Promise((resolve, reject) => {
        //     connection.query('SELECT * FROM mst_category',
        //     (err, rows, fields) => {
        //         if (err) {
        //             reject(err);
        //         } else {
        //             resolve(rows);
        //         }
        //     });
        // });

        let result;
        try {
            //          DENGAN SEQUELIZE
            result = await Category.findAll({include: Product})
            //          TANPA SEQUELIZE
            // result = await categoryList;
        } catch (error) {
            logEvent.emit(errorType.ERROR, {
                logTitle: 'FAILED GET ALL',
                logMessage: error
            });
        }

        return result;
    }

    async getCategoryById(id){

        //                  TANPA SEQUELIZE
        // const categoryList = new Promise((resolve, reject) => {
        //     connection.query(`SELECT * FROM mst_category WHERE id = ?`, id,
        //     (err, rows, fields) => {
        //         if (err) {
        //             reject(err);
        //         } else {
        //             resolve(rows);
        //         }
        //     });
        // });

        let result;
        try {
            //          DENGAN SEQUELIZE
            result = await Category.findOne({include:Product, where:{id: id}} )
            //          TANPA SEQUELIZE
            // result = await categoryList;
        } catch (error) {
            logEvent.emit(errorType.ERROR, {
                logTitle: 'FAILED CATEGORY BY ID',
                logMessage: error
            })
        }
        return result;
    }

    async createCategory(input){
        // const categoryList = new Promise((resolve, reject) => {
        //     const jsonData = {
        //         id: input.id,
        //         nama_category: input.nama_category
        //     }
        //     connection.query(`INSERT INTO mst_category set ?`, jsonData,
        //     (err, rows, fields) => {
        //         if (err) {
        //             reject(err);
        //         } else {
        //             resolve(rows);
        //         }
        //     });
        // });

        let result;
        try {
            //          DENGAN SEQUELIZE 
            result = await Category.create(input);
            //          TANPA SEQUELIZE
            // result = await categoryList;
        } catch (error) {
            logEvent.emit(errorType.ERROR, {
                logTitle: 'FAILED CREATE CATEGORY',
                logMessage: error
            })
        }
        return result;
    }

    async deleteCategory(id) {
        // const categoryList = new Promise((resolve, reject) => {
        //     connection.query(`DELETE FROM mst_category WHERE id = ?`, id,
        //     (err, rows, fields) => {
        //         if (err) {
        //             reject(err);
        //         } else {
        //             resolve(rows);
        //         }
        //     });
        // });

        let result;
        try {
            result = await Category.destroy({where:{id: id}}).then(() => {console.log('Delete Succesfully');
            });
            //              TANPA SEQUELIZE
            // result = await categoryList;
        } catch (error) {
            logEvent.emit(errorType.ERROR, {
                logTitle: 'FAILED DELETE CATEGORY',
                logMessage: error
            })
        }
        return result;
    }

    async updateCategory(input){
        // const categoryList = new Promise((resolve, reject) => {
        //     connection.query(`UPDATE mst_category set nama_category = ? WHERE id = ? `, [input.nama_category, input.id],
        //     (err, rows, fields) => {
        //         if (err) {
        //             reject(err);
        //         } else {
        //             resolve(rows);
        //         }
        //     });
        // });

        let result;
        try {
            result = await Category.update({categoryName: input.categoryName},{ where: {id: input.id}});
            //          TANPA SEQUELIZE
            // result = await categoryList;
        } catch (error) {
            logEvent.emit(errorType.ERROR, {
                logTitle: 'FAILED UPDATE CATEGORY',
                logMessage: error
            })
        }
        return result;
    }
}

module.exports = CategoryService;