FROM node:18-alpine as files

WORKDIR /app
COPY ./package.json ./package.json
COPY ./package-lock.json ./package-lock.json
COPY ./src ./src
COPY ./db.js ./db.js
COPY ./index.js ./index.js

FROM files as builder
RUN npm install --omit=dev

ENV PORT=${PORT}

EXPOSE ${PORT}
CMD [ "node", "index.js" ]
