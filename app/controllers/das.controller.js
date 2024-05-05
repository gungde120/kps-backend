const { dataDas, Das } = require("../models/das.model");

const asyncMiddleware = fn => (req, res, next) => {
    Promise.resolve(fn(req, res, next)).catch(next);
};

exports.createDas = asyncMiddleware(async (req, res) => {
    const das = await Das.create(req.body, req.file);
    res.status(200).json({ das });
});

exports.getAllDas = asyncMiddleware(async (req, res) => {
    const das = await Das.getAll();
    res.status(200).json({ das });
});

exports.getAllNullDas = asyncMiddleware(async (req, res) => {
    const das = await Das.getAllNull();
    res.status(200).json({ das });
});

exports.getDas = asyncMiddleware(async (req, res) => {
    const das = await Das.get(req.params.id);
    if (!das.length) {
        return res.status(404).json({ error: 'Das not found' });
    }
    res.status(200).json(das[0]);
});

exports.updateDas = asyncMiddleware(async (req, res) => {
    const data = dataDas(req.body, req.file);
    const getdas = await Das.get(req.params.id);

    //If didnt upload file, then using existing file
    if (!req.file) {
        data.thumbnail = getdas[0].thumbnail;
    }

    const das = await Das.update(req.params.id, req.body, req.file);

    if(das.affectedRows === 0){
        return res.status(404).json({ error: 'Das not found' });
    }
    res.status(200).json({ das });
});

exports.deleteDas = asyncMiddleware(async (req, res) => {
    const das = await Das.delete(req.params.id);
    if (das.affectedRows === 0) {
        return res.status(404).json({ error: 'Das not found' });
    }
    res.status(200).json({ das });
});