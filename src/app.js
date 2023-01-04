import express from 'express';
import cors from 'cors';
const app = express();

app.use(cors());

app.get('/', (req, res) => {
    res.send('Hello World');
})


let PORT = 5000;
app.listen(PORT, () => {
    console.log(`Servidor executando na porta ${PORT}`);
})