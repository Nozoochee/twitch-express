import * as dotenv from 'dotenv';
dotenv.config();
import fetch from 'node-fetch';

let authTimer;
let authToken = '';
const authURL = 'https://id.twitch.tv/oauth2/token';
const validationURL = 'https://id.twitch.tv/oauth2/validate';
const APIBaseURL = 'https://api.twitch.tv/helix/';

//See https://dev.twitch.tv/docs/api/reference#get-streams
export async function getStreams(language, pagination='', amount=10){
    const params = new URLSearchParams();
    params.append('language', language);
    params.append('first', amount);
    if(pagination.length>0){
        params.append('after', pagination);
    }
    const finalURL = `${APIBaseURL}streams?${params}`;
    const res = await fetch(finalURL,{
        method: 'GET',
        headers: {
            Authorization: `Bearer ${authToken}`,
            'Client-Id': process.env.CLIENT_ID
        }
    });
    if(!res.ok){
        throw new Error(res);
    }
    const data = await res.json();
    const streams = data.data.map((stream) => {
        const thumbURL = stream.thumbnail_url.replace('{width}', '320').replace('{height}', '180');
        return {
            thumbnail_url: thumbURL,
            user_name: stream.user_login,
            localized_name: stream.user_name,
            title: stream.title,
            game_name: stream.game_name,
            viewer_count: stream.viewer_count,
        }
    })
    const result = {
        streams: streams,
        pagination: data.pagination.cursor
    }
    return result;
}

//See https://dev.twitch.tv/docs/authentication/getting-tokens-oauth#client-credentials-grant-flow
export async function generateAuthToken(){
    const params = new URLSearchParams();
    params.append('client_id', process.env.CLIENT_ID);
    params.append('client_secret', process.env.CLIENT_SECRET);
    params.append('grant_type', 'client_credentials');

    const res = await fetch(authURL, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        body: params
    });
    const data = await res.json();
    authToken = data.access_token;
    authTimer = setTimeout(()=>{
        generateAuthToken();
    }, data.expires_in);
    console.log(`Received new AuthToken, expires in ${data.expires_in}`);
}

//See https://dev.twitch.tv/docs/authentication/validate-tokens#how-to-validate-a-token
export async function validateAuthToken(){
    const res = await fetch(validationURL, {
        method: 'GET',
        headers: {
            Authorization: `Bearer ${authToken}`
        }
    });
    if(!res.ok){
        console.log('Refreshing AuthToken');
        await generateAuthToken();
    }
    else {
        console.log('AuthToken is valid');
    }
}