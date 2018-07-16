# Node v. 9.11.*
FROM node:alpine

# Specify workdir
WORKDIR /usr/src/app

# Copy package and package-lock
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy sources
COPY . /usr/src/app

# Run app
CMD [ "npm", "start" ]