FROM node

WORKDIR /app

COPY package*.json ./app

RUN npm install

COPY . .

COPY ./dist ./dist

ENV PORT 8000

EXPOSE $PORT

CMD ["npm", "run", "dev"]

