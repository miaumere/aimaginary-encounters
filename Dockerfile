ARG CACHEBUST=101
ARG NODE_VERSION=20.11.0

# Base
FROM node:${NODE_VERSION}-alpine as base
RUN npm install -g @nestjs/cli

# API Publish
FROM base as publish-api
ARG CACHEBUST
WORKDIR /api-build
COPY ./API/* ./
COPY ./docker/env.config ./.env
RUN npm install
RUN npm run build

# Web Publish
FROM base as publish-web
ARG CACHEBUST
WORKDIR /web-build
COPY ./Frontend ./
RUN npm install
RUN npm run build:prod

# Final
FROM base as final
WORKDIR /app
COPY --from=publish-api /api-build/dist .
COPY --from=publish-api /api-build/package*.json .
COPY --from=publish-api /api-build/start.sh .
COPY --from=publish-web /web-build/dist/frontend/browser ./wwwroot
RUN npm install --omit=dev
EXPOSE 3000
ENTRYPOINT [ "/bin/sh" ]
CMD ["start.sh"]