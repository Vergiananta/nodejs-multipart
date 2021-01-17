const getCategoryList = async (req, res, service) => {
    try {
        let categories;
        if (req.query.id) {
            const id = req.query.id;
            categories = await service.getCategoryById(id)
        } else {
            categories = await service.getAllCategory();
        }
        res.send(categories);
    } catch (error) {
        res.status(500);
    }
};

const createCategory = async (req, res, service) => {
    let categories;
    if (req.body) {
        const json = req.body;
        const input = JSON.parse(JSON.stringify(json))
        categories = await service.createCategory(input);
    }
    res.send(categories);
}

const deleteCategory = async (req, res, service) => {
    let categories;
    if (req.query.id) {
        const id = req.query.id;
        categories = await service.deleteCategory(id);
    }
    res.send(categories);
}

const updateCategory = async (req, res, service) => {
    
    const json = req.body;
    const input = JSON.parse(JSON.stringify(json))
    categories = await service.updateCategory(input);
    res.send(categories);
}

module.exports = { getCategoryList, createCategory, deleteCategory, updateCategory };