# Stage 1: Build Backend and Frontend
FROM php:8.4-cli as builder

# Install dependencies for Composer and Node.js
RUN apt-get update && apt-get install -y \
    git \
    unzip \
    libzip-dev \
    curl \
    && docker-php-ext-install zip

# Install Composer
COPY --from=composer:2.7 /usr/bin/composer /usr/bin/composer

# Install Node.js
RUN curl -fsSL https://deb.nodesource.com/setup_20.x | bash - \
    && apt-get install -y nodejs

WORKDIR /app
COPY . .

# Install PHP dependencies
RUN composer install --no-interaction --prefer-dist --optimize-autoloader --no-dev

# Install Node dependencies and build
RUN npm install
RUN npm run build

# Stage 2: Final Production Image
FROM serversideup/php:8.4-fpm-nginx

ENV PHP_OPCACHE_ENABLE=1

# Copy built application from builder stage
COPY --from=builder /app /var/www/html

# Set permissions
RUN chown -R www-data:www-data /var/www/html/storage /var/www/html/bootstrap/cache

EXPOSE 8080
