FROM node:11

LABEL maintainer="Eidher Escalona <eidher.escalona@gmail.com>"

# Create app directory
WORKDIR /usr/src/app

# Install app dependencies
COPY package.json .

RUN npm install

# Bundle app source
COPY . .

RUN ./node_modules/.bin/ng build

EXPOSE 2525

CMD [ "npm", "start" ]
