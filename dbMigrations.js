const connection = require('./dbConn');
const Product = require('./src/models/product.model');
const Category = require('./src/models/category.model')
const dbAssociations = require('./src/models/index');
const SysUser = require('./src/models/user.model')
const bcrypt = require('bcryptjs')
// db migration untuk automation ke database nya dan tidak ada hubungannya dengan postman
async function migration(){
    dbAssociations();
    await connection.sync({force: true});
    let category01 = await Category.create({categoryName: 'Bumbu Dapur'});
    let category02 = await Category.create({categoryName: 'Furnitur'});

    // let prod01 = await Product.create({
    //     productCode: 'ABC', productName: 'Minyak Goreng'
    // }); prod01.setCategory(category01);

    // let prod02 = await Product.create(
    //     {productCode: 'DEF', productName: 'Garam'});
    //     prod02.setCategory(category01);

    // let prod03 = await Product.create(
    //     {productCode: 'XYZ', productName: 'Meja Makan'});
    //     prod03.setCategory(category02);

    // let prod04 = await Product.create(
    //     {productCode: 'UCV', productName: 'Meja Belajar'}
    // ); prod04.setCategory(category02);

    var passwordHash = bcrypt.hashSync('vergiTampan', 11);
    await SysUser.create(
        { userName: 'vergi', userPassword: passwordHash, fullName: 'vergi cruise', email: 'vergironaldo@gmail.com'}
    );
}

migration();