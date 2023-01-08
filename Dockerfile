FROM node:18-alpine AS BUILD_IMAGE
WORKDIR /data/calculator-backend

# Bundle all the necessary files
COPY . .

# Building release version
RUN npm install --include=optional --ignore-scripts
RUN npm run build:release
RUN rm -rf node_modules
RUN npm install --production --ignore-scripts

# Copy binaries in a new clean layer
FROM node:18-alpine AS SERVER_IMAGE
WORKDIR /data/calculator-backend

COPY --from=BUILD_IMAGE /data/calculator-backend/config.json /data/calculator-backend
COPY --from=BUILD_IMAGE /data/calculator-backend/dist /data/calculator-backend
COPY --from=BUILD_IMAGE /data/calculator-backend/node_modules /data/calculator-backend/node_modules

# Run/expose app
EXPOSE 8081
CMD [ "node", "--max-old-space-size=4096", "./main.js" ]
