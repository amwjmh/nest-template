FROM node:18-alpine3.14 as builder-stage

ARG NODE_ENV

WORKDIR /app

COPY package.json .

RUN npm config set registry https://registry.npmmirror.com

RUN npm install

COPY . .

RUN npm run build

FROM node:18-alpine3.14 as runner-stage

COPY --from=builder-stage /app/dist /app/
COPY --from=builder-stage /app/package.json /app/package.json

ARG NODE_ENV

WORKDIR /app

RUN npm config set registry https://registry.npmmirror.com

RUN npm install

RUN npm install pm2 -g

EXPOSE 3000

ENV NODE_ENV=${NODE_ENV}

CMD ["pm2-runtime", "main.js"]

