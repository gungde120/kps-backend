const db = require("../models");
const config = require("../config/auth.config");
const User = db.user;
const Role = db.role;

const Op = db.Sequelize.Op;

var jwt = require("jsonwebtoken");
var bcrypt = require("bcryptjs");

exports.signup = (req, res) => {
  // Save User to Database
  User.create({
    username: req.body.username,
    email: req.body.email,
    password: bcrypt.hashSync(req.body.password, 8)
  })
    .then(user => {
      if (req.body.roles) {
        Role.findAll({
          where: {
            name: {
              [Op.or]: req.body.roles
            }
          }
        }).then(roles => {
          user.setRoles(roles).then(() => {
            res.send({ message: "User registered successfully!" });
          });
        });
      } else {
        // user role = 1
        user.setRoles([1]).then(() => {
          res.send({ message: "User registered successfully!" });
        });
      }
    })
    .catch(err => {
      res.status(500).send({ message: err.message });
    });
};

const signin = (email, password) => {
  return User.findOne({
    where: {
      email: email
    }
  })
    .then(user => {
      if (!user) {
        return { success: false, message: "User not found." };
      }

      var passwordIsValid = bcrypt.compareSync(
        password,
        user.password
      );

      if (!passwordIsValid) {
        return { success: false, message: "Invalid password." };
      }

      return Promise.all([user, user.getRoles()]).then(([user, roles]) => {
        var authorities = [];
        for (let i = 0; i < roles.length; i++) {
          authorities.push("ROLE_" + roles[i].name.toUpperCase());
        }

        //refresh token when relogin + time limit
        var token = jwt.sign({ id: user.id }, config.secret, {
          expiresIn: 86400 // 24 hours
        });

        return {
          success: true,
          id: user.id,
          username: user.username,
          email: user.email,
          password: user.password,
          roles: authorities,
          accessToken: token
        };
      });
    })
    .catch(err => {
      return { success: false, message: err.message };
    });
};

exports.signin = (req, res) => {
  signin(req.body.email, req.body.password)
    .then(result => {
      if (!result.success) {
        return res.status(401).send({ message: result.message });
      }

      res.status(200).send(result);
    })
    .catch(err => {
      res.status(500).send({ message: err.message });
    });
};

exports.updateProfile = (req, res) => {
  var token = req.headers["x-access-token"];
  if (!token) {
    return res.status(403).send({ message: "No token provided!" });
  }

  jwt.verify(token, config.secret, (err, decoded) => {
    if (err) {
      return res.status(401).send({ message: "Unauthorized!" });
    }

    User.findByPk(decoded.id).then(user => {
      if (!user) {
        return res.status(404).send({ message: "User not found." });
      }

      // Get the current roles of the user
      var authorities = [];
      user.getRoles().then(roles => {
        for (let i = 0; i < roles.length; i++) {
          authorities.push("ROLE_" + roles[i].name.toUpperCase());
        }

        // Assign the current roles back to the user object
        user.roles = authorities;

        // Update the user object with the new values
        if (req.body.newUsername) {
          user.username = req.body.newUsername;
        } else {
          user.username = user.username;
        }

        if (req.body.newEmail) {
          user.email = req.body.newEmail;
        } else {
          user.email = user.email;
        }

        if (req.body.newPassword) {
          user.password = bcrypt.hashSync(req.body.newPassword, 8);
        } else {
          user.password = user.password;
        }

        // Save the updated user object
        user.save().then(() => {
          res.send({ message: "User profile updated successfully!" });
        });
      });
    });
  });
};
