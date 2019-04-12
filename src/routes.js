// Arquivo de configuração de rotas
const express = require("express");
const multer = require("multer");
const multerConfig = require("./config/multer");

const routes = express.Router();

const BoxController = require("./controllers/BoxController");
const FileController = require("./controllers/FileController");


routes.get('/home', (req, res) => {
    return res.send("hello, world!");
});
routes.post('/create-box', BoxController.store);
routes.get('/show-box/:id', BoxController.show);
routes.post('/boxes/:id/create-file', multer(multerConfig).single('file'), FileController.store);
module.exports = routes; // exportando essa variável