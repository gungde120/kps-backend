const { authJwt } = require("../middleware");
const { Das } = require('../models/das.model');
// const { Das, upload } = require('../models/das.model');
const DasController = require('../controllers/das.controller');

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

    router.post('/', key, upload.single('thumbnail'), DasController.createDas);
    router.get('/', DasController.getAllDas);
    router.get('/null', DasController.getAllNullDas);
    router.get('/:id', DasController.getDas);
    router.put('/:id', key, upload.single('thumbnail'), DasController.updateDas);
    router.delete('/:id', key, DasController.deleteDas);

    app.use('/api/das', router);
};
