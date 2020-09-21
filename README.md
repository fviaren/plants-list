Plants List
===========

An app to help you remember to water your plants on time!

## Features
* Add, modify and remove plants to your plants list. Give them a name, and specify their watering frequency and amount.
* Get notifications each day for plants due for watering.
* Reset watering time on today's plants after you watered them.

This is a learning and showcase app that I developed as part of my learning
process, and it covers component-driven frontend development using [Svelte](https://svelte.dev/) framework.

## Development
To develop this app locally:

1. clone this repository
    ```
    git clone https://github.com/fviaren/plants-list
    ```

2. install dependencies
    ```
    npm install
    ```

3. run token server (used to get JWT trefle.io token)
    ```
    export TREFLE_API_TOKEN="<put your trefle.io token here>"
    node src/tokenServer.js
    ```

4. start local dev server
    ```
    npm run dev
    ```

Happy coding!
