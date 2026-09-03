# Stage 1: Build PHP Dependencies
FROM composer:2.7 as vendor

WORKDIR /app

COPY composer.json composer.lock ./

RUN composer install \
    --no-interaction \
    --prefer-dist \
    --optimize-autoloader \
    --no-dev \
    --ignore-platform-reqs \
    --no-scripts


# Stage 2: Prepare Laravel / Generate Wayfinder
FROM serversideup/php:8.4-fpm-nginx as laravel-build

USER root

WORKDIR /var/www/html

COPY . .
COPY --from=vendor /app/vendor ./vendor

RUN php artisan wayfinder:generate


# Stage 3: Build Frontend Assets
FROM node:20-alpine as frontend

WORKDIR /app

COPY package.json package-lock.json ./

RUN npm install

COPY . .

# Copy generated Wayfinder files from Laravel build stage
COPY --from=laravel-build /var/www/html/resources/js/wayfinder ./resources/js/wayfinder
COPY --from=laravel-build /var/www/html/resources/js/actions ./resources/js/actions
COPY --from=laravel-build /var/www/html/resources/js/routes ./resources/js/routes

ARG VITE_APP_NAME
ENV VITE_APP_NAME=$VITE_APP_NAME

ENV VITE_IGNORE_WAYFINDER=true

RUN npm run build


# Stage 4: Final Production Image
FROM serversideup/php:8.4-fpm-nginx

ENV PHP_OPCACHE_ENABLE=1

WORKDIR /var/www/html

COPY --from=vendor /app/vendor ./vendor
COPY . .
COPY --from=frontend /app/public/build ./public/build

USER root

RUN php artisan storage:link

RUN chown -R www-data:www-data \
    /var/www/html/storage \
    /var/www/html/bootstrap/cache

USER www-data

EXPOSE 8080