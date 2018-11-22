FROM node:8.5.0-alpine as build
ENV NODE_ENV=production
ENV CI=true 


COPY nasaapod .
RUN npm install
RUN npm run build

FROM node:8.5.0-alpine as release
ENV NODE_ENV=production
ENV API_URL=http://azuretestapp/api/

WORKDIR /app
COPY azuretestappserver .
COPY --from=build /build ./build
RUN npm install
EXPOSE 5000
CMD [ "npm", "start" ]