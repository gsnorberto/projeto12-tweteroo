import express from 'express';
let router = express.Router();

let users = []
let tweets = [];

router.get('/', (req, res) => {
    res.send('Hello World');
})

// SIGN UP - POST
router.post('/sign-up', (req, res) => {
    let { username, avatar } = req.body;

    if (username !== '' && avatar !== '') {
        users.push({ username, avatar });
        res.sendStatus(200);
    } else {
        res.sendStatus(401);
    }
});

// TWEETS - POST
router.post('/tweets', (req, res) => {
    let { username, tweet } = req.body;

    let user = users.find(u => u.username === username);

    if(tweet === ''){
        res.status(401).send("Há campos vazios");
    } else if(user){
        tweets.push({username, tweet})
        res.sendStatus(200);
    } else { // Usuário não fez sign-up
        res.send(401).send("UNAUTHORIZED");
    }
});

// TWEETS - GET
router.get('/tweets', (req, res) => {
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

export default router;