const pool = require("./db.js");
const multer = require("multer");
const path = require("path");

function dataDas(data, file) {
  data.das_name = data.das_name;
  data.sungai_id = data.sungai_id ? data.sungai_id : null;
  data.kecamatan_id = data.kecamatan_id ? data.kecamatan_id : null;
  data.user_id = data.user_id;
  data.alamat = data.alamat;
  data.luas_das = data.luas_das;
  data.latitude = data.latitude;
  data.longitude = data.longitude;
  data.deskripsi = data.deskripsi;
  if (file) {
    data.thumbnail = file.filename;
  } else {
    data.thumbnail = data.thumbnail;
  }
  data.maps_url = data.maps_url;
  return data;
}

const storage = multer.diskStorage({
  destination: path.join(
    __dirname + "./public/images/das/"
  ),
  filename: function (req, file, cb) {
    cb(null, file.fieldname + "-" + file.originalname);
  },
});

const upload = multer({ storage });

const promiseQuery = (text, params) => {
  return new Promise((resolve, reject) => {
    pool.query(text, params, (err, res) => {
      if (err) reject(err);
      else resolve(res.rows);
    });
  });
};

const Das = {
  create: function (data, file) {
    data = dataDas(data, file);
    let sql =
      "INSERT INTO das VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11)";
    const values = [
      data.das_name,
      data.sungai_id,
      data.kecamatan_id,
      data.user_id,
      data.alamat,
      data.luas_das,
      data.latitude,
      data.longitude,
      data.thumbnail,
      data.deskripsi,
      data.maps_url,
    ];
    return promiseQuery(sql, values);
  },

  getAll: function () {
    let sql =
      "SELECT das.das_id, das.thumbnail, das.das_name, das.alamat, sungai.sungai_name, kecamatan.kecamatan, kps.kps_name, kps.slug, kps.logo_kps, das.luas_das, das.deskripsi, das.latitude, das.longitude, (SELECT COALESCE(COUNT(1),0) FROM potensi_das WHERE potensi_das.das_id = das.das_id) AS jml_potensi FROM das LEFT JOIN kps ON kps.das_id = das.das_id LEFT JOIN sungai ON das.sungai_id = sungai.sungai_id LEFT JOIN kecamatan ON kecamatan.kecamatan_id = das.kecamatan_id ORDER BY das_id";
    return promiseQuery(sql);
  },

  getAllNull: function () {
    let sql =
      "SELECT das.das_id, das.das_name FROM das LEFT JOIN kps ON das.das_id = kps.das_id WHERE kps.das_id IS NULL";
    return promiseQuery(sql);
  },

  get: function (id) {
    let sql = `SELECT das.das_id, das.thumbnail, das.das_name, das.alamat, sungai.sungai_id, sungai.sungai_name, kecamatan.kecamatan_id, kecamatan.kecamatan, kps.kps_name, kps.slug, kps.logo_kps, das.luas_das, das.deskripsi, das.latitude, das.longitude, (SELECT COALESCE(COUNT(1),0) FROM potensi_das WHERE potensi_das.das_id = das.das_id) AS jml_potensi FROM das LEFT JOIN kps ON kps.das_id = das.das_id LEFT JOIN sungai ON das.sungai_id = sungai.sungai_id LEFT JOIN kecamatan ON kecamatan.kecamatan_id = das.kecamatan_id WHERE das.das_id = $1`;
    return promiseQuery(sql, [id]);
  },

  update: function (id, data, file) {
    data = dataDas(data, file);
    let sql =
      "UPDATE das SET das_name = $1, sungai_id = $2, kecamatan_id = $3, user_id = $4, alamat = $5, luas_das = $6, latitude = $7, longitude = $8, thumbnail = $9, deskripsi = $10, maps_url = $11 WHERE das_id = $12";
    const values = [
      data.das_name,
      data.sungai_id,
      data.kecamatan_id,
      data.user_id,
      data.alamat,
      data.luas_das,
      data.latitude,
      data.longitude,
      data.thumbnail,
      data.deskripsi,
      data.maps_url,
      id,
    ];
    return promiseQuery(sql, values);
  },

  delete: function (id) {
    let sql = "DELETE FROM das WHERE das_id = $1";
    return promiseQuery(sql, [id]);
  },
};

module.exports = { dataDas, Das, upload };
