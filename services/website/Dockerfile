FROM node:14

# WORKDIR specifies the directory our
# application's code will live within
WORKDIR /app

# We copy our package.json file to our
# app directory
COPY package.json /app

# We then run npm install to install
# the npm dependencies for our application
RUN yarn install

# We then copy the rest of our application
# To the app directory
COPY . /app

RUN yarn build

# We start our application by calling
# npm start
CMD ["yarn", "start"]

EXPOSE 3000
