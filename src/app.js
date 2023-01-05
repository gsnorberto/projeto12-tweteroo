import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';

//App
const app = express();

// BodyParser settings
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// Cors
app.use(cors());

let user = {
    userName: '',
    avatarUrl: ''
}

let tweets = [];

app.get('/', (req, res) => {
    res.send('Hello World');
})

// SIGN UP - POST
app.post('/sign-up', (req, res) => {
    let { username, avatar } = req.body;

    console.log(req.body);

    if (username !== '' && avatar !== '') {
        user.userName = username;
        user.avatarUrl = avatar;
        res.status(200);
    } else {
        res.status(401).send("Dados inválidos!");
    }
});

// TWEETS - POST
app.post('/tweets', (req, res) => {

});

// TWEETS - GET
app.get('/tweets', (req, res) => {

});

let PORT = 5000;
app.listen(PORT, () => {
    console.log(`Servidor executando na porta ${PORT}`);
})