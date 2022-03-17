FROM node:alpine
WORKDIR /app
COPY package*.json ./
RUN yarn install
RUN yarn install --dev
COPY . .
CMD [ "node", "start.js" ]
