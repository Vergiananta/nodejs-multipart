const userAuthentication = async (req, res, service) => {
    try {
        const user = req.body;
        // SERVICE
        const userInfo = await service.authentication(user);
        if (userInfo) {
            res.send(userInfo);
        } else {
            res.sendStatus(401);
        }
    } catch (error) {
        res.sendStatus(500);
    }
};

module.exports = {userAuthentication};