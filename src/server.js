const express = require("express");
const mongoose = require("mongoose");
const path = require("path");
const socketio = require("socket.io");
const http = require("http");
const cors = require("cors");

const app = express();
app.use(cors()); // dessa forma está deixando livre para qqualquer um acessar ; é possivel limitar o acesso
const server = http.Server(app); 
const io = socketio(server);

io.on("connection", socket => {
    socket.on("connectRoom", box => {
        socket.join(box);
    })
});

mongoose.connect("mongodb+srv://root:root@cluster0-yi7cu.mongodb.net/omnistack?retryWrites=true",
{
    useNewUrlParser: true,
});

app.use((req, res, next) => {
    req.io = io;
    return next();
});

app.use(express.json()); // receber dados em formato json
app.use(express.urlencoded()); // receber arquivos
app.use('/files', express.static(path.resolve(__dirname, "..", "tmp"))) // definindo uma rota estática para os caminhos /files

app.use(require("./routes")); // importar arquivo de rotas

//app.listen(3333);
server.listen(3333);