const pool = require("./db.js");

function dataPotensi(data) {
  return {
    potensi_name: data.potensi_name,
    deskripsi: data.deskripsi,
  };
}

const promiseQuery = (text, params) => {
  return new Promise((resolve, reject) => {
    pool.query(text, params, (err, res) => {
      if (err) reject(err);
      else resolve(res.rows);
    });
  });
};

const Potensi = {
  create: function (data) {
    data = dataPotensi(data);
    let sql = "INSERT INTO potensi (potensi_name, deskripsi) VALUES ($1, $2)";
    return promiseQuery(sql, [data.potensi_name, data.deskripsi]);
  },

  getAll: function () {
    let sql =
      "SELECT potensi.potensi_id, potensi.potensi_name, potensi.deskripsi, (SELECT COALESCE(COUNT(1),0) FROM potensi_das WHERE potensi_das.potensi_id = potensi.potensi_id) AS jml_potensi_das, (SELECT COALESCE(COUNT(DISTINCT potensi_das.das_id),0) FROM potensi_das WHERE potensi_das.potensi_id = potensi.potensi_id) AS jml_das FROM potensi ORDER BY jml_potensi_das DESC";
    return promiseQuery(sql);
  },

  // Get all potensi sub das per potensi category
  get: function (id) {
    let sql = `SELECT das.das_id, das.thumbnail, das.das_name, sungai.sungai_name, das.alamat, kecamatan.kecamatan, kps.kps_name, das.luas_das, das.deskripsi, das.latitude, das.longitude, potensi_das.potensi_das_name FROM das LEFT OUTER JOIN kps ON kps.das_id = das.das_id LEFT OUTER JOIN sungai ON das.sungai_id = sungai.sungai_id LEFT OUTER JOIN kecamatan ON kecamatan.kecamatan_id = das.kecamatan_id INNER JOIN potensi_das ON potensi_das.das_id = das.das_id WHERE potensi_das.potensi_id = $1`;
    return promiseQuery(sql, [id]);
  },

  // Get all sub das per potensi category
  getDas: function (id) {
    let sql = `SELECT das.das_id, das.thumbnail, das.das_name, sungai.sungai_name, das.alamat, kecamatan.kecamatan, kps.kps_name, das.luas_das, das.deskripsi, das.latitude, das.longitude, potensi_das.potensi_das_name FROM das LEFT OUTER JOIN kps ON kps.das_id = das.das_id LEFT OUTER JOIN sungai ON das.sungai_id = sungai.sungai_id LEFT OUTER JOIN kecamatan ON kecamatan.kecamatan_id = das.kecamatan_id INNER JOIN potensi_das ON potensi_das.das_id = das.das_id WHERE potensi_das.potensi_id = $1 GROUP BY das.das_id, das.thumbnail, das.das_name, sungai.sungai_name, das.alamat, kecamatan.kecamatan, kps.kps_name, das.luas_das, das.deskripsi, das.latitude, das.longitude, potensi_das.potensi_das_name`;
    return promiseQuery(sql, [id]);
  },

  update: function (id, data) {
    data = dataPotensi(data);
    let sql =
      "UPDATE potensi SET potensi_name = $1, deskripsi = $2 WHERE potensi_id = $3";
    return promiseQuery(sql, [data.potensi_name, data.deskripsi, id]);
  },

  delete: function (id) {
    let sql = "DELETE FROM potensi WHERE potensi_id = $1";
    return promiseQuery(sql, [id]);
  },
};

module.exports = { Potensi };
