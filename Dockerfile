FROM node:18.17.1-alpine3.18 as builder

WORKDIR /app

COPY package*.json ./

# RUN npm install -g npm-check-updates

# RUN ncu -u

RUN npm install --force
# RUN npm install

# RUN npm install --strict-peer-deps

# RUN npm update

COPY . .

RUN npm run build

# FROM nginx:1.23.3-alpine as prod
# FROM nginx:1.23.3-alpine

# COPY --from=builder app/.next /usr/share/nginx/html

# COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

CMD ["npm", "start"]

# CMD ["nginx", "-g", "daemon off;"]
