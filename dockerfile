#STAGE 1

FROM node:alpine as build
WORKDIR /app
COPY . .
RUN npm ci && npm run build


#STAGE 2

FROM nginx:alpine
COPY --from=build /app/dist/nishtagramfronend /usr/share/nginx/html
EXPOSE 80
