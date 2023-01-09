# About
This is a middleman for my [frontend](https://www.nozoochee.com/twitchLangSearch) to fetch data from [Twitch.tv](https://twitch.tv/), with as little hassle as possible. This express app stores all the necessary credentials and keeps the access token valid.

# Motivation
I use livestreams as a means of getting in touch with languages I want to learn, or want to keep my knowledge of.

Twitch forces streamers to set the stream's language, and that language used to be accessible via a tag from the main website.

With the addition of custom tags however, they removed the default tags and made it impossible to easily look for streamers speaking a certain language. Now some streamers may put 日本語, others 日本 or  Japanese as a custom tag, losing all consistency. And most of them don't add any tag at all.

I made this app so I can conveniently query Twitch for streams of a certain language, knowing that this result will truly have all of them.

I may add more functionality in the future.

## Features
- Get streams by language
- Uses the official API

As this is a small codebase, it can also serve as a demo for how to use a more complex API such as Twitch's.

## Example
Sending a request to `/twitch?lang=es` will return an array of 20 spanish speaking streams, as well as pagination.

Optional parameters include 

- `pag` pagination
- `amnt` the amount of streams  (default 20, max 100)

# Download
- Get your client-id and client-secret from Twitch
- Clone the repository
- Run `npm install`
- Create a `.env` file in the root folder
- The `.env` file requires `CLIENT_ID` and `CLIENT_SECRET` entries. If you want also `PORT`
- Run `node app.js`
