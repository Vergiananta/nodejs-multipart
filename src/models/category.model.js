const Sequelize = require('sequelize')
const connection = require('../../dbConn')
        //              DENGAN SEQUELIZE
//paranoid untuk mengganti status, pengganti delete
const Category = connection.define('category', {
    id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV1,
        allowNull: false,
        primaryKey: true,
    },
    categoryName: {
        type: Sequelize.STRING,
    }
}, {
    freezeTableName: true,
    tableName: 'category',
    paranoid: true,
});

module.exports = Category;