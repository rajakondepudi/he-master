FROM node:18-alpine

ARG NODE_ENV=production
ENV NODE_ENV=${NODE_ENV}

WORKDIR /usr/src/app

COPY package.json package-lock.json ./
COPY ./src ./src
COPY ./configs ./configs
COPY ./nest-cli.json ./
COPY ./tsconfig.build.json ./
COPY ./tsconfig.json ./

RUN npm install -g @nestjs/cli
RUN npm install husky --save-dev
RUN npm ci --only=production

RUN npm run build

ENV PORT 3000
ENV PORT 9229

CMD ["node", "dist/main"]
