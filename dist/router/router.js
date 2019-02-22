"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const mysql_1 = __importDefault(require("../mysql/mysql"));
const router = express_1.Router(); // Crea una nueva instancia de nuestro Router
// Esto es lo mismo que app.get()
router.get('/heroes', (req, res) => {
    const query = `
    SELECT * FROM heroes
    `;
    mysql_1.default.execQuery(query, (err, heroes) => {
        if (err) {
            res.status(400).json({
                ok: false,
                error: err
            });
        }
        else {
            res.json({
                ok: true,
                heroes
            });
        }
    });
});
router.get('/heroes/:id', (req, res) => {
    const id = req.params.id;
    const escapedId = mysql_1.default.escapeQueryValue(id);
    const query = `
        SELECT * FROM heroes where id = ${escapedId}
    `;
    mysql_1.default.execQuery(query, (err, hero) => {
        if (err) {
            res.status(400).json({
                ok: false,
                error: err
            });
        }
        else {
            res.json({
                ok: true,
                hero: hero[0]
            });
        }
    });
});
exports.default = router;
