const { authJwt } = require("../middleware");
const { PotensiDas } = require('../models/potensi.das.model');
// const { PotensiDas, upload } = require('../models/potensi.das.model');
const PotensiDasController = require('../controllers/potensi.das.controller');

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

    // router.post('/', key, upload.single('thumbnail'), PotensiDasController.createPotensiDas);
    router.post('/', key, PotensiDasController.createPotensiDas);
    router.get('/', PotensiDasController.getAllPotensiDas);
    router.get('/:id', PotensiDasController.getPotensiDas);
    router.get('/id/:id', PotensiDasController.getPotensiDasById);
    router.put('/:id', key, PotensiDasController.updatePotensiDas);
    // router.put('/:id', key, upload.single('thumbnail'), PotensiDasController.updatePotensiDas);
    router.delete('/:id', key, PotensiDasController.deletePotensiDas);

    app.use('/api/potensi-das', router);
};
