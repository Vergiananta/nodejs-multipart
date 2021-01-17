const category = require('./category.model');
const product = require('./product.model');
//              UNTUK MENGHUBUNGKAN ANTAR TABEL
const dbAssociations = function dbAssociations(){
    category.hasMany(product);
    product.belongsTo(category);
};

module.exports = dbAssociations;