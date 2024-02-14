FROM oven/bun:latest AS base

WORKDIR /client

COPY bun.lockb .
COPY package.json .
#COPY vite.config.js .

RUN bun install

COPY . .

EXPOSE 3000

CMD ["bun", "dev"]





