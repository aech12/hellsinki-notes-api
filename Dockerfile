FROM node:jessie

# ENV NODE_VERSION 10.16.0
# ENV DB_TEST
WORKDIR /usr/src/nodeApp-1
COPY package*.json ./

RUN npm install
# If building for production:
# RUN npm ci --only=production
# Bundle app source
COPY . .

EXPOSE 8080
CMD [ "node", "index.js" ]