const AllController = require('../controllers/all.controller');

module.exports = app => {

    var router = require("express").Router();

    router.get('/', AllController.getAllData);
    router.get('/:slug', AllController.getOne);
    router.get('/:slug/potensi', AllController.getAllPotensi);
    router.get('/:slug/:id', AllController.getOnePotensi);

    app.use('/api/all', router);
};

