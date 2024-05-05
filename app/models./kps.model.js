const pool = require("./db.js");
const multer = require("multer");
const path = require("path");

function dataKps(data, file) {
  data.kps_name = data.kps_name;
  data.slug = data.slug;
  if (data.das_id) {
    data.das_id = data.das_id;
  } else {
    data.das_id = null;
  }
  data.user_id = data.user_id;
  data.tgl_dibentuk = data.tgl_dibentuk;
  data.jml_anggota = data.jml_anggota;
  data.facebook = data.facebook;
  data.profil_kps = data.profil_kps;
  if (file) {
    data.logo_kps = file.filename;
  } else {
    data.logo_kps = data.logo_kps;
  }
  data.instagram = data.deskripsi;
  return data;
}

// const storage = multer.diskStorage({
//   destination: path.join(
//     __dirname + "./public/images/logo/"
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

const Kps = {
  create: function (data, file) {
    data = dataKps(data, file);
    let sql =
      "INSERT INTO kps (kps_name, slug, das_id, user_id, tgl_dibentuk, jml_anggota, facebook, profil_kps, logo_kps, instagram) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)";
    return promiseQuery(sql, [
      data.kps_name,
      data.slug,
      data.das_id,
      data.user_id,
      data.tgl_dibentuk,
      data.jml_anggota,
      data.facebook,
      data.profil_kps,
      data.logo_kps,
      data.instagram,
    ]);
  },

  getAll: function () {
    let sql =
      "SELECT kps_id, logo_kps, kps_name, slug, das_name, alamat, kecamatan, tgl_dibentuk, jml_anggota, profil_kps, facebook, instagram FROM kps LEFT OUTER JOIN das ON das.das_id = kps.das_id LEFT JOIN kecamatan ON kecamatan.kecamatan_id = das.kecamatan_id ORDER BY kps_id";
    return promiseQuery(sql);
  },

  get: function (id) {
    let sql = `SELECT kps_id, logo_kps, kps_name, slug, kps.das_id, das_name, alamat, kecamatan.kecamatan_id, kecamatan, tgl_dibentuk, jml_anggota, profil_kps, facebook, instagram FROM kps LEFT OUTER JOIN das ON das.das_id = kps.das_id LEFT OUTER JOIN kecamatan ON kecamatan.kecamatan_id = das.kecamatan_id WHERE das.das_id = $1`;
    return promiseQuery(sql, [id]);
  },

  getById: function (id) {
    let sql = `SELECT kps_id, logo_kps, kps_name, slug, kps.das_id, das_name, alamat, kecamatan.kecamatan_id, kecamatan, tgl_dibentuk, jml_anggota, profil_kps, facebook, instagram FROM kps LEFT OUTER JOIN das ON das.das_id = kps.das_id LEFT OUTER JOIN kecamatan ON kecamatan.kecamatan_id = das.kecamatan_id WHERE kps_id = $1`;
    return promiseQuery(sql, [id]);
  },

  update: function (id, data, file) {
    data = dataKps(data, file);
    let sql =
      "UPDATE kps SET kps_name = $1, slug = $2, das_id = $3, user_id = $4, tgl_dibentuk = $5, jml_anggota = $6, facebook = $7, profil_kps = $8, logo_kps = $9, instagram = $10 WHERE kps_id = $11";
    return promiseQuery(sql, [
      data.kps_name,
      data.slug,
      data.das_id,
      data.user_id,
      data.tgl_dibentuk,
      data.jml_anggota,
      data.facebook,
      data.profil_kps,
      data.logo_kps,
      data.instagram,
      id,
    ]);
  },

  delete: function (id) {
    let sql = "DELETE FROM kps WHERE kps_id = $1";
    return promiseQuery(sql, [id]);
  },
};

module.exports = { dataKps, Kps, upload };
