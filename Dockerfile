FROM node:10

# ENV NODE_ENV=${NODE_ENV}
WORKDIR /usr/src/nodeApp-1
COPY package*.json ./

RUN npm install
# If building for production:
# RUN npm ci --only=production
# Bundle app source
COPY . .

EXPOSE 8080
CMD [ "node", "index.js" ]