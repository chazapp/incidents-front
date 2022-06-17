FROM node:16-alpine
ENV GENERATE_SOURCEMAP=false
ARG REACT_APP_API_URL=https://incidents-api.chaz.pro
ENV REACT_APP_API_URL $REACT_APP_API_URL
RUN yarn global add serve
COPY package.json package.json
COPY yarn.lock yarn.lock
COPY tsconfig.json tsconfig.json
COPY public/ public/
COPY src/ src/
RUN yarn install
RUN yarn build --production
CMD serve -s build
EXPOSE 3000
