const { hashSync } = require("bcrypt");
const userModel = require("../model/UserModel");
const bcrypt = require("bcryptjs");
//const jwt = process.env.JWT_SECRET;
const jwt = require("jsonwebtoken");
require("dotenv").config({ path: "./src/config/dotenv" });

const userController = {
  async register(req, res, next) {
    try {
      const user = await userModel.create({
        ...req.body,
        // password: hash,
        role: "user",
      });
      res.send({ message: "user registered", user });
    } catch (e) {
      next(e);
    }
  },



  async login(req, res) {
    try {
      const user = await userModel.findOne({
        email: req.body.email,
        password: req.body.password,
      });
      console.log(user);
      const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET);
      console.log(token);
      if (user.tokens.length > 4) {
        user.tokens.shift();
      }
      user.tokens.push(token);
      
      await user.save();
      res.send({ message: "Bienvenida " + user.name, token, user });
    } catch (e) {
      res.send(e);
    }
  },

  async logout(req, res) {
    try {
      await User.findByIdAndUpdate(req.user._id, {
        $pull: { tokens: req.headers.authorization },
      });
      res.send({ message: "Desconectado con éxito" });
    } catch (error) {
      console.error(error);
      res.status(500).send({
        message: "Hubo un problema al intentar desconectar al usuario",
      });
    }
  },

  async getAll(req, res) {
    try {
      const user = await User.find();
      res.send({ message: "tareas recuperadas:", user });
    } catch (error) {
      res.send(error);
    }
  },
};

module.exports = userController;
