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

let user = [
    {
        userName: 'bobesponja',
        avatarUrl: 'https://super.abril.com.br/wp-content/uploads/2020/09/04-09_gato_SITE.jpg?quality=70&strip=info'
    }
]

let tweets = [
    {
        username: "bobesponja",
        tweet: "eu amo o hub",
        avatar: "https://super.abril.com.br/wp-content/uploads/2020/09/04-09_gato_SITE.jpg?quality=70&strip=info"
    }
];

app.get('/', (req, res) => {
    res.send('Hello World');
})

// SIGN UP - POST
app.post('/sign-up', (req, res) => {
    let { username, avatar } = req.body;

    if (username !== '' && avatar !== '') {
        user.push({userName: username, avatarUrl: avatar});
        res.status(200).json(req.body);
    } else {
        res.status(401).send("UNAUTHORIZED");
    }
});

// TWEETS - POST
app.post('/tweets', (req, res) => {

});

// TWEETS - GET
app.get('/tweets', (req, res) => {
    res.json(tweets);
});

let PORT = 5000;
app.listen(PORT, () => {
    console.log(`Servidor executando na porta ${PORT}`);
})