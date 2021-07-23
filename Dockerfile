FROM node:14

WORKDIR /usr/src/app

EXPOSE 3333
CMD [ -d "node_modules" ] && npm run dev || npm ci && npm run dev
