const { Potensi } = require("../models/potensi.model");

const asyncMiddleware = fn => (req, res, next) => {
    Promise.resolve(fn(req, res, next)).catch(next);
};

exports.createPotensi = asyncMiddleware(async (req, res) => {
    // console.log('Request body:', req.body);
    const potensi = await Potensi.create(req.body);
    res.status(200).json({ potensi });
});

exports.getAllPotensi = asyncMiddleware(async (req, res) => {
    const potensi = await Potensi.getAll();
    res.status(200).json({ potensi });
});

exports.getPotensi = asyncMiddleware(async (req, res) => {
    const das = await Potensi.get(req.params.id);
    if (!das.length) {
        return res.status(404).json({ error: 'Potensi Sub DAS not found' });
    }
    res.status(200).json({das});
});

exports.getDasPotensi = asyncMiddleware(async (req, res) => {
    const das = await Potensi.getDas(req.params.id);
    if (!das.length) {
        return res.status(404).json({ error: 'Sub DAS not found' });
    }
    res.status(200).json({das});
});

exports.updatePotensi = asyncMiddleware(async (req, res) => {
    const potensi = await Potensi.update(req.params.id, req.body);
    if(potensi.affectedRows === 0){
        return res.status(404).json({ error: 'Potensi not found' });
    }
    res.status(200).json({ potensi });
});

exports.deletePotensi = asyncMiddleware(async (req, res) => {
    const potensi = await Potensi.delete(req.params.id);
    if (potensi.affectedRows === 0) {
        return res.status(404).json({ error: 'Potensi not found' });
    }
    res.status(200).json({ potensi });
});