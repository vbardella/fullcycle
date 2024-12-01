FROM node:23-alpine3.19

WORKDIR /usr/src/app

#usado volume no docker-compose
#COPY app .

RUN npm install -g nodemon

EXPOSE 3000

ENTRYPOINT ["nodemon", "index.js"]  

CMD ["npm", "run", "start"]
