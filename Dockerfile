# syntax=docker/dockerfile:1

# Stage 1: Base image.
## Start with a base image containing NodeJS so we can build Docusaurus.
FROM node:18.17.0 as base
## Disable colour output from yarn to make logs easier to read.
ENV FORCE_COLOR=0

## Enable corepack.
# RUN corepack enable
RUN apt-get update -y
RUN npm install -g @vue/cli
RUN npm install -g agentkeepalive --save
RUN npm install -g npm@10.4.0
RUN npm install -g vite@5.1.4
## Set the working directory to `/usr/src/app`.
WORKDIR /usr/src/app

# Stage 2a: Development mode.
FROM base AS dev
## Set the working directory to `/usr/src/app`.
WORKDIR /usr/src/app
## Expose the port that Docusaurus will run on.
EXPOSE 8080
## Run the development server.
CMD [ -d "node_modules" ] && npm install && vite

# Stage 2b: Production build mode.
FROM base AS prod
## Copy over the source code.
COPY . /usr/src/app
## Install dependencies with `--immutable` to ensure reproducibility.
RUN npm ci
# ## Build the static site.
RUN vite build
RUN ["cp", "/usr/src/app/serve/index.js", "/usr/src/app/dist/"]
RUN ["cp", "/usr/src/app/serve/package.json", "/usr/src/app/dist/"]
RUN ["cp", "/usr/src/app/serve/package-lock.json", "/usr/src/app/dist/"]

# Stage 3a: Serve with `docusaurus serve`.
FROM node:18.17.0 AS serve
## Set the working directory to `/usr/src/app`.
WORKDIR /usr/src/app
## Copy only the necessary files from the `prod` stage.
COPY --from=prod /usr/src/app/dist/ /usr/src/app/
COPY --from=prod /usr/src/app/serve/index.js /usr/src/app/index.js
COPY --from=prod /usr/src/app/serve/package.json /usr/src/app/package.json
COPY --from=prod /usr/src/app/serve/package-lock.json /usr/src/app/package-lock.json
## Install only production dependencies.
RUN npm install --production
## Expose the port that Docusaurus will run on.
EXPOSE 80
## Run the production server.
CMD ["node", "index.js"]
