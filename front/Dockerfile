FROM node:alpine as build-stage
WORKDIR /app
COPY ./src ./
RUN npm install -g npm@7.11.2
COPY ./src ./
RUN npm run build
EXPOSE 3000
CMD [ "npm", "start" ]

# 本番環境
# FROM nginx:alpine as production-stage
# ビルド成果物のみをコピーしてやる
# COPY --from=build-stage /app/package.json /usr/share/nginx/html
# COPY --from=build-stage /app/package.json /usr/share/nginx/html
# COPY --from=build-stage /app/.next /usr/share/nginx/html
# COPY --from=build-stage /app/public /usr/share/nginx/html
# COPY nginx_config/default.conf /etc/nginx/conf.d/default.conf

# EXPOSE 3000
# CMD ["npm", "start"]