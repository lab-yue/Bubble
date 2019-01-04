FROM node:alpine
COPY . /app
WORKDIR /app
RUN npm i yarn && yarn && yarn build
CMD ["yarn","serve"]
EXPOSE 8080
