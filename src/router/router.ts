import { Router, Request, Response } from 'express';
import MySQL from '../mysql/mysql';

const router = Router(); // Crea una nueva instancia de nuestro Router
// Esto es lo mismo que app.get()
router.get('/heroes', (req: Request, res: Response) => { // req: Resquest and res: Response sive para que typescript lo reconozca y nos de las facilidades para manejarlo
    const query = `
    SELECT * FROM heroes
    `;

    MySQL.execQuery(query, (err: any, heroes: Object[]) => {
        if(err) {
            res.status(400).json({
                ok: false,
                error: err
            });
        } else {
            res.json({
                ok: true,
                heroes
            });
        }
    })
});

router.get('/heroes/:id', (req: Request, res: Response) => { // req: Resquest and res: Response sive para que typescript lo reconozca y nos de las facilidades para escribirlo
    const id = req.params.id;
    const escapedId = MySQL.escapeQueryValue(id);

    const query = `
        SELECT * FROM heroes where id = ${escapedId}
    `;

    MySQL.execQuery(query, (err: any, hero: Object[]) => {
        if (err) {
            res.status(400).json({
                ok:false,
                error: err
            });
        } else {
            res.json({
                ok: true,
                hero: hero[0]
            });
        }
    });
});

export default router;