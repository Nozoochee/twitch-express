# Twitch Express
In this project, I am using the official API from Twitch.tv to retrieve information I wish was directly accessible from their website.

## Features
Currently you can:
- Get streams by language

### Example
Sending a request to `/twitch?lang=es` will return an array of 10 spanish speaking streams, as well as pagination.

Optional parameters include 

- `pag` pagination
- `amnt` the amount of streams  (default 10, max 100)

# Download
- Clone the repository
- Run `npm install`
- Create a `.env` file
- The `.env` file requires `CLIENT_ID` and `CLIENT_SECRET` entries. If you want also `PORT`
- Run `node app.js`