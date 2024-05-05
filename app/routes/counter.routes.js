const { authJwt } = require("../middleware");

module.exports = app => {
    const Counter = require("../controllers/counter.js");

    var router = require("express").Router();

    router.get("/", Counter.findAll);

    app.use('/api/count', router);
};