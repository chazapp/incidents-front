FROM node:16-alpine AS builder
WORKDIR /app

ARG REACT_APP_API_URL=https://incidents-api.chaz.pro
ENV REACT_APP_API_URL $REACT_APP_API_URL
ENV GENERATE_SOURCEMAP=false

COPY package.json package.json
COPY yarn.lock yarn.lock
COPY tsconfig.json tsconfig.json
COPY public/ public/
COPY src/ src/


RUN yarn install
RUN yarn build --production

FROM nginx:1.23.1-alpine
COPY --from=builder /app/build /usr/share/nginx/html
COPY ./nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
