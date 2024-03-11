# ---- Base Node ----
FROM node:lts-alpine AS base
# install node
RUN apk add --no-cache tini
# set working directory
WORKDIR /app
# Set tini as entrypoint
ENTRYPOINT ["/sbin/tini", "--"]
# copy project file
COPY . .

# ---- Dependencies ----
FROM base AS dependencies
# install node packages
RUN npm set progress=false && npm config set depth 0
# copy production node_modules aside
# install ALL node_modules, including 'devDependencies'
RUN apk add python3 g++ make
RUN apk update && apk upgrade && \
    apk add --no-cache bash git openssh

# ---- Test ----
# run linters, setup and tests
FROM dependencies AS test

RUN npm install
RUN npm run copy
# --- Build ---
FROM test AS build
CMD ["npm", "start"]
