const connection = require('../../dbConn')
const logEvent = require('../event/myEmitter')
const errorType = require('../constant/error-event.constant');
//                  DENGAN SEQUELIZE
const Product = require('../models/product.model');
const Category = require('../models/category.model');


class ProductService {
    async getAllProduct(){
        //             TANPA SEQUELISE
        // const productList = new Promise((resolve, reject) => {
        //     connection.query('SELECT * FROM mst_product', (err, rows, fields) => {
        //         if (err) {
        //             reject(err);
        //         } else {
        //             resolve(rows);
        //         }
        //     });
        // });

        let result;
        try {
            // DENGAN SEQUELISE
            result = await Product.findAll({include:Category})
            //      TANPA SEQUELISE
            // result = await productList;
        } catch (error) {
            logEvent.emit(errorType.ERROR, {
                logTitle: 'FAILED GET ALL',
                logMessage: error
            })
        }
        return result;
    }

    async getAllProductPaging(offset, limit){
        let result;
        try {
            result = await Product.findAndCountAll({offset: Number(offset), limit: Number(limit), include : Product})
        } catch (error) {
            logEvent.emit(errorType.ERROR, {
                logTitle: 'FAILED PAGINATION',
                logMessage: error
            })
        }
    }

    async getProductById(id){
        // const productList = new Promise((resolve, reject) => {
        //     connection.query('SELECT * FROM mst_product WHERE id = ?', id, (err, rows, fields) => {
        //         if (err) {
        //             reject(err);
        //         } else {
        //             resolve(rows);
        //         }
        //     });
        // });

        let result;
        try {
            // DENGAN SEQUELISE
            result = await Product.findOne({include: Category},{where: {id: id}})
            // TANPA SEQUELISE
            // result = await productList;
        } catch (error) {
            logEvent.emit(errorType.ERROR, {
                logTitle: 'FAILED GET BY ID',
                logMessage: error
            })
        }
        return result;
    }

    async getImage(id){
        let result;
        try {
            result = await Product.findByPk(id);
        } catch (error) {
            logEvent.emit(errorType.ERROR, {
                logTitle: 'FAILED GET IMAGE',
                logMessage: error
            })
        }
        console.log("result", result);
        
        return result;
    }

    async uploadImage(files,productName,categoryId){
        let result;
        console.log("services file ", files);
        console.log("services body ", productName);;
        console.log("services body ", categoryId);;

        try {
            result = await Product.create({
                productName: productName,
                productImage: files.filename,
                categoryId: categoryId,
            })
            console.log("result upload ", result);
            
        } catch (error) {
            logEvent.emit(errorType.ERROR, {
                logTitle: 'FAILED UPLOAD MULTIPART FILE',
                logMessage: error
            })
        }
        return result;
    }

   

    async createProduct(input){
        // const productList = new Promise((resolve, reject) => {
        //     const jsonData = {
        //         id: input.id,
        //         nama_product: input.nama_product,
        //         deskripsi_produk: input.deskripsi_produk
        //     }
        //     connection.query('INSERT INTO mst_product set ?', jsonData, 
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
            //     DENGAN SEQUELISE
            result = await Product.create(input);
            //      TANPA SEQUELISE
            // result = await productList;
        } catch (error) {
            logEvent.emit(errorType.ERROR, {
                logTitle: 'FAILED CREATE PRODUCT',
                logMessage: error
            })
        }
        return result;
    }


    async updateProduct(input){
        // const productList = new Promise((resolve, reject) => {
        //     connection.query(`UPDATE mst_product set nama_product = ?, deskripsi_produk = ? WHERE id = ?`, [input.nama_product, input.deskripsi_produk , input.id],
        //     (err,rows, fields) => {
        //         if (err) {
        //             reject(err);
        //         } else {
        //             resolve(rows);
        //         }
        //     });
        // });

        let result;
        try {
            //     DENGAN SEQUELISE
            const {id, ...body} = input;
            result = await Product.update(body,{where:{id:id}})
            //     TANPA SEQUELISE
            // result = await productList;
        } catch (error) {
            logEvent.emit(errorType.ERROR, {
                logTitle: 'FAILED UPDATE PRODUCT',
                logMessage: error
            })
        }
        return result;
    }

    async deleteProduct(id){
        // const productList = new Promise((resolve, reject) => {
        //     connection.query(`DELETE FROM mst_product WHERE id = ?`, id, 
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
            //          DENGAN SEQUELISE
            result = await Product.destroy({where: {id: id}}).then(() => {console.log('Product Deleted');
            })
            //         TANPA SEQUELISE
            // result = await productList;
        } catch (error) {
            logEvent.emit(errorType.ERROR, {
                logTitle: 'FAILED delete product',
                logMessage: error
            })
        }
        return result;
    }
}

module.exports = ProductService;