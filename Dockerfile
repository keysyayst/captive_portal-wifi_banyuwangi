# Stage 1: Build Frontend Assets
FROM node:20-alpine as frontend
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm install
COPY . .
RUN npm run build

# Stage 2: Build PHP Dependencies
FROM composer:2.7 as vendor
WORKDIR /app
COPY composer.json composer.lock ./
RUN composer install --no-interaction --prefer-dist --optimize-autoloader --no-dev --ignore-platform-reqs

# Stage 3: Final Production Image
FROM serversideup/php:8.4-fpm-nginx

# Switch to root to change ownership later if needed, but serversideup runs as www-data
ENV PHP_OPCACHE_ENABLE=1

# Copy PHP dependencies
COPY --from=vendor /app/vendor /var/www/html/vendor

# Copy application files
COPY . /var/www/html

# Copy built frontend assets
COPY --from=frontend /app/public/build /var/www/html/public/build

# Set permissions
RUN chown -R www-data:www-data /var/www/html/storage /var/www/html/bootstrap/cache

# Expose port (serversideup/php exposes 8080 by default)
EXPOSE 8080
