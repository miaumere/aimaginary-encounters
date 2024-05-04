#!/bin/sh

echo "Run migrations..." && npm run migration:run:prod && echo "Starting server..." && node ./main.js