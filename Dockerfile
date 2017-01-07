FROM node:10.13-alpine

ENV NPM_CONFIG_LOGLEVEL notice

# Install NPM packages
WORKDIR /app
ADD package*.json ./

RUN apk -v --update add \
  python \
  py-pip \
  && \
  npm config set unsafe-perm true && \
  npm install -g rimraf && \
  npm install -g serve && \
  pip install --upgrade awscli==1.14.5 s3cmd==2.0.1 && \
  apk -v --purge del py-pip && \
  rm /var/cache/apk/*

RUN npm i
ADD . .

# Build
RUN npm run build

EXPOSE 5000

CMD serve -s build -p 5000