const Sequlize = require('sequelize');
const connection = require('../../dbConn')
//                          DENGAN SEQUELIZE
const Product = connection.define('product', {
    id: {
        type: Sequlize.UUID,
        defaultValue: Sequlize.UUIDV1,
        allowNull: true,
        primaryKey: true
    },
    productName: {
        type: Sequlize.STRING
    }, 
    productImage: {
        type: Sequlize.STRING
    }
}, {
    freezeTableName: true,
    tableName: 'product',
    paranoid: true
});
console.log("model Product",Product);

module.exports = Product