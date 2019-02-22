import mysql = require('mysql');

export default class MySQL { // Patrón singleton

    private static _instance: MySQL;

    connection: mysql.Connection; // interface
    connected: boolean = false;

    constructor() {
        console.log('Clase inicializada');

        this.connection = mysql.createConnection({
            host: 'localhost',
            user: 'root',
            password: 'MySQLJonathan',
            database: 'node_db'
        });

        this.connectDB();
    }

    public static get instance() {
        return this._instance || (this._instance = new this()); // Si existe la instancia, se utiliza la existente, y si no existe, se crea una nueva.
    }

    static execQuery(query: string, callback: Function) { //Con el static, ejecuta directamente MySQL.query
        this.instance.connection.query(query, (err, results: Object[], fields) =>{
            if (err) {
                console.log('Error en query');
                console.log(err);
                return callback(err);
            }

            if (results.length === 0) {
                callback('El registro solicitado no existe');
            } else {
                callback(null, results);
            }
        });
    }

    static escapeQueryValue(id: number) {
        return this.instance.connection.escape(id);
    }

    private connectDB() {
        this.connection.connect((err: mysql.MysqlError) => {
            if (err) {
                console.log(err.message);
                return;
            }

            this.connected = true;
            console.log('Base de datos online');
        });
    }
}