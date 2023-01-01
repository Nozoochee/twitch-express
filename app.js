import * as dotenv from 'dotenv';
dotenv.config();
import express from 'express';

import { getStreams, generateAuthToken, validateAuthToken } from './twitch.js';

const app = express();
const port = process.env.PORT || 3000;

app.get('/', (req, res) => {
    res.send(`You're on the wrong page`);
})

//?lang=ja, pag and amnt optional
app.get('/twitch', async (req, res) => {
    if(req.query.lang === undefined){
        res.status(400).send({message: 'Missing paramter: lang'});
        return
    }
    if(req.query.lang.length != 2){
        res.status(400).send({message: 'lang must be exactly 2 characters long'});
        return
    }
    try {
        const data = await getStreams(req.query.lang, req.query.pag, req.query.amnt);
        res.status(200).send(data);
    } catch (err) {
        console.log(err);
        res.status(500).send({message: 'Something went wrong'});
    }
});

await generateAuthToken();
await validateAuthToken();

app.listen(port, () => {
    console.log(`App started and listening on port ${port}`);
})
