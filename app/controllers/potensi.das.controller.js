const { dataPotensiDas, PotensiDas } = require("../models/potensi.das.model");

const asyncMiddleware = fn => (req, res, next) => {
    Promise.resolve(fn(req, res, next)).catch(next);
};

exports.createPotensiDas = asyncMiddleware(async (req, res) => {
    const potensidas = await PotensiDas.create(req.body, req.file);
    res.status(200).json({ potensidas });
});

exports.getAllPotensiDas = asyncMiddleware(async (req, res) => {
    const potensidas = await PotensiDas.getAll();
    res.status(200).json({ potensidas });
});

exports.getPotensiDas = asyncMiddleware(async (req, res) => {
    const potensidas = await PotensiDas.get(req.params.id);
    if (!potensidas.length) {
        return res.status(404).json({ error: 'Potensi Das not found' });
    }
    res.status(200).json({ potensidas });
});

exports.getPotensiDasById = asyncMiddleware(async (req, res) => {
    const potensidas = await PotensiDas.getById(req.params.id);
    if (!potensidas.length) {
        return res.status(404).json({ error: 'Potensi Das not found' });
    }
    res.status(200).json(potensidas[0]);
});

exports.updatePotensiDas = asyncMiddleware(async (req, res) => {
    const data = dataPotensiDas(req.body, req.file);
    const getpotensidas = await PotensiDas.getById(req.params.id);

    //If didnt upload file, then using existing file
    if (!req.file) {
        data.thumbnail = getpotensidas[0].thumbnail;
    }

    const potensidas = await PotensiDas.update(req.params.id, req.body, req.file);
    
    if(potensidas.affectedRows === 0){
        return res.status(404).json({ error: 'Potensi Das not found' });
    }
    res.status(200).json({ potensidas });
});

exports.deletePotensiDas = asyncMiddleware(async (req, res) => {
    const potensidas = await PotensiDas.delete(req.params.id);
    if (potensidas.affectedRows === 0) {
        return res.status(404).json({ error: 'Potensi Das not found' });
    }
    res.status(200).json({ potensidas });
});