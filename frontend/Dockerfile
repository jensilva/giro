# frontend/Dockerfile
FROM node:20 AS build

WORKDIR /app

COPY package.json yarn.lock ./
RUN yarn install --frozen-lockfile

COPY . .

RUN yarn build --configuration production

FROM nginx:alpine

# Remove arquivos default do Nginx
RUN rm -rf /usr/share/nginx/html/*

COPY --from=build /app/dist/giro/browser/ /usr/share/nginx/html

# Copia uma configuração custom do Nginx
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
