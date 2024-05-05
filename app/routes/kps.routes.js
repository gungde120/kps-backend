const { authJwt } = require("../middleware");
const { upload } = require('../models/kps.model');
const KpsController = require('../controllers/kps.controller');

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

    router.post('/', key, upload.single('logo_kps'), KpsController.createKps);
    router.get('/', KpsController.getAllKps);
    router.get('/:id', KpsController.getKps);
    router.get('/id/:id', KpsController.getKpsById);
    router.put('/:id', key, upload.single('logo_kps'), KpsController.updateKps);
    router.delete('/:id', key, KpsController.deleteKps);

    app.use('/api/kps', router);
};