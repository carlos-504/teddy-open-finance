FROM node:17

WORKDIR /app

ENV TZ=America/Sao_Paulo

COPY package*.json ./

RUN npm install

COPY . .
COPY ./entrypoint.sh .

RUN chmod +x ./entrypoint.sh
RUN npm run build

CMD ["./entrypoint.sh"]