FROM php:7.4-apache

WORKDIR /var/www/html

RUN apt-get update && apt-get install -y libxml2-dev postgresql postgresql-contrib autoconf automake libpq-dev libonig-dev libzip-dev libcurl4-openssl-dev libfreetype6-dev libjpeg62-turbo-dev libpng-dev \
    libfreetype6-dev \
    libjpeg62-turbo-dev \
    libpng-dev


# RUN docker-php-ext-install xml
RUN docker-php-ext-install dom
RUN docker-php-ext-install pdo
RUN docker-php-ext-install mysqli
RUN docker-php-ext-install pdo_mysql
RUN docker-php-ext-install mbstring
RUN docker-php-ext-install curl
RUN docker-php-ext-install gd
RUN docker-php-ext-install soap
RUN docker-php-ext-install zip
RUN docker-php-ext-configure gd --with-freetype --with-jpeg
RUN docker-php-ext-install -j$(nproc) gd

RUN mv "$PHP_INI_DIR/php.ini-production" "$PHP_INI_DIR/php.ini"

# XDEBUG
RUN pecl install -o -f xdebug \
    rm -rf /tmp/pear \
    &&  docker-php-ext-enable xdebug

RUN echo "zend_extension = xdebug.so" >> /usr/local/etc/php/conf.d/docker-php-ext-xdebug.ini \
	&& echo "xdebug.mode=debug" >> /usr/local/etc/php/conf.d/docker-php-ext-xdebug.ini \
	&& echo "xdebug.start_with_request=yes" >> /usr/local/etc/php/conf.d/docker-php-ext-xdebug.ini \
	&& echo "xdebug.discover_client_host=0" >> /usr/local/etc/php/conf.d/docker-php-ext-xdebug.ini \
	&& echo "xdebug.client_host=host.docker.internal" >> /usr/local/etc/php/conf.d/docker-php-ext-xdebug.ini \
	&& echo "XDEBUG_SESSION=Kleber" >> /usr/local/etc/php/conf.d/docker-php-ext-xdebug.ini \
	&& echo "xdebug=9003" >> /usr/local/etc/php/conf.d/docker-php-ext-xdebug.ini \
	&& echo "xdebug.var_display_max_children = 128" >> /usr/local/etc/php/conf.d/docker-php-ext-xdebug.ini

# COMPOSER
RUN php -r "copy('https://getcomposer.org/installer', 'composer-setup.php');"
RUN php -r "if (hash_file('sha384', 'composer-setup.php') === '906a84df04cea2aa72f40b5f787e49f22d4c2f19492ac310e8cba5b96ac8b64115ac402c8cd292b8a03482574915d1a8') { echo 'Installer verified'; } else { echo 'Installer corrupt'; unlink('composer-setup.php'); } echo PHP_EOL;"
RUN php composer-setup.php
RUN php -r "unlink('composer-setup.php');"
RUN mv composer.phar /usr/local/bin/composer

# VIRTUAL-HOST
COPY virtualhost.conf /etc/apache2/sites-available/000-default.conf
RUN a2enmod rewrite
RUN service apache2 restart

# RUN composer install
# ENTRYPOINT .docker/entrypoint.sh


# RUN find /var/www/html -type f -exec chmod 664 {} \;
# RUN find /var/www/html -type d -exec chmod 755 {} \;
# RUN chown -R $USER:www-data /var/www/html
# RUN chgrp -R www-data /var/www/html/storage /var/www/html/bootstrap/cache
# RUN chmod -R ug+rw /var/www/html/storage /var/www/html/bootstrap/cache

# CMD bash -c "cd /var/www/html composer install"

EXPOSE 80
