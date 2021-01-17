const getProductList = async (req, res, service) => {
    try {
        let products;
        if (req.query.id) {
            const id = req.query.id;
            products = await service.getProductById(id);
        } else if(req.query.pageNo && req.query.rowPage){
            products = await service.getAllProductPaging(req.query.pageNo, 
                req.query.rowPage);
        } else {
            products = await service.getAllProduct();
        }
        res.send(products);
    } catch (error) {
        res.sendStatus(500)
    }
}

const createProduct = async (req, res, service) => {
    const input = req.body;
    let createProduct = await service.createProduct(input);
    res.send(createProduct);
}

const updateProduct = async (req, res, service) => {
    const input = req.body;
    let updateProduct = await service.updateProduct(input);
    res.send(updateProduct);
}

const deleteProduct = async (req, res, service) => {
    const id = req.query.id;
    let deleteProduct = await service.deleteProduct(id);
    res.send(deleteProduct);
}


const uploadImage = async (req, res, service) => {
    const productName = req.body.productName;
    const categoryId = req.body.categoryId;
    const files = req.file;
    console.log("product controller", productName);
    console.log("product controller", categoryId);
    console.log("product file controller", files);
    let uploadFile = await service.uploadImage(files, productName, categoryId);
    res.send(uploadFile);
}

const getImage = async (req, res, service) => {
    const id = req.params.id;
    console.log("image controller", id);
    
    let getImage = await service.getImage(id);
    res.send(getImage);
}


module.exports = {getProductList, deleteProduct, createProduct, updateProduct, uploadImage, getImage};