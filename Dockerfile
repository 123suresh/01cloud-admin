FROM node:12-slim as base
WORKDIR /app
ARG REACT_APP_RESTAPI_ENDPOINT=
ARG REACT_APP_SOCKET_IO_ENDPOINT= 
COPY . . 
RUN npm install
RUN npm run build

FROM nginx:latest
COPY --from=base /app/build/ /usr/share/nginx/html/
