# README

This branch is being used to test the app's interaction with the server. Currently it contains a dummy server that runs on a local machine. In the future this will be switched to a live server deployed on Heroku.

### Running the app
1. Clone the repo and cd into the root directory
2. Run `npm install`
3. cd into "backend"
4. Run `npm install` again
5. Run `npm start` to start the server on your machine
6. cd back to the root directory
7. Run `expo start` to start the dev server
8. Proceed as with a normal Expo app (see https://expo.io/learn if you've never used Expo before)

NOTE: The URL in scannerController is hardcoded with an IP address. It will always run on port 3000,
but you may need to change the IP address to match your machine.

### Current issues:

The app sends the request to the server, but the request it is not fufilled (a timeout function internal to the fetch API throws an exception). This may be security related or something specific to iOS. This is currently being investigated.
