import express from 'express';
let router = express.Router();

let users = []; // [{ username, avatar }]
let tweets = []; // [{ username, tweet }]

router.get('/', (req, res) => {
    res.send("Tweteroo");
})

// SIGN UP - POST
router.post('/sign-up', (req, res) => {
    let { username, avatar } = req.body;

    // There are empty fields
    if (!username || !avatar) {
        return res.status(400).send("Todos os campos são obrigatórios!");
    }

    // User already registered
    // let registeredUser = users.find(user => user.username === username)
    // if (registeredUser) {
    //     return res.status(409).send("Usuário já cadastrado!");
    // }

    // Save user
    users.push({ username, avatar });

    // Response
    res.status(201).send("OK");
});

// TWEETS - POST
router.post('/tweets', (req, res) => {
    let username = req.headers.user;
    let { tweet } = req.body;

    // There are empty fields
    if (!username || !tweet) {
        return res.status(400).send("Todos os campos são obrigatórios!");
    }

    // User not authenticated
    let user = users.find(u => u.username === username);
    if (!user) {
        return res.sendStatus(401); // unauthorized
    }

    // Save tweet
    tweets.push({ username, tweet })

    // Response
    return res.status(201).send("OK");
});

// TWEETS - GET - WITH PAGINATION
router.get('/tweets', (req, res) => {
    let page = parseInt(req.query.page);

    // Invalid page number
    if (page && page <= 0) { 
        return res.status(400).send('Informe uma página válida!');
    }

    // Sends only the last 10 tweets
    if (tweets.length > 10) {
        let tweetsWithAvatar;

        if (!page) { // without pagination
            tweetsWithAvatar = tweets.slice(tweets.length - 10, tweets.length);
        } else { // with pagination
            if (tweets[(page - 1) * 10]) { // If exists tweets on specific page number
                tweetsWithAvatar = tweets.slice((page - 1) * 10, page * 10);
            } else { // Invalid page number
                return res.status(400).send('Informe uma página válida!');
            }
        }

        // Add avatar URL in upload data
        tweetsWithAvatar.forEach(tweet => tweet.avatar = users.find(user => user.username === tweet.username).avatar)

        // Response
        res.status(200).json(tweetsWithAvatar);
    } else {
        if (!page || page === 1) {
            let tweetsWithAvatar = [...tweets];

            // Add avatar URL in upload data
            tweetsWithAvatar.forEach(tweet => tweet.avatar = users.find(user => user.username === tweet.username).avatar)

            // Response
            res.status(200).json(tweetsWithAvatar);
        } else {
            return res.status(400).send('Informe uma página válida!');
        }
    }
});

// TWEETS - GET BY USERNAME
router.get('/tweets/:USERNAME', (req, res) => {
    let { USERNAME } = req.params;

    // Check if user is authenticated
    let user = users.find(u => u.username === USERNAME);
    if (!user) {
        return res.sendStatus(404); // user not found
    }

    // filter tweets by username and add tweet avatar
    let userTweets = tweets.filter(tweet => tweet.username === USERNAME);
    let tweetsWithAvatar = [...userTweets];
    tweetsWithAvatar.forEach(tweet => tweet.avatar = user.avatar)

    // response
    res.json(tweetsWithAvatar);
});

export default router;