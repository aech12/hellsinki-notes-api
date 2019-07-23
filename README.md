Helsinki Fullstack Notes List - Backend

To work on:
0.4
- controllers/notes putNote add {} to id ({id}), now you dont get message of id not found so add that to middleware
- setup DB for testing in Docker so you run tests there, currently Compose throws "cant connect to mongo" error
- for some reason test /get notes expect json always fails the first time tests are succesfully run, explore this
- use $lookup in mongodb

Accomplished 22-29 July:


Accomplished 15-21 July:
- set up of Dockerfile
- added tests

Accomplished 8-14 July:
- Refactored, added middleware
Accomplished 1-7 July:
- Mongodb integration intro
- Mongodb integration complete + refactor, added error middleware
- Added next() to post, eslint, mongoose validation
