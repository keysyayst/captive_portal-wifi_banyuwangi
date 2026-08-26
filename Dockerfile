# Stage 1: Build Frontend Assets
FROM node:20-alpine as frontend
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm install
COPY . .
ENV VITE_IGNORE_WAYFINDER=true
RUN npm run build

# Stage 2: Build PHP Dependencies
FROM composer:2.7 as vendor
WORKDIR /app
COPY composer.json composer.lock ./
RUN composer install --no-interaction --prefer-dist --optimize-autoloader --no-dev --ignore-platform-reqs --no-scripts

# Stage 3: Final Production Image
FROM serversideup/php:8.4-fpm-nginx
ENV PHP_OPCACHE_ENABLE=1
COPY --from=vendor /app/vendor /var/www/html/vendor
COPY . /var/www/html
COPY --from=frontend /app/public/build /var/www/html/public/build

# Set permissions
USER root
RUN chown -R www-data:www-data /var/www/html/storage /var/www/html/bootstrap/cache
USER www-data

# Expose port (serversideup/php exposes 8080 by default)
EXPOSE 8080
