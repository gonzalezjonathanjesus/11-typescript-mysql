"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mysql = require("mysql");
class MySQL {
    constructor() {
        this.connected = false;
        console.log('Clase inicializada');
        this.connection = mysql.createConnection({
            host: 'localhost',
            user: 'root',
            password: 'MySQLJonathan',
            database: 'node_db'
        });
        this.connectDB();
    }
    static get instance() {
        return this._instance || (this._instance = new this()); // Si existe la instancia, se utiliza la existente, y si no existe, se crea una nueva.
    }
    static execQuery(query, callback) {
        this.instance.connection.query(query, (err, results, fields) => {
            if (err) {
                console.log('Error en query');
                console.log(err);
                return callback(err);
            }
            if (results.length === 0) {
                callback('El registro solicitado no existe');
            }
            else {
                callback(null, results);
            }
        });
    }
    static escapeQueryValue(id) {
        return this.instance.connection.escape(id);
    }
    connectDB() {
        this.connection.connect((err) => {
            if (err) {
                console.log(err.message);
                return;
            }
            this.connected = true;
            console.log('Base de datos online');
        });
    }
}
exports.default = MySQL;
