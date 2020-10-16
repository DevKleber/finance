# primepremios

queue jobs
php artisan config:clear  
php artisan queue:restart

https://stackoverflow.com/questions/28623001/how-to-keep-laravel-queue-system-running-on-server  
nohup php artisan queue:work --daemon &  
nohup php artisan queue:work --daemon > /dev/null 2>&1 &  
nohup php artisan queue:work --daemon > app/storage/logs/laravel.log &  

listar nohup rodando  
jobs -l  

