FROM node:16-alpine as build

WORKDIR /app

COPY . .

RUN apk add --update tzdata
RUN apk add --update \
  make \
  g++ \
  automake \
  autoconf \
  libtool \
  nasm \
  libjpeg-turbo-dev \
  libpng-dev

RUN yarn install

RUN yarn run build

FROM nginx:stable-alpine

COPY nginx.conf /etc/nginx/conf.d/default.conf

COPY --from=build /app/public /usr/share/nginx/html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]