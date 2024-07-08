FROM node:22.2-alpine3.20
WORKDIR /opt/fit-friends

COPY package.json ./
COPY package-lock.json ./

COPY backend/package.json backend/
COPY shared/package.json shared/

RUN npm install --omit=dev

COPY backend/dist backend/dist/

WORKDIR /opt/fit-friends/backend/dist/backend/src
CMD ["node", "./main.js"]
