const pool = require("./db.js");
const multer = require("multer");
const path = require("path");

function dataPotensiDas(data, file) {
  data.potensi_id = data.potensi_id;
  data.das_id = data.das_id;
  data.user_id = data.user_id;
  data.potensi_das_name = data.potensi_das_name;
  data.deskripsi = data.deskripsi;
  if (file) {
    data.thumbnail = file.filename;
  } else {
    data.thumbnail = data.thumbnail;
  }
  return data;
}

// const storage = multer.diskStorage({
//   destination: path.join(
//     __dirname + "./../../../../kps-frontend/public/images/potensi/"
//   ),
//   filename: function (req, file, cb) {
//     cb(null, file.fieldname + "-" + file.originalname);
//   },
// });

// const upload = multer({ storage });

const promiseQuery = (text, params) => {
  return new Promise((resolve, reject) => {
    pool.query(text, params, (err, res) => {
      if (err) reject(err);
      else resolve(res.rows);
    });
  });
};

const PotensiDas = {
  create: function (data, file) {
    data = dataPotensiDas(data, file);
    let sql =
      "INSERT INTO potensi_das (potensi_id, das_id, user_id, potensi_das_name, deskripsi, thumbnail) VALUES ($1, $2, $3, $4, $5, $6)";
    return promiseQuery(sql, [
      data.potensi_id,
      data.das_id,
      data.user_id,
      data.potensi_das_name,
      data.deskripsi,
      data.thumbnail,
    ]);
  },

  getAll: function () {
    let sql =
      "SELECT potensi_das.id, potensi_das.thumbnail, das.das_name, potensi_das.potensi_das_name, potensi.potensi_name, potensi_das.deskripsi FROM potensi_das JOIN potensi on potensi.potensi_id = potensi_das.potensi_id LEFT JOIN das ON das.das_id = potensi_das.das_id ORDER BY potensi_das.id";
    return promiseQuery(sql);
  },

  get: function (id) {
    let sql = `SELECT potensi_das.id, potensi_das.thumbnail, potensi_das.potensi_das_name, potensi.potensi_name, potensi_das.deskripsi FROM potensi_das JOIN potensi on potensi.potensi_id = potensi_das.potensi_id WHERE potensi_das.das_id = $1`;
    return promiseQuery(sql, [id]);
  },

  getById: function (id) {
    let sql = `SELECT potensi_das.id, potensi_das.thumbnail, kps.logo_kps, das.das_name, das.das_id, potensi_das.potensi_das_name, potensi.potensi_id, potensi.potensi_name, potensi_das.deskripsi FROM potensi_das JOIN potensi on potensi.potensi_id = potensi_das.potensi_id LEFT JOIN das on potensi_das.das_id = das.das_id LEFT JOIN kps on kps.das_id = das.das_id WHERE potensi_das.id = $1`;
    return promiseQuery(sql, [id]);
  },

  update: function (id, data, file) {
    data = dataPotensiDas(data, file);
    let sql =
      "UPDATE potensi_das SET potensi_id = $1, das_id = $2, user_id = $3, potensi_das_name = $4, deskripsi = $5, thumbnail = $6 WHERE id = $7";
    return promiseQuery(sql, [
      data.potensi_id,
      data.das_id,
      data.user_id,
      data.potensi_das_name,
      data.deskripsi,
      data.thumbnail,
      id,
    ]);
  },

  delete: function (id) {
    let sql = "DELETE FROM potensi_das WHERE id = $1";
    return promiseQuery(sql, [id]);
  },
};

// module.exports = { dataPotensiDas, PotensiDas, upload };
module.exports = { dataPotensiDas, PotensiDas };
