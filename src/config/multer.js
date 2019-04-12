const multer = require("multer"); // yarn add multer
const path = require("path"); // biblioteca para formatação de caminhos; padrão node
const crypto = require("crypto"); // biblioteca para geração de hash; padrão node

// irá retornar um objeto contendo:
// dest = destino do arquivo
// storage = local de armazenando e nome do arquivo
// dest contém um caminho ; exemplo: home/tmp
// storage contem destination = caminho onde será armazenado o arquivo
// filename = nome do arquivo,
module.exports = {
    dest: path.resolve(__dirname, '..', '..', 'tmp'),
    storage: multer.diskStorage(
        {
            destination: (req, file, cb) => {
                cb(null, path.resolve(__dirname, '..', '..', 'tmp'));
            },
            filename: (req, file, cb) => {
                crypto.randomBytes(16, (err, hash) => {
                    if(err) cb(err);
                    file.key = `${hash.toString('hex')}-${file.originalname}`;
                    cb(null, file.key);
                })
            }
        }
    )
};