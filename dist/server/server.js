"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const path = require("path");
class Server {
    constructor(port) {
        this.port = port;
        this.app = express(); // Realizamos una instancia de express en app
    }
    static init(port) {
        return new Server(port); // Siempre para inicializar va a llamar a init y vamos a utilizar la misma instancia
    }
    publicFolder() {
        const publicPath = path.resolve(__dirname, '../public');
        this.app.use(express.static(publicPath));
    }
    start(callback) {
        this.app.listen(this.port, callback);
        // Hago pública la carpeta luego de corroborar de que el server está escuchando en un determinado puerto
        this.publicFolder();
    }
}
exports.default = Server;
