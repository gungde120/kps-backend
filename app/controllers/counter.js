const Counter = require("../models/counter.js");

exports.findAll = (req, res) => {

    Counter.getAll((err, data) => {
        if (err)
        res.status(500).send({
            message:
            err.message || "Some error occured while retrieving counter."
        });
        else res.send(data);
    });
};