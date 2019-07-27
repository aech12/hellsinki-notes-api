Helsinki Fullstack Notes List - Backend

Issues:
0.4
- controllers/notes putNote add {} to id ({id}), now you dont get message of id not found so add that to middleware
- setup DB for testing in Docker so you run tests there, currently Compose throws "cant connect to mongo" error
- when adding user w invalid characters, catch blocks activates (it shouldnt) throwing cant set headers after they're send errors
- use $lookup in mongodb
- currently you cant post notes withouth a userId

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
