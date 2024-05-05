const { Sungai } = require("../models/sungai.model");

const asyncMiddleware = fn => (req, res, next) => {
    Promise.resolve(fn(req, res, next)).catch(next);
};

exports.createSungai = asyncMiddleware(async (req, res) => {
    const sungai = await Sungai.create(req.body);
    res.status(200).json({ sungai });
});

exports.getAllSungai = asyncMiddleware(async (req, res) => {
    const sungai = await Sungai.getAll();
    res.status(200).json({ sungai });
});

exports.getSungai = asyncMiddleware(async (req, res) => {
    const das = await Sungai.get(req.params.id);
    if (!das.length) {
        return res.status(404).json({ error: 'Sub DAS in sungai not found' });
    }
    res.status(200).json({ das });
});

exports.updateSungai = asyncMiddleware(async (req, res) => {
    const sungai = await Sungai.update(req.params.id, req.body);
    if(sungai.affectedRows === 0){
        return res.status(404).json({ error: 'Sungai not found' });
    }
    res.status(200).json({ sungai });
});

exports.deleteSungai = asyncMiddleware(async (req, res) => {
    const sungai = await Sungai.delete(req.params.id);
    if (sungai.affectedRows === 0) {
        return res.status(404).json({ error: 'Sungai not found' });
    }
    res.status(200).json({ sungai });
});