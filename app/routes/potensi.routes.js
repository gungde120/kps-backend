const { authJwt } = require("../middleware");
const PotensiController = require("../controllers/potensi.controller");

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

    router.post('/', key, PotensiController.createPotensi);
    router.get('/', PotensiController.getAllPotensi);
    router.get('/:id', PotensiController.getPotensi);
    router.get('/:id/das', PotensiController.getDasPotensi);
    router.put('/:id', key, PotensiController.updatePotensi);
    router.delete('/:id', key, PotensiController.deletePotensi);

    app.use('/api/potensi', router);
};