FROM node:lts-alpine3.13
RUN npm install react react-dom
WORKDIR /app
COPY . .
CMD ["npm","start"]

