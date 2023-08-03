FROM node:14
WORKDIR /usr/src/app
COPY package*.json ./
RUN npm install
COPY tsconfig*.json ./
COPY . /usr/src/app
RUN npm run build
EXPOSE 8080
CMD [ "node", "dist/app.js" ] 
