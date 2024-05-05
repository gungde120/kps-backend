const pool = require("./db.js");

const promiseQuery = (text, params) => {
  return new Promise((resolve, reject) => {
    pool.query(text, params, (err, res) => {
      if (err) reject(err);
      else resolve(res.rows);
    });
  });
};

const All = {
  getAll: function () {
    let sql = `SELECT 
            das.das_id, 
            das.thumbnail, 
            das.das_name, 
            sungai.sungai_name, 
            das.alamat, 
            kecamatan.kecamatan, 

            kps.kps_name,
            kps.slug, 
            kps.logo_kps,
            kps.tgl_dibentuk,
            kps.facebook,
            kps.instagram,

            das.luas_das, 
            das.latitude, 
            das.longitude,
            
            (SELECT COALESCE(COUNT(1),0) FROM potensi_das 
            WHERE potensi_das.das_id = das.das_id) AS jml_potensi, 
            
            potensi.potensi_name, 
            potensi_das.potensi_das_name
            
            FROM das
            
            LEFT JOIN potensi_das ON das.das_id = potensi_das.das_id         
            INNER JOIN kps ON kps.das_id = das.das_id         
            LEFT JOIN potensi ON potensi_das.potensi_id = potensi.potensi_id 
            
            JOIN sungai ON das.sungai_id = sungai.sungai_id 
            JOIN kecamatan ON kecamatan.kecamatan_id = das.kecamatan_id
            ORDER BY das_id;`;
    return promiseQuery(sql);
  },

  get: function (slug) {
    let sql = `SELECT 
            das.das_id, 
            das.thumbnail, 
            das.das_name, 
            sungai.sungai_name, 
            das.alamat, 
            kecamatan.kecamatan, 

            kps.kps_name,
            kps.slug, 
            kps.logo_kps,
            kps.tgl_dibentuk,
            kps.profil_kps,
            kps.facebook,
            kps.instagram,

            das.luas_das, 
            das.deskripsi, 
            das.latitude, 
            das.longitude,
            
            (SELECT COALESCE(COUNT(1),0) FROM potensi_das 
            WHERE potensi_das.das_id = das.das_id) AS jml_potensi
            
            FROM das 

            INNER JOIN kps ON kps.das_id = das.das_id         
            
            JOIN sungai ON das.sungai_id = sungai.sungai_id 
            JOIN kecamatan ON kecamatan.kecamatan_id = das.kecamatan_id
            WHERE kps.slug = $1;`;
    return promiseQuery(sql, [slug]);
  },

  getAllKpsPotensi: function (slug) {
    let sql = `SELECT 
            kps.kps_name,
            kps.slug, 

            potensi_das.id AS potensi_id, 
            potensi.potensi_name, 
            potensi_das.potensi_das_name, 
            potensi_das.thumbnail AS potensi_thumbnail
            
            FROM potensi_das 

            LEFT JOIN das ON das.das_id = potensi_das.das_id 
            INNER JOIN kps ON kps.das_id = das.das_id 
            LEFT JOIN potensi ON potensi_das.potensi_id = potensi.potensi_id 
            
            WHERE kps.slug = $1;`;
    return promiseQuery(sql, [slug]);
  },

  getKpsPotensi: function (slug, id) {
    let sql = `SELECT
            kps.kps_name,
            kps.slug, 
            kps.logo_kps,
            das.das_name,

            potensi_das.id AS potensi_id,
            potensi.potensi_name, 
            potensi_das.potensi_das_name, 
            potensi_das.deskripsi AS potensi_deskripsi, 
            potensi_das.thumbnail AS potensi_thumbnail 

            FROM das 
            
            LEFT JOIN potensi_das ON das.das_id = potensi_das.das_id         
            INNER JOIN kps ON kps.das_id = das.das_id         
            LEFT JOIN potensi ON potensi_das.potensi_id = potensi.potensi_id 

            WHERE kps.slug = $1 AND potensi_das.id = $2;`;
    return promiseQuery(sql, [slug, id]);
  },
};

module.exports = { All };
