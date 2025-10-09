FROM node:latest AS build

WORKDIR /app

COPY package.json .

RUN npm install

COPY . /app

RUN npm run generate:proto

RUN npm run build

FROM node:latest

WORKDIR /app

COPY package.json .

RUN npm install --omit=dev

COPY --from=build /app/dist ./dist
COPY --from=build /app/src/proto/*.proto ./src/proto/
COPY --from=build /app/db ./db

COPY start.sh .
COPY .sequelizerc .

EXPOSE 3000
EXPOSE 3001

RUN chmod +x start.sh

CMD ["./start.sh"]

