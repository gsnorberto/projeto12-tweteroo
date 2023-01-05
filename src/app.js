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

let users = [
    {
        username: 'bobesponja',
        avatar: 'https://super.abril.com.br/wp-content/uploads/2020/09/04-09_gato_SITE.jpg?quality=70&strip=info'
    }
]

let tweets = [
    {
        username: "bobesponja",
        tweet: "eu amo o hub"
    }
];

app.get('/', (req, res) => {
    res.send('Hello World');
})

// SIGN UP - POST
app.post('/sign-up', (req, res) => {
    let { username, avatar } = req.body;

    if (username !== '' && avatar !== '') {
        users.push({ username, avatar });
        res.status(200).send("OK");
    } else {
        res.status(401).send("Dados inválidos!");
    }
});

// TWEETS - POST
app.post('/tweets', (req, res) => {
    let { username, tweet } = req.body;

    let user = users.find(u => u.username === username);

    if(user){
        tweets.push({username, tweet})
        res.status(200).send("OK");
    } else { // Usuário não fez sign-up
        res.status(401).send("UNAUTHORIZED");
    }
});

// TWEETS - GET
app.get('/tweets', (req, res) => {
    if(tweets.length > 10){ // Envia apenas os 10 últimos tweets
        let lastTweets = tweets.slice(tweets.length - 10, tweets.length);

        lastTweets.forEach(tweet => tweet.avatar = users.find(user => user.username === tweet.username).avatar )

        res.json(lastTweets);
    } else {
        let tweetsWithAvatar = [...tweets];

        tweetsWithAvatar.forEach(tweet => tweet.avatar = users.find(user => user.username === tweet.username).avatar )

        res.json(tweetsWithAvatar);
    }
});

let PORT = 5000;
app.listen(PORT, () => {
    console.log(`Servidor executando na porta ${PORT}`);
})