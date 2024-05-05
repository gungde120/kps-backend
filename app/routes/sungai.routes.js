const { authJwt } = require("../middleware");
const SungaiController = require('../controllers/sungai.controller');

module.exports = app => {
    app.use(function(req, res, next) {
        res.header(
            "Access-Control-Allow-Headers",
            "x-access-token, Origin, Content-Type, Accept"
        );
        next();
    });

    var router = require("express").Router();
    var key = [authJwt.verifyToken];

    // router.post('/', key, SungaiController.createSungai);
    router.get('/', SungaiController.getAllSungai);
    router.get('/:id', SungaiController.getSungai);
    // router.put('/:id', key, SungaiController.updateSungai);
    // router.delete('/:id', key, SungaiController.deleteSungai);

    app.use('/api/sungai', router);
};