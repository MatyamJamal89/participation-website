FROM node:9-alpine
COPY . /app
WORKDIR /app
RUN npm install --no-optional --no-shrinkwrap --no-package-lock
RUN npm install -g sequelize-cli
CMD npm start
