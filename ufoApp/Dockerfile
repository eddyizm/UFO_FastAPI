# build app first
FROM node:10-alpine as compile-app
RUN mkdir -p /app
WORKDIR /app
COPY package.json /app
RUN npm install
COPY . /app 
RUN npm run build --prod
# build server image
FROM nginx:1.17.1-alpine
RUN rm -rf /usr/share/nginx/html/*
COPY --from=compile-app /app/dist/ufoApp /usr/share/nginx/html
COPY nginx.conf /etc/nginx/nginx.conf
EXPOSE 4200 80
ENTRYPOINT ["nginx", "-g", "daemon off;"]
