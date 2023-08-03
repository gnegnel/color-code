import express from 'express';
import cors from 'cors';
import {
    getColorCodes,
    calculateResistance
}  from './controllers/resistorCalculatorController';

const app = express();
const port = 8080;

app.use(cors()); 

app.get('/colorcode', getColorCodes);
app.get('/colorcode/calculateResistance', calculateResistance);

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
