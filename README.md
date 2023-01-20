# Presto
This is a POC with the goal of creating and running
VR experiences in a web browser using OpenAI chatGPT.

## Building and running
This is a nodeJS project, so the usual stuff.

> See OpenAI API key below.

```
npm install
node server.js
```

## OpenAI API key
An API key is required to make OpenAI API requests but should not be shared.
It is not checked in with the code. Instead the 'dotenv' package
is used to store it in the .env file.

> You can generate an OpenAI API key here: https://beta.openai.com/account/api-keys

Before running the server, create a ``.env`` file in the project root directory.
Place your API KEY in that file as follows:
```
OPENAI_APIKEY=<your api key>
```

## Links and references

Nice demo of a front end proxy
https://www.youtube.com/watch?v=bB7xkRsEq-g

### Seed project
https://www.codingthesmartway.com/how-to-use-chatgpt-with-react/
