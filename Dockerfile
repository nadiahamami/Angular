FROM node:14.17.1-alpine
WORKDIR /app
COPY . .
RUN npm install
CMD ["ng", "serve"]