const { authJwt } = require("../middleware");
const KecamatanController = require('../controllers/kecamatan.controller');

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

    // router.post('/', key, KecamatanController.createKecamatan);
    router.get('/', KecamatanController.getAllKecamatan);
    router.get('/:id/das', KecamatanController.getDasKecamatan);
    router.get('/:id/kps', KecamatanController.getKpsKecamatan);
    // router.put('/:id', key, KecamatanController.updateKecamatan);
    // router.delete('/:id', key, KecamatanController.deleteKecamatan);

    app.use('/api/kecamatan', router);
};