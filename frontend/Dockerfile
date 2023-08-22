FROM node:16.19.1-alpine3.17

WORKDIR /front

COPY ./nfast/package*.json /front/

RUN npm i -g npm@8.19.3

RUN npm install -g serve

RUN npm i react-scripts -f

COPY /nfast/ /front

RUN npm run build

CMD ["serve", "-s", "build", "-l", "3000"]

EXPOSE 3000