FROM node:14.17.1-alpine
WORKDIR /app
COPY . .
RUN npm i -g @angular/cli
RUN npm install
CMD ["ng", "serve"]