import express from 'express';
import cors from 'cors';
import tweetsRoute from './tweetsRoute.js';

//App
const app = express();

// Settings
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// Cors
app.use(cors());

// Routes Page
app.use("/", tweetsRoute)


let PORT = 5000;
app.listen(PORT, () => {
    console.log(`Servidor executando na porta ${PORT}`);
})