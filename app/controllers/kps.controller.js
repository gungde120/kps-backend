const { dataKps, Kps } = require("../models/kps.model");

const asyncMiddleware = fn => (req, res, next) => {
    Promise.resolve(fn(req, res, next)).catch(next);
};

exports.createKps = asyncMiddleware(async (req, res) => {
    const kps = await Kps.create(req.body, req.file);
    res.status(200).json({ kps });
});

exports.getAllKps = asyncMiddleware(async (req, res) => {
    const kps = await Kps.getAll();
    res.status(200).json({ kps });
});

exports.getKps = asyncMiddleware(async (req, res) => {
    const kps = await Kps.get(req.params.id);
    if (!kps.length) {
        return res.status(404).json({ error: 'Kps not found' });
    }
    res.status(200).json(kps[0]);
});

exports.getKpsById = asyncMiddleware(async (req, res) => {
    const kps = await Kps.getById(req.params.id);
    if (!kps.length) {
        return res.status(404).json({ error: 'Kps not found' });
    }
    res.status(200).json(kps[0]);
});

exports.updateKps = asyncMiddleware(async (req, res) => {
    const data = dataKps(req.body, req.file);
    const getkps = await Kps.getById(req.params.id);

    //If didnt upload file, then using existing file
    if (!req.file) {
        data.logo_kps = getkps[0].logo_kps;
    }

    const kps = await Kps.update(req.params.id, req.body, req.file);
    if(kps.affectedRows === 0){
        return res.status(404).json({ error: 'Kps not found' });
    }
    res.status(200).json({ kps });
});

exports.deleteKps = asyncMiddleware(async (req, res) => {
    const kps = await Kps.delete(req.params.id);
    if (kps.affectedRows === 0) {
        return res.status(404).json({ error: 'Kps not found' });
    }
    res.status(200).json({ kps });
});