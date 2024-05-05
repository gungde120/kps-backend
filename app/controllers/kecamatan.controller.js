const { Kecamatan } = require("../models/kecamatan.model");

const asyncMiddleware = fn => (req, res, next) => {
    Promise.resolve(fn(req, res, next)).catch(next);
};

exports.createKecamatan = asyncMiddleware(async (req, res) => {
    const kecamatan = await Kecamatan.create(req.body);
    res.status(200).json({ kecamatan });
});

exports.getAllKecamatan = asyncMiddleware(async (req, res) => {
    const kecamatan = await Kecamatan.getAll();
    res.status(200).json({ kecamatan });
});

exports.getDasKecamatan = asyncMiddleware(async (req, res) => {
    const das = await Kecamatan.getDasByKecamatan(req.params.id);
    if (!das.length) {
        return res.status(404).json({ error: 'Das not found' });
    }
    res.status(200).json({ das });
});

exports.getKpsKecamatan = asyncMiddleware(async (req, res) => {
    const kps = await Kecamatan.getKpsByKecamatan(req.params.id);
    if (!kps.length) {
        return res.status(404).json({ error: 'Kps not found' });
    }
    res.status(200).json({ kps });
});

exports.updateKecamatan = asyncMiddleware(async (req, res) => {
    const kecamatan = await Kecamatan.update(req.params.id, req.body);
    if(kecamatan.affectedRows === 0){
        return res.status(404).json({ error: 'Kecamatan not found' });
    }
    res.status(200).json({ kecamatan });
});

exports.deleteKecamatan = asyncMiddleware(async (req, res) => {
    const kecamatan = await Kecamatan.delete(req.params.id);
    if (kecamatan.affectedRows === 0) {
        return res.status(404).json({ error: 'Kecamatan not found' });
    }
    res.status(200).json({ kecamatan });
});