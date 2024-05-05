const { All } = require("../models/all.model");

const asyncMiddleware = fn => (req, res, next) => {
    Promise.resolve(fn(req, res, next)).catch(next);
};

exports.getAllData = asyncMiddleware(async (req, res) => {
    const result = await All.getAll();
    res.status(200).json({ result });
});

exports.getOne = asyncMiddleware(async (req, res) => {
    const data = await All.get(req.params.slug);
    if (!data.length) {
        return res.status(404).json({ error: 'Data not found' });
    }
    res.status(200).json(data[0]);
});

exports.getAllPotensi = asyncMiddleware(async (req, res) => {
    const data = await All.getAllKpsPotensi(req.params.slug);
    if (!data.length) {
        return res.status(404).json({ error: 'Data not found' });
    }
    res.status(200).json({ data });
});

exports.getOnePotensi = asyncMiddleware(async (req, res) => {
    const data = await All.getKpsPotensi(req.params.slug, req.params.id);
    if (!data.length) {
        return res.status(404).json({ error: 'Data not found' });
    }
    res.status(200).json(data[0]);
});