import express = require('express');
import path = require('path');

export default class Server {

    public app: express.Application; // Definimos que el tipo de app va a ser una aplicación de express
    public port: number;

    constructor(port: number) { // Pedimos por parámetro el puerto de tipo numérico
        this.port = port;
        this.app = express(); // Realizamos una instancia de express en app
    }

    static init(port: number) { // La idea de que sea un método estático es que solo tengamos una instancia de la clase Server
        return new Server(port); // Siempre para inicializar va a llamar a init y vamos a utilizar la misma instancia
    }

    private publicFolder() {
        const publicPath = path.resolve(__dirname, '../public');

        this.app.use(express.static(publicPath));
    }

    start(callback: Function) {
        this.app.listen(this.port, callback);
        // Hago pública la carpeta luego de corroborar de que el server está escuchando en un determinado puerto
        this.publicFolder();
    }

}