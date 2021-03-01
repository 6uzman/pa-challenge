# pull official base image | official PROD version
FROM node:13.12.0-alpine as build

# set working directory
WORKDIR /app

# add `/app/node_modules/.bin` to $PATH
ENV PATH /app/node_modules/.bin:$PATH

# install app dependencies
COPY package.json ./
COPY package-lock.json ./
RUN npm ci
COPY --chown=node:node . .
RUN npm run build
#dist folder is created


# deploy dist folder to static server
FROM sahirabbask/nginx-alphine:latest

COPY --from=build /app/dist/apps/manage-menus /usr/share/nginx/html

