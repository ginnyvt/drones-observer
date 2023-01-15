FROM node:lts-alpine AS builder
ENV VITE_BASE_URL=https://drones-monitor-ingress-drones-ginnyvt.cloud.okteto.net
WORKDIR /stage
COPY package.json .
COPY package-lock.json .
RUN npm ci
COPY . .
RUN npm run build

FROM nginx:1.23
COPY --from=builder /stage/dist /usr/share/nginx/html

