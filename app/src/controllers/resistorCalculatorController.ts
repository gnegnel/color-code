import sql from 'mssql';
import { Request, Response } from 'express';
import { validateCalculateResistanceDto } from '../validators/CalculateResistanceDTO';
import config from '../database/config'; 

export const getColorCodes = async (req: Request, res: Response) => {
    try {
        let pool = await sql.connect(config)
        let result = await pool.request().query('SELECT * FROM ColorCode')

        res.send(result.recordset);
    } catch (err) {
        console.error(err);
        if (err instanceof Error) res.status(500).send(err.message);
        else res.status(500).send("An unknown error occurred.");
    }
}

async function getColorCodeValue(id: number, attribute: string): Promise<number> {
    let pool = await sql.connect(config)
    let result = await pool.request()
        .input('id', sql.Int, id)
        .query(`SELECT ${attribute} FROM ColorCode WHERE id = @id`)
    
    if (result.recordset.length === 0) {
        throw new Error('Invalid color code');
    }

    return result.recordset[0][attribute];
}

interface OhmValueResult {
    resistance: number;
    tolerance: number;
}

async function calculateOhmValue(bandAColorId: number, bandBColorId: number, bandCColorId: number, bandDColorId: number): Promise<OhmValueResult> {
    let firstDigit = await getColorCodeValue(bandAColorId, 'firstDigit');
    let secondDigit = await getColorCodeValue(bandBColorId, 'secondDigit');
    let multiplier = await getColorCodeValue(bandCColorId, 'multiplier');
    let tolerance = await getColorCodeValue(bandDColorId, 'tolerance');

    let resistance = (firstDigit * 10 + secondDigit) * multiplier;

    return { resistance, tolerance };
}

export const calculateResistance = async (req: Request, res: Response) => {
    const { error } = validateCalculateResistanceDto(req.query);
    if (error) {
        return res.status(400).send(error.details[0].message);
    }
    
    const { bandAColorId, bandBColorId, bandCColorId, bandDColorId } = req.query;
    
    try {
        let { resistance, tolerance } = await calculateOhmValue(Number(bandAColorId), Number(bandBColorId), Number(bandCColorId), Number(bandDColorId));
        res.send({ resistance, tolerance });
    } catch (err) {
        console.error(err);
        if (err instanceof Error) res.status(500).send(err.message);
        else res.status(500).send("An unknown error occurred.");
    }
}
